const Tour = require("../models/Tour");

async function listTours({ featured = false, page = 1, limit = 20 } = {}) {
  const filter = featured ? { featured: true } : {};
  const normalizedPage = Math.max(1, Number(page) || 1);
  const normalizedLimit = Math.min(100, Math.max(1, Number(limit) || 20));
  const skip = (normalizedPage - 1) * normalizedLimit;

  const [tours, totalDocuments, featuredCount] = await Promise.all([
    Tour.find(filter).sort({ createdAt: -1 }).skip(skip).limit(normalizedLimit).lean(),
    Tour.countDocuments(filter),
    Tour.countDocuments({ featured: true }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalDocuments / normalizedLimit));

  return {
    tours,
    meta: {
      total: tours.length,
      totalDocuments,
      page: normalizedPage,
      limit: normalizedLimit,
      totalPages,
      filters: { featured: featured || undefined },
      counts: {
        all: totalDocuments,
        featured: featuredCount,
        returned: tours.length,
      },
    },
  };
}

async function getTourById(id) {
  return Tour.findById(id).lean();
}

module.exports = { listTours, getTourById };
