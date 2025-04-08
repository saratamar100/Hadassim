import { Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import SuppliersList from "./SuppliersList";
import OrderPanel from "./OrderPanel";

const MakeOrderPage = () => {
  const { user, token, updateUser, updateToken } = useContext(UserContext);
  const [suppliers, setSupplier] = useState([]);
  const [selected, setSelected] = useState();
  const [products, setProducts] = useState([]);
  const [amounts, setAmounts] = useState({});
  const selectedSupplier = suppliers.find(
    (s) => s.supplierUsername === selected
  );
  useEffect(() => {
    setAmounts({});
  }, [selected]);
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/suppliers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          alert("An error occurred. Try again.");
        } else {
          const data = await response.json();
          setSupplier(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selected) {
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:3001/api/products/" + selected,
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
          setProducts(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, [selected]);

  const handleSendOrder = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        body: JSON.stringify({
          supplierUsername: selected,
          products: Object.entries(amounts)
            .filter(([id, amount]) => amount > 0)
            .map(([id, amount]) => ({ productId: id, amount })),
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        alert("An error occurred. Try again.");
        return;
      }
      alert("The order was placed successfully.");
      setAmounts({});
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Stack direction="row" sx={{ flexGrow: 1 }}>
      <SuppliersList
        suppliers={suppliers}
        selected={selected}
        setSelected={setSelected}
      />
      <Stack justifyContent="center" alignItems="center" margin="auto">
        {selected && products.length > 0 && (
          <OrderPanel
            products={products}
            amounts={amounts}
            setAmounts={setAmounts}
            supplierName={selectedSupplier.supplierName}
            phone={selectedSupplier.phoneNumber}
            representativeName={selectedSupplier.representativeName}
            onSendOrder={handleSendOrder}
          />
        )}
        {!selected && (
          <Typography
            variant="h6"
            color="black"
            fontWeight="bold"
            textAlign="center"
          >
            Select a Supplier to Make an Order
          </Typography>
        )}
        {selected && products.length === 0 && (
          <Typography
            variant="h6"
            color="black"
            fontWeight="bold"
            textAlign="center"
          >
            The supplier doesn't have products
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
export default MakeOrderPage;
