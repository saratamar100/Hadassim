const mysql = require("mysql2");
const db = require("./dbconfig");

// Make a connection with the database
const connection = mysql.createConnection(db);

// Connect to the MySQL server
connection.connect(async (err) => {
  if (err) {
    console.error("Failed to connect to the MySQL server:", err);
    return;
  }
  console.log("Connected to the MySQL server");

  try {
    // Switch to the database
    await connection.promise().query("USE " + db.database);

    // Insert data into the suppliers table
    const suppliersData = [
      {
        supplierUsername: "tnuva",
        supplierName: "Tnuva",
        phoneNumber: "052-5252525",
        representativeName: "Avraham David",
        password: "1",
      },
    ];
    await connection
      .promise()
      .query(
        "INSERT INTO Suppliers (supplier_username, supplier_name, phone_number, representative_name, password) VALUES ?",
        [
          suppliersData.map((supplier) => [
            supplier.supplierUsername,
            supplier.supplierName,
            supplier.phoneNumber,
            supplier.representativeName,
            supplier.password,
          ]),
        ]
      );

    // Insert data into the products table
    const productsData = [
      {
        suppliersUsername: "tnuva",
        productName: "Milk",
        price: 5,
        minimalAmount: 5,
      },
    ];
    const [{ insertId: productId }] = await connection
      .promise()
      .query(
        "INSERT INTO Products (supplier_username, product_name, price, minimal_amount) VALUES ?",
        [
          productsData.map((product) => [
            product.suppliersUsername,
            product.productName,
            product.price,
            product.minimalAmount,
          ]),
        ]
      );

    // Insert data into the Orders table
    const ordersData = [{ supplierUsername: "tnuva", status: "Ordered" }];
    const [{ insertId: orderId }] = await connection
      .promise()
      .query("INSERT INTO Orders (supplier_username, status) VALUES ?", [
        ordersData.map((order) => [order.supplierUsername, order.status]),
      ]);

    // Insert data into the orderProducts table
    const orderProductsData = [{ orderId, productId, amount: 200 }];
    await connection
      .promise()
      .query(
        "INSERT INTO OrderProducts (order_id, product_id, amount) VALUES ?",
        [
          orderProductsData.map((orderPoduct) => [
            orderPoduct.orderId,
            orderPoduct.productId,
            orderPoduct.amount,
          ]),
        ]
      );

    console.log("Data inserted successfully.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the MySQL connection
    connection.end((err) => {
      if (err) {
        console.error("Failed to close the connection:", err);
      }
    });
  }
});
