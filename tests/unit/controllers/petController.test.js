const petController = require("../../../src/controllers/petController");
const petService = require("../../../src/services/petService");

jest.mock("../../../src/services/petService", () => ({
  getPetById: jest.fn(),
  PET_NOT_FOUND_ERROR: "Pet not found",
}));

const createRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("petController.getPetById", () => {
  it("returns 200 with pet payload when found", async () => {
    const req = {
      userId: "user-1",
      params: { petId: "pet-1" },
    };
    const res = createRes();
    petService.getPetById.mockResolvedValue({
      id: "pet-1",
      name: "Bolt",
      species: "cachorro",
      age: 4,
    });

    await petController.getPetById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: "pet-1",
      name: "Bolt",
      species: "cachorro",
      age: 4,
    });
  });

  it("returns 404 when pet does not exist", async () => {
    const req = {
      userId: "user-1",
      params: { petId: "missing-pet" },
    };
    const res = createRes();
    const error = new Error("Pet not found");
    error.code = "PET_NOT_FOUND";
    petService.getPetById.mockRejectedValue(error);

    await petController.getPetById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Pet not found" });
  });

  it("returns 403 when pet belongs to another tutor", async () => {
    const req = {
      userId: "user-1",
      params: { petId: "pet-1" },
    };
    const res = createRes();
    const error = new Error("Forbidden pet access");
    error.code = "FORBIDDEN_PET_ACCESS";
    petService.getPetById.mockRejectedValue(error);

    await petController.getPetById(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
  });
});
