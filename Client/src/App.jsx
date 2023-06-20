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
import Contact from "./components/Contact";
import PayMent from './pages/PayMent'
import Check from './pages/Check'
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const [cartProducts, setCartProducts] = useState([]);


  return (
    <Router>
      <Navbar  cartProducts={cartProducts} />
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route
          path="/login"
          element={<Login  />}
        />
        <Route
          path="/signup"
          element={<Signup  />}
        />
        <Route
          path="/Contact"
          element={<Contact />}
        />
        <Route
          path="/ProfilePage"
          element={<ProfilePage />}
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
