const Pet = require("../models/Pet");

const VALIDATION_ERROR = "Validation error";

const validateCreatePetInput = ({ name, species, age }) => {
  const invalidFields = [];

  if (!name || typeof name !== "string" || !name.trim()) {
    invalidFields.push("name");
  }

  if (!species || typeof species !== "string" || !species.trim()) {
    invalidFields.push("species");
  }

  if (age !== undefined) {
    const parsedAge = Number(age);
    if (!Number.isFinite(parsedAge) || parsedAge < 0) {
      invalidFields.push("age");
    }
  }

  return invalidFields;
};

const createPet = async ({ tutorId, name, species, age }) => {
  const invalidFields = validateCreatePetInput({ name, species, age });

  if (!tutorId) {
    invalidFields.push("tutorId");
  }

  if (invalidFields.length > 0) {
    const error = new Error(VALIDATION_ERROR);
    error.code = "VALIDATION_ERROR";
    error.invalidFields = [...new Set(invalidFields)];
    throw error;
  }

  const createdPet = await Pet.create({
    tutorId,
    name: name.trim(),
    species: species.trim(),
    age: age === undefined ? 0 : Number(age),
  });

  return {
    id: createdPet.id,
  };
};

module.exports = {
  createPet,
  validateCreatePetInput,
  VALIDATION_ERROR,
};
