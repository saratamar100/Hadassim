import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const SuppliersList = ({ suppliers, selected, setSelected }) => {
  return (
    <List>
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
