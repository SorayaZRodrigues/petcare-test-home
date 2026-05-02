const healthCheck = (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
};

const protectedCheck = (req, res) => {
  res.status(200).json({
    message: "Authenticated route reached successfully",
    userId: req.userId,
  });
};

module.exports = {
  healthCheck,
  protectedCheck,
};
