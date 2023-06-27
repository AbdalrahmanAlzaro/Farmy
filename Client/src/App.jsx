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
import TranslationPage from "./components/Transletor";
import ProductCard from "./components/ProductCard";


const App = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [isLog, updateIsLog] = useState(localStorage.getItem("token") ? true : false);
  // console.log(isLog);
  // console.log(updateIsLog);
  
  
  return (
    <Router>
      <Navbar cartProducts={cartProducts} isLog={isLog} updateIsLog={updateIsLog} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login updateIsLog={updateIsLog} />}
        />
        <Route
          path="/signup"
          element={<Signup updateIsLog={updateIsLog} />}
        />
        <Route
          path="/Contact"
          element={<Contact />}
        />
        <Route
          path="/TranslationPage"
          element={<TranslationPage />}
        />
        <Route
          path="/ProfilePage"
          element={<ProfilePage updateIsLog={updateIsLog} />}
        />
        <Route
          path="/Agriculturalnursery"
          element={<Agriculturalnursery setCartProductss={setCartProducts} isLog={isLog} cartProductss={cartProducts} />}
        />
        <Route
          path="/AnimalFarm"
          element={<AnimalFarm setCartProductss={setCartProducts} isLog={isLog} cartProductss={cartProducts} />}
        />
        <Route
          path="/products"
          element={<Products setCartProductss={setCartProducts} isLog={isLog} cartProductss={cartProducts} />}
        />
        <Route path="/PayMent" element={<PayMent />} />
        <Route path="/ProductCard" element={<ProductCard isLog={isLog} />} />
        <Route path="/Check" element={<Check />} />
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
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
