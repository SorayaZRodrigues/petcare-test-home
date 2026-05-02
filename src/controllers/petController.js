const petService = require("../services/petService");

const getPetById = async (req, res) => {
  try {
    const { petId } = req.params;
    const pet = await petService.getPetById({
      petId,
      tutorId: req.userId,
    });

    return res.status(200).json(pet);
  } catch (error) {
    if (error.code === "PET_NOT_FOUND") {
      return res.status(404).json({ message: petService.PET_NOT_FOUND_ERROR });
    }

    if (error.code === "FORBIDDEN_PET_ACCESS") {
      return res.status(403).json({ message: "Forbidden" });
    }

    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPetById,
};
