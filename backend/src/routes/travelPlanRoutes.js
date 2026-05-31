const express = require("express");
const mongoose = require("mongoose");
const { createTravelPlan } = require("../services/travelPlanService");
const { sendSuccess, sendError } = require("../utils/apiResponse");

const router = express.Router();

function requireDatabase(_req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return sendError(
      res,
      503,
      "DATABASE_UNAVAILABLE",
      "MongoDB is not connected. Fix MONGODB_URI, start MongoDB, then restart this API.",
      { readyState: mongoose.connection.readyState }
    );
  }
  next();
}

router.use(requireDatabase);

router.post("/", async (req, res) => {
  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const travelDates = typeof body.travelDates === "string" ? body.travelDates.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    let destinations = [];
    if (Array.isArray(body.destinations)) {
      destinations = body.destinations.map((d) => String(d).trim()).filter(Boolean);
    }

    const adults = Math.max(1, parseInt(String(body.adults), 10) || 1);
    const children = Math.max(0, parseInt(String(body.children), 10) || 0);

    if (!fullName || !email) {
      return sendError(res, 400, "VALIDATION_ERROR", "fullName and email are required.");
    }

    const doc = await createTravelPlan({
      fullName,
      email,
      phone,
      destinations,
      travelDates,
      adults,
      children,
      message,
    });

    sendSuccess(
      res,
      { id: String(doc._id) },
      { resource: "travelPlan" },
      "Travel plan request received"
    );
  } catch (err) {
    sendError(res, 500, "TRAVEL_PLAN_CREATE_FAILED", err.message || "Could not save request");
  }
});

module.exports = router;
