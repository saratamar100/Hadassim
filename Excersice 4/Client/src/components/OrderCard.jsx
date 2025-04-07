import { Button, Card, Typography } from "@mui/material";

const OrderCard = ({ onConfirmOrder, status, products, hasButton }) => {
  return (
    <Card sx={{ m: 2 }}>
      {products.map((p) => (
        <Typography key={p.productId}>
          {p.amount} {p.productName}
        </Typography>
      ))}
      <br />
      <Typography>Status :{status}</Typography>
      {hasButton && <Button onClick={onConfirmOrder}>Confirm Order</Button>}
    </Card>
  );
};
export default OrderCard;
