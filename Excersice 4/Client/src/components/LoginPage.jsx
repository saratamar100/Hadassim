import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { user, token, updateUser, updateToken } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    if (token && user) {
      if (user.role === "supplier") {
        navigate("/supplier");
      } else if (user.role === "seller") {
        navigate("/seller");
      }
    }
  }, [token, user]); 


  const handleEnterSupplier = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/loginSupplier`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });
      if (response.status === 404)
        return setErrorMessage("Username or password is incorrect.");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const { token } = data;
      if (token) {
        updateToken(token);
        updateUser({
          role: "supplier",
          username,
          supplierName: data.supplierName,
        });
        navigate("/supplier");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEnterSeller = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/loginSeller`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });
      if (response.status === 404)
        return setErrorMessage("Username or password is incorrect.");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const { token } = data;
      if (token) {
        updateToken(token);
        updateUser({ role: "seller", username });
        navigate("/seller");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSugnup = () => {
    navigate("/signup");
  };
  return (
    <Stack gap={1} sx={{ mt: 25, alignItems: "center" }}>
      <Typography variant="h4" sx={{fontFamily:"Rubik"}}>Login</Typography>
      <TextField
        id="username-basic"
        label="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="username"
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />
      <Stack direction="row">
        <Button onClick={handleEnterSupplier}>Enter as a supplier</Button>
        <Button onClick={handleEnterSeller}>Enter as a seller</Button>
      </Stack>
      <Button onClick={handleSugnup}>Sign up</Button>
      <Typography color="error">{errorMessage}</Typography>
    </Stack>
  );
};
export default LoginPage;
