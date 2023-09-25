const mongoose = require("mongoose");

const CarouselSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    subTitle: { type: String, require: true },
    image: {
      type: String,
      require: true,
      get: (img) => `${process.env.SERVER_URL}carousel/${img}`,
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
const CarouselModel = mongoose.model("Carousel", CarouselSchema);

module.exports = { CarouselModel };
