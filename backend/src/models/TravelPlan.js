const mongoose = require("mongoose");

const travelPlanSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: "" },
    destinations: [{ type: String, trim: true }],
    travelDates: { type: String, trim: true, default: "" },
    adults: { type: Number, min: 1, default: 1 },
    children: { type: Number, min: 0, default: 0 },
    message: { type: String, trim: true, default: "" },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TravelPlan", travelPlanSchema);
