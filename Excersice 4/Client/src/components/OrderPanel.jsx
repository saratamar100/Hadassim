import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";

const OrderPanel = ({ products, onSendOrder, amounts, setAmounts }) => {
  const isValidProduct = (p) => {
    if (amounts[p.productId] === undefined || amounts[p.productId] === 0) {
      return true;
    }
    if (amounts[p.productId] < 0) {
      return false;
    }
    if (amounts[p.productId] < p.minimalAmount) {
      return false;
    }
    return true;
  };
  const isValidData = products.every((p) => isValidProduct(p));
  return (
    <Box>
      {products.map((p) => (
        <Card key={p.productId} sx={{ m: 2, p: 2 }}>
          <Typography>Name: {p.productName}</Typography>
          <Typography>Minimal Amount to Order: {p.minimalAmount}</Typography>
          <TextField
            type="number"
            value={amounts[p.productId] ?? ""}
            onChange={(e) => {
              setAmounts((amounts) => ({
                ...amounts,
                [p.productId]: Number(e.target.value),
              }));
            }}
          />
          {!isValidProduct(p) && (
            <Typography color="error">Amount Not Valid</Typography>
          )}
        </Card>
      ))}
      <Button onClick={onSendOrder} disabled={!isValidData}>
        Make Order
      </Button>
    </Box>
  );
};
export default OrderPanel;
