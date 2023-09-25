const mongoose = require("mongoose");


const PopularTeacherSchema = new mongoose.Schema(
  {
    fullName: { type: String, require: true },
    designation: { type: String, require: true },
    socialAccount: {
      facebookLink: { type: String, require: true },
      instagramLink: { type: String, require: true },
      twitterLink: { type: String, require: true },
    },
    avatar: {
      type: String,
      require: true,
      get: (img) => `${process.env.SERVER_URL}popularTeacher/${img}`,
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
const PopularTeacherModel = mongoose.model("teacher", PopularTeacherSchema);

module.exports = { PopularTeacherModel };
