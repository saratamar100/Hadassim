const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const config = require("../dbconfig");
const pool = mysql.createPool(config);
const { verifySupplierToken, verifySellerToken } = require("../verifyToken.js");

router.get("/", verifySellerToken, async (req, res) => {
  const query = "SELECT * FROM suppliers";
  try {
    const [results] = await pool.query(query);
    res.json(
      results.map((s) => ({
        supplierUsername: s.supplier_username,
        supplierName: s.supplier_name,
        phoneNumber: s.phone_number,
        representativeName: s.representative_name,
      }))
    );
  } catch (err) {
    console.error("Error while fetching suppliers:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
