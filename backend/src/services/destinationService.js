const Destination = require("../models/Destination");

async function listDestinations() {
  return Destination.find().sort({ createdAt: -1 }).lean();
}

module.exports = { listDestinations };
