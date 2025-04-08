import { useContext, useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { UserContext } from "./UserProvider";
import { Box, Grid, Tab, Tabs } from "@mui/material";

const ViewOrdersPage = () => {
  const { user, token, updateUser, updateToken } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [value, setValue] = useState("Ordered");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/orders/seller",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        if (!response.ok) {
          alert("An error occurred. Try again.");
        } else {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrders();
  }, []);
  const handleConfirmOrder = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/orders/statusCompleted/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        alert("An error occurred. Try again.");
      } else {
        setOrders((orders) =>
          orders.map((o) =>
            o.orderId === id ? { ...o, status: "Completed" } : o
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Ordered" value="Ordered" />
        <Tab label="In Progress" value="InProgress" />
        <Tab label="Completed" value="Completed" />
      </Tabs>
      <Grid container>
        {orders
          .filter((o) => o.status === value)
          .map((order) => (
            <OrderCard
              key={order.orderId}
              onConfirmOrder={() => handleConfirmOrder(order.orderId)}
              supplierName={order.supplierName}
              products={order.stock}
              hasButton={order.status === "InProgress"}
            />
          ))}
      </Grid>
    </Box>
  );
};
export default ViewOrdersPage;
