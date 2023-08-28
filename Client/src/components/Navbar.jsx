import { useState, useEffect, useContext } from "react";
import {
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
// import jwt_decode from "jwt-decode";
import { BiCart, BiUser } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Import jwt-decode library
import logo from "../assets/logo.png";
import { CartContext } from "../hooks/CartContext";
import axios from "axios";

const Navbar = ({ isLog, updateIsLog, cartProducts }) => {
  const { cartNavRefresh, setCartNavRefresh } = useContext(CartContext);

  const [isSmallerThanMd] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState(""); // State to store user's name
  const [counterOfCart, setCounterOfCart] = useState(0); // State to store the counter of cart products
  const [abb, setabb] = useState(0); // State to store the counter of cart products
  const [id, setId] = useState("");

  useEffect(() => {
    const getUserNameFromToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(token);
        const id1 = decodedToken.id;
        setId(id1);

        try {
          const response = await axios.get(
            `http://localhost:3000/userinfo/${id1}`
          );
          const user = response.data;
          setUserName(user.username);
        } catch (error) {
          console.error("Error fetching user information:", error);
        }

      }
    };

    getUserNameFromToken();
  }, []);

  


  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    // Function to get the count of cart products from the cartProducts prop
    const getCartProductCount = () => {
      const count = cartProducts ? cartProducts.length : 0;
      setCounterOfCart(count);
    };

    getCartProductCount();

    window.addEventListener("storage", getCartProductCount);

    return () => {
      window.removeEventListener("storage", getCartProductCount);
    };
  }, [cartProducts]);

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    updateIsLog(false);
  };

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        p={4}
        wrap={isMenuOpen ? "wrap" : "nowrap"}
        position="sticky" // Set the position to sticky
        top={0} // Stick it at the top
        bg="white" // Add a background color
        zIndex={100} // Ensure it's above other elements
      >
        <Flex align="center" mr={5}>
          <Link to="/" className={isActiveLink("/") ? "active-link" : ""}>
            <HStack alignItems="center" spacing="4">
              <Image src={logo} alt="logo" boxSize="50px" />
              <Text fontSize="2xl" style={{ color: "#454545" }}>
                HarvestMart
              </Text>
            </HStack>
          </Link>
        </Flex>

        {isSmallerThanMd ? (
          <>
            <Link to="/cart" style={{ paddingLeft: "4.5rem" }}>
              <Icon
                as={BiCart}
                boxSize={6}
                className={isActiveLink("/cart") ? "active-link" : ""}
              />
              <span style={{ color: "#D38030" }}> {cartNavRefresh}</span>
            </Link>
            <Box
              display="flex"
              alignItems="center"
              onClick={handleMenuClick}
              cursor="pointer"
            >
              <Icon
                as={FiMenu}
                boxSize={6}
                style={{ backgroundColor: "white", color: "#454545" }}
              />
            </Box>
          </>
        ) : (
          <>
            <HStack spacing={8} style={{ color: "#454545" }}>
              <Link to="/" className={isActiveLink("/") ? "active-link" : ""}>
                <Text>Home</Text>
              </Link>
              <Link
                to="/Agriculturalnursery"
                className={
                  isActiveLink("/Agriculturalnursery") ? "active-link" : ""
                }
              >
                <Text>Agricultural nursery</Text>
              </Link>
              <Link
                to="/AnimalFarm"
                className={isActiveLink("/AnimalFarm") ? "active-link" : ""}
              >
                <Text>Animal farm</Text>
              </Link>
              <Link
                to="/products"
                className={isActiveLink("/products") ? "active-link" : ""}
              >
                <Text>Products</Text>
              </Link>
              <Link
                to="/About"
                className={isActiveLink("/About") ? "active-link" : ""}
              >
                <Text>Who are we</Text>
              </Link>
              <Link
                to="/Contact"
                className={isActiveLink("/Contact") ? "active-link" : ""}
              >
                <Text>Get in touch</Text>
              </Link>
              {isLog ? (
                <>
                  <Link to="/" onClick={handleLogout}>
                    <Text>Logout</Text>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className={isActiveLink("/signup") ? "active-link" : ""}
                  >
                    <Text>Signup</Text>
                  </Link>
                  <Link to="/cart">
                    <Icon
                      as={BiCart}
                      boxSize={6}
                      className={isActiveLink("/cart") ? "active-link" : ""}
                    />
                    <span style={{ color: "#D38030" }}> {cartNavRefresh}</span>
                  </Link>
                </>
              )}
            </HStack>

            {isLog && (
              <HStack
                spacing={8}
                alignItems="center"
                style={{ color: "#454545" }}
              >
                <Link to="/cart">
                  <Icon
                    as={BiCart}
                    boxSize={6}
                    className={isActiveLink("/cart") ? "active-link" : ""}
                  />
                  <span style={{ color: "#D38030" }}> {cartNavRefresh}</span>
                </Link>
                <Text>Hi, {userName}!</Text> {/* Display user's name */}
                <Link to="/ProfilePage">
                  <Icon
                    as={BiUser}
                    boxSize={6}
                    className={
                      isActiveLink("/ProfilePage") ? "active-link" : ""
                    }
                  />
                </Link>
              </HStack>
            )}
          </>
        )}

        {isSmallerThanMd && isMenuOpen && (
          <Box p={4} style={{ color: "#454545" }}>
            <Link to="/" className={isActiveLink("/") ? "active-link" : ""}>
              <Text mb={2}>Home</Text>
            </Link>
            <Link
              to="/Agriculturalnursery"
              className={
                isActiveLink("/Agriculturalnursery") ? "active-link" : ""
              }
            >
              <Text mb={2}>Agricultural nursery</Text>
            </Link>
            <Link
              to="/AnimalFarm"
              className={isActiveLink("/AnimalFarm") ? "active-link" : ""}
            >
              <Text mb={2}>Animal farm</Text>
            </Link>

            <Link
              to="/About"
              className={isActiveLink("/About") ? "active-link" : ""}
            >
              <Text mb={2}>Who are we</Text>
            </Link>
            <Link
              to="/Contact"
              className={isActiveLink("/Contact") ? "active-link" : ""}
            >
              <Text mb={2}>Get in touch</Text>
            </Link>
            {isLog ? (
              <>
                <Link
                  to="/products"
                  className={isActiveLink("/products") ? "active-link" : ""}
                >
                  <Text mb={2}>Products</Text>
                </Link>
                <Text mb={2}>Hi, {userName}!</Text> {/* Display user's name */}
                <Link to="/" onClick={handleLogout}>
                  <Text>Logout</Text>
                </Link>
                <Link to="/ProfilePage">
                  <Icon
                    as={BiUser}
                    boxSize={6}
                    className={
                      isActiveLink("/ProfilePage") ? "active-link" : ""
                    }
                  />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className={isActiveLink("/signup") ? "active-link" : ""}
                >
                  <Text mb={2}>Signup</Text>
                </Link>
              </>
            )}
          </Box>
        )}
      </Flex>
    </>
  );
};

export default Navbar;
