const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    blurb: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    href: { type: String, default: "/tours", trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Destination", destinationSchema);
