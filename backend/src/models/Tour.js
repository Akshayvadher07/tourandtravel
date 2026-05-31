const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    durationDays: { type: Number, required: true, min: 1 },
    priceFrom: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true },
    category: {
      type: String,
      enum: ["adventure", "cultural", "relaxation", "wildlife", "city"],
      default: "cultural",
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
