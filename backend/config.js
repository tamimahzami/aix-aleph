// backend/config.js
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret",
  JWT_ALGS: ["HS256"],     // explizit setzen
  JWT_CLOCK_TOLERANCE: 5,  // Sekunden Toleranz gegen leichte Uhrdrifts
};
