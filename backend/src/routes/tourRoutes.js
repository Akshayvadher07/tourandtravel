const express = require("express");
const mongoose = require("mongoose");
const { listTours, getTourById } = require("../services/tourService");
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

router.get("/", async (req, res) => {
  try {
    const featured = req.query.featured === "true";
    const page = parseInt(String(req.query.page), 10) || 1;
    const limit = parseInt(String(req.query.limit), 10) || 20;
    const { tours, meta } = await listTours({ featured, page, limit });

    sendSuccess(
      res,
      tours,
      meta,
      "Tours fetched successfully"
    );
  } catch (err) {
    sendError(res, 500, "TOURS_LIST_FAILED", err.message || "Failed to list tours");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tour = await getTourById(req.params.id);
    if (!tour) {
      return sendError(res, 404, "TOUR_NOT_FOUND", "No tour exists for this id.", { id: req.params.id });
    }
    sendSuccess(
      res,
      tour,
      {
        resource: "tour",
        id: String(tour._id),
      },
      "Tour fetched successfully"
    );
  } catch (err) {
    sendError(res, 400, "INVALID_TOUR_ID", "The tour id is not a valid ObjectId.", { id: req.params.id });
  }
});

module.exports = router;
