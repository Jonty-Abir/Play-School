const mongoose = require("mongoose");

const FacilitiesSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    subTitle: { type: String, require: true },
    image: {
      type: String,
      require: true,
      get: (img) => `${process.env.SERVER_URL}facilities/${img}`,
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
const FacilitiesModel = mongoose.model("Facilitie", FacilitiesSchema);

module.exports = { FacilitiesModel };
