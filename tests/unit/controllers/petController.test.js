const petController = require("../../../src/controllers/petController");
const petService = require("../../../src/services/petService");

jest.mock("../../../src/services/petService", () => ({
  createPet: jest.fn(),
  VALIDATION_ERROR: "Validation error",
}));

const createRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("petController.createPet", () => {
  it("returns 201 and petId when create succeeds", async () => {
    const req = {
      userId: "user-1",
      body: { name: "Bolt", species: "cachorro", age: 2 },
    };
    const res = createRes();
    petService.createPet.mockResolvedValue({ id: "pet-1" });

    await petController.createPet(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ petId: "pet-1" });
  });

  it("returns 400 with invalid fields for validation errors", async () => {
    const req = {
      userId: "user-1",
      body: { name: "", species: "" },
    };
    const res = createRes();
    const error = new Error("Validation error");
    error.code = "VALIDATION_ERROR";
    error.invalidFields = ["name", "species"];
    petService.createPet.mockRejectedValue(error);

    await petController.createPet(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Validation error",
      invalidFields: ["name", "species"],
    });
  });

  it("returns 500 for unexpected errors", async () => {
    const req = {
      userId: "user-1",
      body: { name: "Bolt", species: "cachorro" },
    };
    const res = createRes();
    petService.createPet.mockRejectedValue(new Error("Unexpected"));

    await petController.createPet(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Unexpected" });
  });
});
