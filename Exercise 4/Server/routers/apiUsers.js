const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const config = require("../dbconfig");
const jwt = require("jsonwebtoken");
const pool = mysql.createPool(config);
require("dotenv").config();

router.post("/loginSupplier", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ error: "Invalid user data" });
    }
    const query =
      "SELECT * FROM Suppliers WHERE supplier_username = ? AND password = ?";
    const [response] = await pool.query(query, [username, password]);
    if (response.length === 0) {
      return res.status(404).send({ error: "Invalid username or password" });
    }
    const user = response[0];
    const token = jwt.sign(
      { username: user.supplier_username },
      process.env.KEY_SUPPLIERS,
      // from file
      { expiresIn: "1h" }
    );

    return res.status(200).send({
      token,
      supplierUsername: user.supplier_username,
      supplierName: user.supplier_name,
      phoneNumber: user.phone_number,
      representativeName: user.representative_name,
    });
  } catch (err) {
    console.error("Error processing user data", err);
    res
      .status(500)
      .send({ error: "An error occurred while processing user data." });
  }
});

router.post("/loginSeller", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ error: "Invalid user data" });
    }
    const isSeller = confirmSeller(username, password);
    if (!isSeller) {
      return res.status(404).send({ error: "Invalid username or password" });
    }
    const token = jwt.sign(
      { username },
      process.env.KEY_SELLER,
      //from file
      { expiresIn: "1h" }
    ); //change to be unique

    return res.status(200).send({ token });
  } catch (err) {
    console.error("Error processing user data", err);
    res
      .status(500)
      .send({ error: "An error occurred while processing user data." });
  }
});

function confirmSeller(username, password) {
  return (
    process.env.USERNAME_SELLER === username &&
    process.env.PASSWORD_SELLER === password
  );
}

router.post("/signupSupplier", async (req, res) => {
  //finish
  try {
    const { username, name, phoneNumber, representativeName, password, stock } =
      req.body;

    if (
      !username ||
      !password ||
      !name ||
      !phoneNumber ||
      !representativeName ||
      !stock
    ) {
      return res.status(400).send({ error: "Invalid user data" });
    }

    const query = "SELECT * FROM Suppliers WHERE supplier_username = ?";
    const [response] = await pool.query(query, [username]);
    if (response.length > 0) {
      return res.status(409).send({
        error: "The username already exists. Please choose another username.",
      });
    }
    await createSupplier(
      username,
      name,
      phoneNumber,
      representativeName,
      password,
      stock
    );

    res.status(200).send("The user added successfully!");
  } catch (err) {
    console.error("Error processing user data", err);
    res
      .status(500)
      .send({ error: "An error occurred while processing user data." });
  }
});

async function createSupplier(
  username,
  name,
  phoneNumber,
  representativeName,
  password,
  stock
) {
  const insertQuery =
    "INSERT INTO Suppliers (supplier_username, supplier_name, phone_number, representative_name, password) VALUES (?, ?, ?, ?, ?)";
  const values = [username, name, phoneNumber, representativeName, password];
  try {
    const [result1] = await pool.query(insertQuery, values);
  } catch (error) {
    throw error;
  }
  console.log("hi");
  if (stock.length === 0) {
    return;
  }
  const insertStockQuery =
    "INSERT INTO Products (supplier_username, product_name, price, minimal_amount) VALUES ?";
  try {
    const [result2] = await pool.query(insertStockQuery, [
      stock.map((product) => [
        username,
        product.name,
        product.price,
        product.minimalAmount,
      ]),
    ]);
  } catch (error) {
    throw error;
  }
}

module.exports = router;
