const express = require("express");
const mongoose = require("mongoose");
const { listDestinations } = require("../services/destinationService");
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

router.get("/", async (_req, res) => {
  try {
    const destinations = await listDestinations();
    sendSuccess(
      res,
      destinations,
      {
        total: destinations.length,
      },
      "Destinations fetched successfully"
    );
  } catch (err) {
    sendError(res, 500, "DESTINATIONS_LIST_FAILED", err.message || "Failed to list destinations");
  }
});

module.exports = router;
