import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import SupplierPage from "./components/SupplierPage";
import { UserContext } from "./components/UserProvider";
import { useContext } from "react";
import SignupPage from "./components/SignupPage";
import SellerLayout from "./components/SellerLayout.jsx";
import MakeOrderPage from "./components/MakeOrderPage.jsx";
import ViewOrdersPage from "./components/ViewOrdersPage.jsx";

const App = () => {
  const { user } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {user && user.role === "supplier" && (
          <Route path="/supplier" element={<SupplierPage />} />
        )}
        {user && user.role === "seller" && (
          <Route path="/seller" element={<SellerLayout />}>
            <Route path="makeorders" element={<MakeOrderPage />} />
            <Route path="vieworders" element={<ViewOrdersPage />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
