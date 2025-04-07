import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./UserProvider";
import { Link, Outlet, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const SellerLayout = () => {
  const { user, token, updateUser, updateToken } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLeave = () => {
    updateUser(null);
    updateToken(null); //function delete
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="makeorders">makeorders</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="vieworders">vieworders</Link>
          </Typography>
          <Button color="inherit" onClick={handleLeave}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};
export default SellerLayout;
