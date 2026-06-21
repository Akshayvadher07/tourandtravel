require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const tourRoutes = require("./routes/tourRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const travelPlanRoutes = require("./routes/travelPlanRoutes");
const { sendError } = require("./utils/apiResponse");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

const clientOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

function isLocalDevOrigin(origin) {
  if (!origin) return false;
  return /^(https?:\/\/)(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (clientOrigins.includes(origin)) return callback(null, true);
      if (process.env.NODE_ENV !== "production" && isLocalDevOrigin(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
  })
);

app.use(express.json());

// ── Routes ──────────────────────────────────────────────
app.use("/api/tours", tourRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/travel-plans", travelPlanRoutes);

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "tourandtravel-user-backend",
    port: PORT,
  });
});

// ── 404 catch-all (must be last) ────────────────────────
app.use((req, res) => {
  sendError(res, 404, "NOT_FOUND", "No handler for this path.", {
    method: req.method,
    path: req.originalUrl,
  });
});

function isConnectionRefused(err) {
  const s = `${err?.message || ""}${err?.cause?.message || ""}`;
  return s.includes("ECONNREFUSED");
}

async function start() {
  try {
    await connectDB();
    console.log("MongoDB connected.");
  } catch (err) {
    if (isConnectionRefused(err)) {
      console.error("\n--- MongoDB: connection refused ---");
      console.error("Nothing is accepting TCP on the host:port in MONGODB_URI.");
    } else {
      console.error("MongoDB connection error:", err.message || err);
    }
    console.error("API will still start; /api/tours returns 503 until the database is reachable.\n");
  }

  const server = app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`\nPort ${PORT} is already in use. Stop the other process or set PORT in backend/.env to a free port.\n`);
    } else {
      console.error("Server error:", err);
    }
    process.exit(1);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err.message || err);
  process.exit(1);
});
