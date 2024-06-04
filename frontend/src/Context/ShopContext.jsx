import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
  let cart = {};
  for (let index = 0; index < products.length; index++) {
    cart[products[index].Id_Produit] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [all_product, setAllProduct] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => {
        setAllProduct(data);
        setCartItems(getDefaultCart(data));
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.Id_Produit === Number(item));
        totalAmount += cartItems[item] * itemInfo.Prix;
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
