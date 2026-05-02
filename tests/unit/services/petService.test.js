jest.mock("../../../src/models/Pet", () => ({
  findById: jest.fn(),
}));

const Pet = require("../../../src/models/Pet");
const petService = require("../../../src/services/petService");

describe("petService.getPetById", () => {
  it("returns pet data when it belongs to the authenticated tutor", async () => {
    Pet.findById.mockResolvedValue({
      id: "pet-1",
      name: "Bolt",
      species: "cachorro",
      age: 4,
      tutorId: "user-1",
    });

    const result = await petService.getPetById({
      petId: "pet-1",
      tutorId: "user-1",
    });

    expect(result).toEqual({
      id: "pet-1",
      name: "Bolt",
      species: "cachorro",
      age: 4,
    });
  });

  it("throws not found when pet does not exist", async () => {
    Pet.findById.mockResolvedValue(null);

    await expect(
      petService.getPetById({
        petId: "missing-pet",
        tutorId: "user-1",
      })
    ).rejects.toMatchObject({ code: "PET_NOT_FOUND" });
  });

  it("throws forbidden when pet belongs to another tutor", async () => {
    Pet.findById.mockResolvedValue({
      id: "pet-1",
      name: "Bolt",
      species: "cachorro",
      age: 4,
      tutorId: "other-user",
    });

    await expect(
      petService.getPetById({
        petId: "pet-1",
        tutorId: "user-1",
      })
    ).rejects.toMatchObject({ code: "FORBIDDEN_PET_ACCESS" });
  });
});
