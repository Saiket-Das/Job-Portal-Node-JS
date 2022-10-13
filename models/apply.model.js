const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const applySchema = mongoose.Schema(
  {
    jobInfo: {
      id: {
        type: ObjectId,
        ref: "Job",
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },

    candidateInfo: {
      id: {
        type: ObjectId,
        ref: "User",
        required: true,
      },
      email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Provide a valid email"],
      },
    },

    resumeURL: [
      {
        type: String,
        required: true,
        validate: [validator.isURL, "Wrong url"],
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Apply = mongoose.model("Apply", applySchema);

module.exports = Apply;
