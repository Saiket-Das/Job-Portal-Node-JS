const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: [true, "Email is already registered"],
      required: [true, "Email address is required"],
      validate: [validator.isEmail, "Provide a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 3,
            minSymbols: 1,
          }),
        message: "Password is not strong enough.",
      },
    },

    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password doesn't match!",
      },
    },

    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url."],
    },

    role: {
      type: String,
      enum: ["candidate", "hiring-manager", "admin"],
      default: "candidate",
    },

    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid contact number",
      ],
    },
  },

  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPassowrdValid = bcrypt.compareSync(password, hash);
  return isPassowrdValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
