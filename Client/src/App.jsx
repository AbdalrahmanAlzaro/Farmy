import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from './components/Footer'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Agriculturalnursery from "./pages/Agriculturalnursery";
import AnimalFarm from "./pages/AnimalFarm";
import Cart from "./pages/Cart";
import { useAuth } from "./hooks/useAuth";
import Contact from "./components/Contact";
import PayMent from './pages/PayMent'
import Check from './pages/Check'

const App = () => {
  const [displayName, setDisplayName] = useState("");
  const [cartProducts, setCartProducts] = useState([]);
  const { signup, login, logout } = useAuth();



  const handleSignup = async (email, password) => {
    // Perform signup logic
    await signup(email, password);

    // Update display name
    setDisplayName(email);
  };

  const handleLogin = async (email, password) => {
    // Perform login logic
    await login(email, password);

    // Update display name
    setDisplayName(email);
  };

  const handleLogout = async () => {
    // Perform logout logic
    await logout();

    // Clear display name
    setDisplayName("");
  };

  return (
    <Router>
      <Navbar displayName={displayName} handleLogout={handleLogout} cartProducts={cartProducts} />
      <Routes>
        <Route path="/" element={<Home displayName={displayName} />} />
        <Route
          path="/login"
          element={<Login setDisplayName={setDisplayName} />}
        />
        <Route
          path="/signup"
          element={<Signup handleSignup={handleSignup} />}
        />
        <Route
          path="/Contact"
          element={<Contact />}
        />
        <Route
          path="/Agriculturalnursery"
          element={<Agriculturalnursery setCartProductss={setCartProducts} />}
        />
        <Route
          path="/AnimalFarm"
          element={<AnimalFarm setCartProductss={setCartProducts} />}
        />
        <Route
          path="/products"
          element={<Products setCartProductss={setCartProducts} />}
        />
        <Route path="/PayMent" element={<PayMent />} />
        <Route path="/Check" element={<Check />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartProductss={cartProducts}
              setCartProductss={setCartProducts}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
