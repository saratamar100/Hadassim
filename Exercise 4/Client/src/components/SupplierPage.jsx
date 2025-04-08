import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import OrderCard from "./OrderCard";
import { useNavigate } from "react-router-dom";
const SupplierPage = () => {
  const { user, token, updateUser, updateToken } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const handleLeave = () => {
    updateUser(null);
    updateToken(null); //function delete
    navigate("/login");
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/orders/supplier",
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
        "http://localhost:3001/api/orders/statusInProgress/" + id,
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
            o.orderId === id ? { ...o, status: "InProgress" } : o
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ m: 3 }}>
            Hello {user.supplierName}
          </Typography>
          <Button
            color="inherit"
            onClick={handleLeave}
            sx={{
              marginLeft: "auto",
              color: "aliceblue",
              color: "black",
              backgroundColor: "aliceblue",
              padding: 1,
              borderRadius: 2,
            }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container margin={2}>
        {orders.map((order) => (
          <OrderCard
            key={order.orderId}
            onConfirmOrder={() => handleConfirmOrder(order.orderId)}
            status={order.status}
            products={order.stock}
            hasButton={order.status === "Ordered"}
          />
        ))}
      </Grid>
    </Box>
  );
};
export default SupplierPage;
