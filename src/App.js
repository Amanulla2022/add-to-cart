import "./App.css";
import Products from "./components/Product";
import Cart from "./components/Cart";
import { useState } from "react";

function App() {
  // State to manage cart items and quantities
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Function to add a product to the cart
  const addToCart = (product, quantity) => {
    // Check if the product already exists in the cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    // If the product exists, update its quantity
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      // If the product doesn't exist, add it to the cart
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    // Update quantity in Products component
    const updatedQuantity = (quantities[product.id] || 0) + quantity;
    setQuantities({
      ...quantities,
      [product.id]: updatedQuantity >= 0 ? updatedQuantity : 0,
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    // Remove quantity from state if item removed
    setQuantities((prevQuantities) => {
      const { [productId]: removedQuantity, ...restQuantities } =
        prevQuantities;
      return restQuantities;
    });
  };

  // Function to update the quantity of a product in the cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId); // Remove item if quantity becomes zero
      return;
    }
    // Update quantity in Products component
    setQuantities({
      ...quantities,
      [productId]: newQuantity,
    });
    // Update quantity in Cart component
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Render Products and Cart components
  return (
    <div className="w-full flex m-4 p-2">
      <Products addToCart={addToCart} quantities={quantities} />
      <Cart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </div>
  );
}

export default App;
