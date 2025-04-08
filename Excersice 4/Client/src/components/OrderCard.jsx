import { Button, Card, Typography } from "@mui/material";

const OrderCard = ({
  onConfirmOrder,
  status,
  supplierName,
  products,
  hasButton,
}) => {
  return (
    <Card sx={{ m: 2, p: 3, minWidth: "170px", minHeight: "100px" }}>
      {products.map((p) => (
        <Typography key={p.productId}>
          {p.amount} {p.productName}
        </Typography>
      ))}
      {status && <Typography mt={1}>Status :{status}</Typography>}
      {supplierName && <Typography>Supplier :{supplierName}</Typography>}
      {hasButton && (
        <Button sx={{ mt: 1 }} onClick={onConfirmOrder}>
          Confirm Order
        </Button>
      )}
    </Card>
  );
};
export default OrderCard;
