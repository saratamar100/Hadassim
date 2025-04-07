import { Box, Button, Input, TextField, Typography } from "@mui/material";
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
  const handleSignup = async () => {
    // validation!
    if (password !== passwordVerificaton) {
      setErrorMessage("The passwords do not match.");
      return;
    }
    if (isTableEdited) {
      setErrorMessage("The Table is edited.");
      return;
    }
    if (
      productsRows.some(
        (row) =>
          row.productName === "" || row.price === "" || row.minimalAmount === ""
      )
    ) {
      setErrorMessage("The Table is not full.");
      return;
    }
    const stock = productsRows.map((p) => ({
      name: p.productName,
      price: price,
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
  console.log(isTableEdited);
  return (
    <Box>
      <Typography>Enter</Typography>
      <TextField
        required
        id="username"
        label="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="username"
      />
      <TextField
        required
        id="name"
        label="Company Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Company Name"
      />
      <TextField
        required
        id="phone"
        label="Telephone"
        value={phone}
        type="tel"
        onChange={(e) => {
          setPhone(e.target.value);
        }}
        placeholder="Telephone"
      />
      <TextField
        required
        id="representativeName"
        label="Representative Name"
        value={representativeName}
        onChange={(e) => {
          setRepresentativeName(e.target.value);
        }}
        placeholder="Representative Name"
      />
      <TextField
        required
        id="password"
        label="Password"
        value={password}
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
      />
      <TextField
        required
        id="passwordVerification"
        label="Password Verification"
        value={passwordVerificaton}
        type="password"
        onChange={(e) => {
          setPasswordVerificaton(e.target.value);
        }}
        placeholder="Password Verification"
      />
      <ProductsTable
        rows={productsRows}
        setRows={setProductsRows}
        setIsTableEdited={setIsTableEdited}
      />
      <Button onClick={handleSignup}>Sign Up</Button>
      <Typography>{errorMessage}</Typography>
    </Box>
  );
};
export default SignupPage;
