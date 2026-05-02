const petService = require("../services/petService");

const createPet = async (req, res) => {
  try {
    const { name, species, age } = req.body;

    const result = await petService.createPet({
      tutorId: req.userId,
      name,
      species,
      age,
    });

    return res.status(201).json({
      petId: result.id,
    });
  } catch (error) {
    if (error.code === "VALIDATION_ERROR") {
      return res.status(400).json({
        message: petService.VALIDATION_ERROR,
        invalidFields: error.invalidFields || [],
      });
    }

    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPet,
};
