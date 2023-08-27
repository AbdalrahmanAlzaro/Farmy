import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import CartProvider from "./hooks/CartContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleClientId = "539938584706-7scg7ee5f1ou61h764v0t0r3q6n5aq6t.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <CartProvider>
        <GoogleOAuthProvider clientId={GoogleClientId}>
          <App />
        </GoogleOAuthProvider>
      </CartProvider>
    </ChakraProvider>
  </React.StrictMode>
);
