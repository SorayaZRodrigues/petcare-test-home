jest.mock("../../../src/models/Pet", () => ({
  create: jest.fn(),
}));

const Pet = require("../../../src/models/Pet");
const petService = require("../../../src/services/petService");

describe("petService.createPet", () => {
  it("creates a pet with valid payload", async () => {
    Pet.create.mockResolvedValue({ id: "pet-1" });

    const result = await petService.createPet({
      tutorId: "user-1",
      name: "Bolt",
      species: "cachorro",
      age: 3,
    });

    expect(Pet.create).toHaveBeenCalledWith({
      tutorId: "user-1",
      name: "Bolt",
      species: "cachorro",
      age: 3,
    });
    expect(result).toEqual({ id: "pet-1" });
  });

  it("throws validation error when required fields are missing", async () => {
    await expect(
      petService.createPet({
        tutorId: "user-1",
        name: "",
        species: "",
      })
    ).rejects.toMatchObject({
      code: "VALIDATION_ERROR",
      invalidFields: expect.arrayContaining(["name", "species"]),
    });
  });

  it("throws validation error when age is negative", async () => {
    await expect(
      petService.createPet({
        tutorId: "user-1",
        name: "Bolt",
        species: "cachorro",
        age: -1,
      })
    ).rejects.toMatchObject({
      code: "VALIDATION_ERROR",
      invalidFields: ["age"],
    });
  });
});
