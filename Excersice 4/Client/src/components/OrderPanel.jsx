import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const OrderPanel = ({
  products,
  onSendOrder,
  amounts,
  setAmounts,
  supplierName,
  phone,
  representativeName,
}) => {
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
  const isEmptyOrder = products.every(
    (p) => !amounts[p.productId] || amounts[p.productId] === 0
  );
  const totalPrice = products
    .map((p) => {
      const amount = amounts[p.productId] ?? 0;
      if (amount >= p.minimalAmount) {
        return p.price * amount;
      }
      return 0;
    })
    .reduce((total, price) => total + price, 0);
  return (
    <Stack direction="column" textAlign="center">
      <Box mb={3} mt={2}>
        <Stack
          direction="row"
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          <Typography>
            <strong>Supplier:</strong> {supplierName}
          </Typography>
          <Typography>
            <strong>Telephone:</strong> {phone}
          </Typography>
          <Typography>
            <strong>Representative:</strong> {representativeName}
          </Typography>
        </Stack>
      </Box>

      <Grid container>
        {products.map((p) => (
          <Card key={p.productId} sx={{ m: 2, p: 3 }}>
            <Typography variant="body1" sx={{ fontSize: 20 }}>
              <strong>{p.productName}</strong>
            </Typography>
            <Typography>Price: {p.price}₪</Typography>
            <Typography>
              Minimal Amount to Order: {p.minimalAmount} units
            </Typography>
            <TextField
              sx={{ mt: 2 }}
              type="number"
              value={amounts[p.productId] ?? ""}
              onChange={(e) => {
                setAmounts((amounts) => ({
                  ...amounts,
                  [p.productId]: Number(e.target.value),
                }));
              }}
            />
            <Typography
              color="error"
              sx={{ visibility: isValidProduct(p) ? "hidden" : "visible" }}
            >
              Amount Not Valid
            </Typography>
          </Card>
        ))}
      </Grid>
      {!isValidData && (
        <Typography color="error">The order is not valid</Typography>
      )}
      {isEmptyOrder && (
        <Typography color="error">The order is empty</Typography>
      )}
      <Typography>Total price: {totalPrice}₪</Typography>
      <Button onClick={onSendOrder} disabled={!isValidData || isEmptyOrder}>
        Make Order
      </Button>
    </Stack>
  );
};
export default OrderPanel;
