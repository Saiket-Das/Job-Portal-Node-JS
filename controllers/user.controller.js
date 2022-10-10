const { signupService } = require("../services/user.service");

exports.signup = async (req, res) => {
  try {
    const user = await signupService(req.body);

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Successfully signed up",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
