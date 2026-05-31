const TravelPlan = require("../models/TravelPlan");

async function createTravelPlan(input) {
  return TravelPlan.create(input);
}

module.exports = { createTravelPlan };
