const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
var config = require("./dbconfig");

const app = express();
app.use(express.json());
app.use(cors());

// Database connection setup
const con = mysql.createConnection(config);

con.connect((err) => {
  if (err) {
    console.error("Error in connection to database", err);
    return;
  }
  console.log("Connected to the database in api");
});

// Initial route
app.get("/", (req, res) => {
  res.send("Connected to the database and server");
});

// Other routes
const apiUsersRouter = require("./routers/apiUsers");
const apiSuppliersRouter = require("./routers/apiSuppliers");
const apiProductsRouter = require("./routers/apiProducts");
// const apiSellersRouter = require("./routers/apiSellers");
const apiOrdersRouter = require("./routers/apiOrders");

app.use(express.static("public"));
app.use(express.json());

app.use("/api", apiUsersRouter);
app.use("/api/suppliers", apiSuppliersRouter);
app.use("/api/products", apiProductsRouter);
// app.use("/api/sellers", apiSellersRouter);
app.use("/api/orders", apiOrdersRouter);

// Start the server
app.listen(3001, () => {
  console.log("App listening on port 3001.");
});
