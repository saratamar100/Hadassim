const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const config = require("../dbconfig");
const pool = mysql.createPool(config);
const { verifySupplierToken, verifySellerToken } = require("../verifyToken.js");

router.get("/:supplierUsername", verifySellerToken, async (req, res) => {
  const { supplierUsername } = req.params;
  const query = "SELECT * FROM Products WHERE supplier_username = ?";
  const values = [supplierUsername];
  try {
    const [results] = await pool.query(query, values);
    res.json(
      results.map((p) => ({
        productId: p.product_id,
        productName: p.product_name,
        price: p.proce,
        minimalAmount: p.minimal_amount,
      }))
    );
  } catch (err) {
    console.error("Error while fetching suppliers:", err);
    res.status(500).json({ error: "Database error" });
  }
});
module.exports = router;
