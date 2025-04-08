const mysql = require("mysql2");
const http = require("http");
const db = require("./dbconfig");

//make a connection with the database
var connection = mysql.createConnection(db);

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error("Failed to connect to the MySQL server:", err);
    return;
  }
  console.log("Connected to the MySQL server");

  // Create the database if it doesn't exist
  connection.query("CREATE DATABASE IF NOT EXISTS " + db.database, (err) => {
    if (err) {
      console.error("Failed to create database:", err);
      return;
    }

    // Switch to the newly created database
    connection.query("USE " + db.database, (err) => {
      if (err) {
        console.error("Failed to switch to the database:", err);
        return;
      }
      console.log("Using the database: " + db.database);

      // Create the suppliers table
      const createSuppliersTable = `CREATE TABLE IF NOT EXISTS Suppliers (
        supplier_username VARCHAR(100) NOT NULL PRIMARY KEY,
        supplier_name VARCHAR(100),
        phone_number VARCHAR(15),
        representative_name VARCHAR(100),
        password VARCHAR(100) NOT NULL
        )`;

      connection.query(createSuppliersTable, (err) => {
        if (err) {
          console.error("Failed to create suppliers table:", err);
          return;
        }
        console.log("Suppliers table created successfully");
      });

      // Create the products table
      const createProductsTable = `CREATE TABLE IF NOT EXISTS Products (
		    product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        supplier_username VARCHAR(100),
        product_name VARCHAR(100),
        price int,
        minimal_amount int,
        FOREIGN KEY (supplier_username) REFERENCES Suppliers(supplier_username)
)`;

      connection.query(createProductsTable, (err) => {
        if (err) {
          console.error("Failed to create products table:", err);
          return;
        }
        console.log("Products table created successfully");
      });

      // Create the orders table
      const createOrdersTable = `CREATE TABLE IF NOT EXISTS Orders (
		    order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        supplier_username VARCHAR(100),
        status ENUM("Ordered","InProgress","Completed"),
        
        FOREIGN KEY (supplier_username) REFERENCES Suppliers(supplier_username)
          )`;

      connection.query(createOrdersTable, (err) => {
        if (err) {
          console.error("Failed to create orders table:", err);
          return;
        }
        console.log("Orders table created successfully");
      });

      // Create the orderProducts table
      const createOrderProductsTable = `CREATE TABLE IF NOT EXISTS OrderProducts (
		    order_id int,
        product_id int,
        amount int,
        FOREIGN KEY (order_id) REFERENCES Orders(order_id),
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
)`;

      connection.query(createOrderProductsTable, (err) => {
        if (err) {
          console.error("Failed to create orderProducts table:", err);
          return;
        }
        console.log("OrderProducts table created successfully");
      });

      // Close the MySQL connection
      connection.end((err) => {
        if (err) {
          console.error("Failed to close the connection:", err);
        }
      });
    });
  });
});
