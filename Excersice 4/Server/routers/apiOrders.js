const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const config = require("../dbconfig");
const { verifySupplierToken, verifySellerToken } = require("../verifyToken.js");
const pool = mysql.createPool(config);

//change
router.get("/supplier", verifySupplierToken, async (req, res) => {
  const { username } = req;
  const query = "SELECT * FROM Orders WHERE supplier_username=?";
  const values = [username];
  try {
    const [results] = await pool.query(query, values);
    await Promise.all(
      results.map(async (item) => {
        const query2 =
          "SELECT * FROM OrderProducts NATURAL JOIN Products WHERE order_id = ?";
        const values2 = [item.order_id];
        const [results2] = await pool.query(query2, values2);
        item.stock = results2.map((p) => ({
          productId: p.product_id,
          productName: p.product_name,
          amount: p.amount,
        }));
      })
    );

    res.json(
      results.map((o) => ({
        orderId: o.order_id,
        status: o.status,
        stock: o.stock,
      }))
    );
  } catch (err) {
    console.error("Error while fetching suppliers:", err);
    res.status(500).json({ error: "Database error" });
  }
});

router.post(
  "/statusInProgress/:orderId",
  verifySupplierToken,
  async (req, res) => {
    const { orderId } = req.params;
    const { username } = req;
    if (!orderId) {
      return res.status(400).send({ error: "Invalid order data" });
    }

    const query =
      "SELECT * FROM Orders WHERE order_id=? AND supplier_username= ? AND status= ? ";
    const values = [orderId, username, "Ordered"];
    try {
      const [results] = await pool.query(query, values);
      if (results.length === 0) {
        return res.status(404).send({ error: "Invalid data" }); 
      }
      const query2 = "UPDATE Orders SET status = ? WHERE order_id = ?;";
      const values2 = ["InProgress", orderId];
      await pool.query(query2, values2);

      res.status(200).send("The order updated successfully!");
    } catch (err) {
      console.error("Error processing order data", err);
      res
        .status(500)
        .send({ error: "An error occurred while processing user data." });
    }
  }
);

//for seller:
router.post("/", verifySellerToken, async (req, res) => {
  const { supplierUsername, products } = req.body;
  if (!supplierUsername || !products) {
    return res.status(400).send({ error: "Invalid order data" });
  }
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [{ insertId: orderId }] = await connection.query(
      "INSERT INTO Orders (supplier_username, status) VALUES (?, ?)",
      [supplierUsername, "Ordered"]
    );
    let error = false;
    await Promise.all(
      products.map(async (p) => {
        const query =
          "SELECT * FROM Products WHERE supplier_username=? AND product_id=? AND minimal_amount <= ?";
        const values = [supplierUsername, p.productId, p.amount];
        const [results] = await connection.query(query, values);
        if (results.length === 0) {
          error = true;
        }
        await connection.query(
          "INSERT INTO OrderProducts (order_id, product_id, amount) VALUES (?, ?, ?)",
          [orderId, p.productId, p.amount]
        );
      })
    );
    if (error) {
      return res.status(400).send({ error: "Invalid order products data" });
    }
    await connection.commit();
    res.status(200).send("The order was created successfully!");
  } catch (err) {
    console.error("Error processing order data", err);
    res
      .status(500)
      .send({ error: "An error occurred while processing order data." });
  }
});

router.get("/seller", verifySellerToken, async (req, res) => {
  const query = "SELECT * FROM Orders";
  try {
    const [results] = await pool.query(query);
    await Promise.all(
      results.map(async (item) => {
        const query2 =
          "SELECT * FROM OrderProducts NATURAL JOIN Products NATURAL JOIN Suppliers WHERE order_id = ?";
        const values2 = [item.order_id];
        const [results2] = await pool.query(query2, values2);

        if (results2.length > 0) {
          item.supplierUsername = results2[0].supplier_username;
          item.supplierName = results2[0].supplier_name;
        }

        item.stock = results2.map((p) => ({
          // supplierUsername: p.supplier_username,
          // supplierName: p.supplier_name,
          productId: p.product_id,
          productName: p.product_name,
          amount: p.amount,
        }));
      })
    );

    res.json(
      results.map((o) => ({
        orderId: o.order_id,
        status: o.status,
        supplierName: o.supplierName, 
        supplierUsername: o.supplierUsername,  
        stock: o.stock,
      }))
    );
  } catch (err) {
    console.error("Error while fetching suppliers:", err);
    res.status(500).json({ error: "Database error" });
  }
});


router.post(
  "/statusCompleted/:orderId",
  verifySellerToken,
  async (req, res) => {
    const { orderId } = req.params;
    if (!orderId) {
      return res.status(400).send({ error: "Invalid order data" });
    }

    const query = "SELECT * FROM Orders WHERE order_id=? AND status= ? ";
    const values = [orderId, "InProgress"];
    try {
      const [results] = await pool.query(query, values);
      if (results.length === 0) {
        return res.status(404).send({ error: "Invalid data" }); 
      }
      const query2 = "UPDATE Orders SET status = ? WHERE order_id = ?;";
      const values2 = ["Completed", orderId];
      await pool.query(query2, values2);

      res.status(200).send("The order updated successfully!");
    } catch (err) {
      console.error("Error processing order data", err);
      res
        .status(500)
        .send({ error: "An error occurred while processing user data." });
    }
  }
);

module.exports = router;
