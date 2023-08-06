import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Agriculturalnursery from "./pages/Agriculturalnursery";
import AnimalFarm from "./pages/AnimalFarm";
import Cart from "./pages/Cart";
import Contact from "./components/Contact";
import PayMent from "./pages/PayMent";
import Check from "./pages/Check";
import ProfilePage from "./pages/ProfilePage";
import TranslationPage from "./components/Transletor";
import ProductCard from "./components/ProductCard";
import About from "./pages/About";
import NoPage from "./pages/NoPage";

const App = () => {
  const [cartProducts, setCartProducts] = useState(
    JSON.parse(localStorage.getItem("Carts")) ?? []
  );
  const [isLog, updateIsLog] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <Router>
      <Navbar
        cartProducts={cartProducts}
        isLog={isLog}
        updateIsLog={updateIsLog}
      />
      <Routes>
        {/* Public routes (for users who are not logged in) */}
        {!isLog && (
          <>
            <Route
              path="/"
              element={<Home setCartProductss={setCartProducts} />}
            />
            <Route
              path="/login"
              element={<Login updateIsLog={updateIsLog} />}
            />
            <Route
              path="/signup"
              element={<Signup updateIsLog={updateIsLog} />}
            />
            <Route path="/Contact" element={<Contact isLog={isLog} />} />
            <Route path="/About" element={<About isLog={isLog} />} />
            <Route path="/TranslationPage" element={<TranslationPage />} />
            <Route
              path="/ProductCard"
              element={<ProductCard isLog={isLog} />}
            />
            <Route path="/Check" element={<Check />} />
            <Route
              path="/Agriculturalnursery"
              element={
                <Agriculturalnursery
                  setCartProductss={setCartProducts}
                  isLog={isLog}
                  cartProductss={cartProducts}
                />
              }
            />
            <Route
              path="/AnimalFarm"
              element={
                <AnimalFarm
                  setCartProductss={setCartProducts}
                  isLog={isLog}
                  cartProductss={cartProducts}
                />
              }
            />
            <Route
              path="/products"
              element={
                <Products
                  setCartProductss={setCartProducts}
                  isLog={isLog}
                  cartProductss={cartProducts}
                />
              }
            />
            <Route path="/NoPage" element={<NoPage />} />
            <Route
              path="/cart"
              element={
                <Cart
                  isLog={isLog}
                  cartProductss={cartProducts}
                  setCartProductss={setCartProducts}
                />
              }
            />
          </>
        )}

        {/* Private routes (for users who are logged in) */}
        {isLog && (
          <>
            <Route
              path="/cart"
              element={
                <Cart
                  isLog={isLog}
                  cartProductss={cartProducts}
                  setCartProductss={setCartProducts}
                />
              }
            />
            <Route
              path="/"
              element={<Home setCartProductss={setCartProducts} />}
            />
            <Route
              path="/ProfilePage"
              element={<ProfilePage updateIsLog={updateIsLog} />}
            />
            <Route path="/PayMent" element={<PayMent />} />
            <Route
              path="/"
              element={<Home setCartProductss={setCartProducts} />}
            />
            <Route
              path="/login"
              element={<Login updateIsLog={updateIsLog} />}
            />
            <Route
              path="/signup"
              element={<Signup updateIsLog={updateIsLog} />}
            />
            <Route path="/Contact" element={<Contact isLog={isLog} />} />
            <Route path="/About" element={<About isLog={isLog} />} />
            <Route path="/TranslationPage" element={<TranslationPage />} />
            <Route
              path="/ProductCard"
              element={<ProductCard isLog={isLog} />}
            />
            <Route path="/Check" element={<Check />} />
            <Route
              path="/Agriculturalnursery"
              element={
                <Agriculturalnursery
                  setCartProductss={setCartProducts}
                  isLog={isLog}
                  cartProductss={cartProducts}
                />
              }
            />
            <Route
              path="/AnimalFarm"
              element={
                <AnimalFarm
                  setCartProductss={setCartProducts}
                  isLog={isLog}
                  cartProductss={cartProducts}
                />
              }
            />
            <Route
              path="/products"
              element={
                <Products
                  setCartProductss={setCartProducts}
                  isLog={isLog}
                  cartProductss={cartProducts}
                />
              }
            />
            <Route path="/NoPage" element={<NoPage />} />
          </>
        )}

        {/* Catch-all route */}
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
