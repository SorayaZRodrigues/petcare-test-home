const Pet = require("../models/Pet");

const PET_NOT_FOUND_ERROR = "Pet not found";
const FORBIDDEN_PET_ACCESS_ERROR = "Forbidden pet access";

const mapPetToTutorView = (pet) => ({
  id: pet.id,
  name: pet.name,
  species: pet.species,
  age: pet.age,
});

const getPetById = async ({ petId, tutorId }) => {
  const pet = await Pet.findById(petId);

  if (!pet) {
    const error = new Error(PET_NOT_FOUND_ERROR);
    error.code = "PET_NOT_FOUND";
    throw error;
  }

  if (String(pet.tutorId) !== String(tutorId)) {
    const error = new Error(FORBIDDEN_PET_ACCESS_ERROR);
    error.code = "FORBIDDEN_PET_ACCESS";
    throw error;
  }

  return mapPetToTutorView(pet);
};

module.exports = {
  getPetById,
  mapPetToTutorView,
  PET_NOT_FOUND_ERROR,
  FORBIDDEN_PET_ACCESS_ERROR,
};
