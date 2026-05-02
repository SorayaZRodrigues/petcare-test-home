jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

jest.mock("../../../src/models/User", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../../src/models/User");
const authService = require("../../../src/services/authService");

describe("authService.login", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "test-secret";
    process.env.JWT_EXPIRES_IN = "1h";
  });

  it("returns token for valid credentials", async () => {
    User.findOne.mockResolvedValue({
      id: "user-1",
      name: "Maria",
      email: "maria@email.com",
      password: "hashed",
      isActive: true,
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("valid-token");

    const result = await authService.login({
      email: "maria@email.com",
      password: "123456",
    });

    expect(result).toEqual({
      user: {
        id: "user-1",
        name: "Maria",
        email: "maria@email.com",
      },
      token: "valid-token",
    });
    expect(jwt.sign).toHaveBeenCalledWith({ sub: "user-1" }, "test-secret", {
      expiresIn: "1h",
    });
  });

  it("throws invalid credentials when user does not exist", async () => {
    User.findOne.mockResolvedValue(null);

    await expect(
      authService.login({
        email: "missing@email.com",
        password: "123456",
      })
    ).rejects.toThrow(authService.INVALID_CREDENTIALS_ERROR);
  });

  it("throws invalid credentials when user is inactive", async () => {
    User.findOne.mockResolvedValue({
      id: "user-2",
      email: "inactive@email.com",
      password: "hashed",
      isActive: false,
    });

    await expect(
      authService.login({
        email: "inactive@email.com",
        password: "123456",
      })
    ).rejects.toThrow(authService.INVALID_CREDENTIALS_ERROR);
  });

  it("throws invalid credentials when password is wrong", async () => {
    User.findOne.mockResolvedValue({
      id: "user-3",
      email: "maria@email.com",
      password: "hashed",
      isActive: true,
    });
    bcrypt.compare.mockResolvedValue(false);

    await expect(
      authService.login({
        email: "maria@email.com",
        password: "wrong-pass",
      })
    ).rejects.toThrow(authService.INVALID_CREDENTIALS_ERROR);
  });
});
