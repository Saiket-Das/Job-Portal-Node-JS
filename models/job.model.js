const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      minLength: [3, "Title must be at least 3 characters"],
    },

    description: {
      type: String,
      trim: true,
      required: [true, "Please provide a description"],
    },

    type: {
      type: String,
      lowercase: true,
      required: [true, "Provide job type"],
      enum: {
        values: ["full-time", "part-time"],
        message: "Type value can't be {VALUE}, must be full-time/part-time",
      },
    },

    workMode: {
      type: String,
      lowercase: true,
      required: [true, "Provide work model"],
      enum: {
        values: ["on-site", "remote", "hybrid "],
        message:
          "Work model value can't be {VALUE}, must be on-site/remote/hybrid",
      },
    },

    experienceLevel: {
      type: String,
      required: [true, "Provide work model"],
      enum: {
        values: ["internship", "entry", "mid-senior", "senior", "executive"],
        message:
          "Work model value can't be {VALUE}, must be internship/entry/mid-senior/senior/executive",
      },
    },

    location: {
      type: String,
      trim: true,
      required: [true, "Please provide the office's location"],
    },

    salaryRange: {
      type: String,
      required: [true, "Provide salary range"],
    },

    datePosted: Date,

    applicationDeadline: {
      type: Date,
      required: [true, "Please provide a application deadline date"],
      validate: [validator.isDate, "Please provide a valid date"],
    },

    hiringManagerInfo: {
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
  },

  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
