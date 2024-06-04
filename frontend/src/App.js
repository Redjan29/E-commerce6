import React from 'react';
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import ShopCategory from "./Pages/ShopCategory";
import LoginSignup from "./Pages/LoginSignup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";

function Layout() {
  const location = useLocation(); // Utilisation de useLocation ici
  const hideNavFooter = location.pathname === '/Dashboard' || location.pathname === '/Profile';

  
    // Ajoutez les logs ici pour déboguer
    console.log("Current Path:", location.pathname);
    console.log("Hide Navbar and Footer:", hideNavFooter);
  

  return (
    <div>
      {!hideNavFooter && <Navbar />} 
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/mens" element={<ShopCategory />} />
        <Route path="/womens" element={<ShopCategory />} />
        <Route path="/kids" element={<ShopCategory />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/LoginSignup" element={<LoginSignup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
      {!hideNavFooter && <Footer />} 
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
