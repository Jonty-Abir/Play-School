const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    fees: { type: String, require: true },
    avatar: {
      type: String,
      require: true,
      get: (img) => `${process.env.SERVER_URL}classes/${img}`,
    },
    role: {
      type: String,
      enum: ["Teacher"],
      default: "Teacher",
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  }
);

const ClassesSchema = new mongoose.Schema(
  {
    tropicName: { type: String, require: true },
    teacher: TeacherSchema,
    age: { type: String, require: true },
    classTime: { type: String, require: true },
    capacity: { type: String, require: true },
    poster: {
      type: String,
      require: true,
      get: (img) => `${process.env.SERVER_URL}classes/${img}`,
    },
    active: {
      type: Boolean,
      default: true,
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  }
);
const ClassesModel = mongoose.model("Class", ClassesSchema);

module.exports = { ClassesModel };
