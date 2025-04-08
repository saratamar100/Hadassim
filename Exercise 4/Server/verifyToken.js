const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifySupplierToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.KEY_SUPPLIERS); //from file
    req.username = decoded.username;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
function verifySellerToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.KEY_SELLER); //from file
    req.username = decoded.username;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { verifySupplierToken, verifySellerToken };
