import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const SuppliersList = ({ suppliers, selected, setSelected }) => {
  return (
    <List
    sx={{
      minWidth:"10%",
      bgcolor: 'aliceblue',
      borderRadius: '5px',
      m: 1,
      p:1,
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
    }}>
      {suppliers.map((s) => (
        <ListItem key={s.supplierUsername} disablePadding>
          <ListItemButton
            selected={s.supplierUsername === selected}
            onClick={() => setSelected(s.supplierUsername)}
          >
            <ListItemText primary={s.supplierName} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
export default SuppliersList;
