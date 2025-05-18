const Device = require("../models/device"); // model ya kuhifadhi fingerprints
const MAX_ACCOUNTS_PER_DEVICE = 3;

const deviceFingerprintMiddleware = async (req, res, next) => {
  try {
    const fingerprint = req.header("x-device-fingerprint");
    
    if (!fingerprint) {
      return res.status(400).json({ message: "Fingerprint ya kifaa haijatolewa." });
    }
    
    // Angalia kama fingerprint hiyo tayari imetumika mara nyingi
    const device = await Device.findOne({ fingerprint });
    
    if (device && device.accountCount >= MAX_ACCOUNTS_PER_DEVICE) {
      return res.status(429).json({
        message: `Akaunti nyingi zimesajiliwa kutoka kwenye kifaa hiki. Kiwango cha juu ni ${MAX_ACCOUNTS_PER_DEVICE}.`,
      });
    }
    
    // Fingerprint iko sawa, endelea
    req.fingerprint = fingerprint;
    next();
  } catch (err) {
    console.error("Hitilafu ya fingerprint middleware:", err.message);
    res.status(500).json({ message: "Hitilafu ya ndani ya server." });
  }
};

module.exports = deviceFingerprintMiddleware;