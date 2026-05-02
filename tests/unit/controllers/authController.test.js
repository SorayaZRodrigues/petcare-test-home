const authService = require("../../../src/services/authService");
const authController = require("../../../src/controllers/authController");

jest.mock("../../../src/services/authService", () => ({
  login: jest.fn(),
  register: jest.fn(),
  INVALID_CREDENTIALS_ERROR: "Invalid credentials",
}));

const createRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("authController.login", () => {
  it("returns 400 when email or password is missing", async () => {
    const req = { body: { email: "" } };
    const res = createRes();

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "email and password are required",
    });
  });

  it("returns 200 for valid credentials", async () => {
    const req = { body: { email: "maria@email.com", password: "123456" } };
    const res = createRes();
    authService.login.mockResolvedValue({
      user: { id: "user-1", name: "Maria", email: "maria@email.com" },
      token: "valid-token",
    });

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      user: { id: "user-1", name: "Maria", email: "maria@email.com" },
      token: "valid-token",
    });
  });

  it("returns 401 when credentials are invalid", async () => {
    const req = { body: { email: "maria@email.com", password: "wrong-pass" } };
    const res = createRes();
    authService.login.mockRejectedValue(new Error("Invalid credentials"));

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });
});
