import { useContext, useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { UserContext } from "./UserProvider";
import { Box } from "@mui/material";

const ViewOrdersPage = () => {
  const { user, token, updateUser, updateToken } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
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
      <Box>
        {orders.map((order) => (
          <OrderCard
            key={order.orderId}
            onConfirmOrder={() => handleConfirmOrder(order.orderId)}
            status={order.status}
            products={order.stock}
            hasButton={order.status === "InProgress"}
          />
        ))}
      </Box>
    </Box>
  );
};
export default ViewOrdersPage;
