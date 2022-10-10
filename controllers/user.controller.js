const {
  signupService,
  findUserByEmail,
  assignAdminService,
  assignManagerService,
} = require("../services/user.service");
const { generateToken } = require("../utilis/token");

// ---------> SIGN UP
exports.signup = async (req, res) => {
  try {
    const user = await signupService(req.body);

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Successfully signed up",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: " Internal server error",
      error: error.message,
    });
  }
};

// ---------> LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "Fail",
        message: "Please provide your credentials",
      });
    }
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: "Fail",
        message: "No user found. Create an account",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "Fail",
        message: "Invalid login credentials",
      });
    }

    const token = generateToken(user);

    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: "Success",
      message: "Successfully logged in",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: " Internal server error",
      error: error.message,
    });
  }
};

// ---------> MAKE ADMIN
exports.assignAdmin = async (req, res) => {
  try {
    const reuslt = await assignAdminService(req.params.id);

    if (reuslt.modifiedCount > 0) {
      res.status(200).json({
        status: "Success",
        message: "Successfully assign an admin",
        data: reuslt,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: " Internal server error",
      error: error.message,
    });
  }
};

// ---------> MAKE ADMIN
exports.assignManager = async (req, res) => {
  try {
    console.log(req.params.id);

    const reuslt = await assignManagerService(req.params.id);

    if (reuslt.modifiedCount > 0) {
      res.status(200).json({
        status: "Success",
        message: "Successfully assign an hiring manager",
        data: reuslt,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: " Internal server error",
      error: error.message,
    });
  }
};
