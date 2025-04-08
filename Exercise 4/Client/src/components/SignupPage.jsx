import {
  Box,
  Button,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductsTable from "./ProductsTables";

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerificaton, setPasswordVerificaton] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [productsRows, setProductsRows] = useState([]);
  const [isTableEdited, setIsTableEdited] = useState(false);

  const validateData = () => {
    if (
      !username.trim() ||
      !name.trim() ||
      !phone.trim() ||
      !representativeName.trim() ||
      !password.trim() ||
      !passwordVerificaton.trim()
    ) {
      setErrorMessage("All fields are required.");
      return false;
    }
    if (
      isNaN(Number(phone.trim())) ||
      phone.trim().length < 9 ||
      phone.trim().length > 10
    ) {
      setErrorMessage("Please enter a valid phone number with only digits.");
      return false;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== passwordVerificaton) {
      setErrorMessage("The passwords do not match.");
      return false;
    }
    if (isTableEdited) {
      setErrorMessage("The Table is edited.");
      return false;
    }
    if (
      productsRows.length === 0 ||
      productsRows.some(
        (row) =>
          row.productName === "" || row.price === "" || row.minimalAmount === ""
      )
    ) {
      setErrorMessage("The Table is empty.");
      return false;
    }
    return true;
  };
  const handleSignup = async () => {
    const isValid = validateData();
    if (!isValid) {
      return;
    }
    const stock = productsRows.map((p) => ({
      name: p.productName,
      price: p.price,
      minimalAmount: p.minimalAmount,
    }));
    try {
      const response = await fetch("http://localhost:3001/api/signupSupplier", {
        method: "POST",
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
          name: name.trim(),
          phoneNumber: phone.trim(),
          representativeName: representativeName.trim(),
          stock,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 409) {
        setErrorMessage("The username already exists in the system.");
        return;
      }
      if (!response.ok) {
        setErrorMessage("An error occurred. Try again.");
        return;
      }
      alert("The user has successfully registered.");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Stack
      gap={2}
      maxWidth="50%"
      mx="auto"
      mt={2}
      textAlign="center"
      alignItems="center"
    >
      <Typography variant="h4" sx={{ fontFamily: "Rubik" }} textAlign="center">
        Sign Up
      </Typography>
      <TextField
        id="username"
        label="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="username"
        sx={{ width: "70%", bgcolor: "white" }}
      />
      <TextField
        id="name"
        label="Company Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Company Name"
        sx={{ width: "70%", bgcolor: "white" }}
      />
      <TextField
        id="phone"
        label="Telephone"
        value={phone}
        type="tel"
        onChange={(e) => {
          setPhone(e.target.value);
        }}
        placeholder="Telephone"
        sx={{ width: "70%", bgcolor: "white" }}
      />
      <TextField
        id="representativeName"
        label="Representative Name"
        value={representativeName}
        onChange={(e) => {
          setRepresentativeName(e.target.value);
        }}
        placeholder="Representative Name"
        sx={{ width: "70%", bgcolor: "white" }}
      />
      <TextField
        id="password"
        label="Password"
        value={password}
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
        sx={{ width: "70%", bgcolor: "white" }}
      />
      <TextField
        id="passwordVerification"
        label="Password Verification"
        value={passwordVerificaton}
        type="password"
        onChange={(e) => {
          setPasswordVerificaton(e.target.value);
        }}
        placeholder="Password Verification"
        sx={{ width: "70%", bgcolor: "white" }}
      />
      <ProductsTable
        rows={productsRows}
        setRows={setProductsRows}
        setIsTableEdited={setIsTableEdited}
      />
      <Typography
        mt={1}
        color="error"
        sx={{ visibility: errorMessage ? "visible" : "hidden" }}
      >
        {errorMessage || "error"}
      </Typography>
      <Stack direction="row" mb={5}>
        <Button onClick={handleSignup}>Sign Up</Button>
        <Button onClick={handleLogin}>Have an account? Log in</Button>
      </Stack>
    </Stack>
  );
};
export default SignupPage;
