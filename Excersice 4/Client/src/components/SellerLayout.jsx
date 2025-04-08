import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./UserProvider";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyLink = styled(Link)({
  color: "aliceblue",
  //backgroundColor: 'aliceblue',
  padding: 8,
  // borderRadius: 4,
  textDecoration: "none",
});

const SellerLayout = () => {
  const { user, token, updateUser, updateToken } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLeave = () => {
    updateUser(null);
    updateToken(null); //function delete
    navigate("/");
  };

  return (
    <Stack
      flexDirection="column"
      sx={{
        minHeight: "100vh",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ m: 3 }}>
            <MyLink to="makeorders">Make Orders</MyLink>
          </Typography>
          <Typography variant="h6" component="div" sx={{ m: 3 }}>
            <MyLink to="vieworders">View Orders</MyLink>
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
      <Outlet />
    </Stack>
  );
};
export default SellerLayout;
