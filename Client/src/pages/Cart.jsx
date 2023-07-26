import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  SimpleGrid,
  Text,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { colors } from "../utils/colors";
import { FiTrash, FiPlus, FiMinus } from "react-icons/fi";
import axios from "axios";

const Cart = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserNameFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(token);
        const id1 = decodedToken.id;
        setId(id1);
        console.log(id1);
      }
    };

    const getCartProductsFromStorage = () => {
      const storedCartProducts = localStorage.getItem("Carts");
      if (storedCartProducts) {
        setCartProducts(JSON.parse(storedCartProducts));
      }
    };

    getUserNameFromToken();
    getCartProductsFromStorage();
  }, []);

  const updateCartProductsInStorage = (updatedCart) => {
    setCartProducts(updatedCart);
    localStorage.setItem("Carts", JSON.stringify(updatedCart));
  };

  const handleDeleteProduct = (productId) => {
    const updatedCart = cartProducts.filter(
      (product) => product.id !== productId
    );
    updateCartProductsInStorage(updatedCart);
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cartProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    updateCartProductsInStorage(updatedCart);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cartProducts.map((product) => {
      if (product.id === productId && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    updateCartProductsInStorage(updatedCart);
  };

  const calculateTotal = () => {
    const totalPrice = cartProducts.reduce(
      (accumulator, product) =>
        accumulator +
        parseFloat(product.price.replace("$", "")) * product.quantity,
      0
    );
    return totalPrice.toFixed(2);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    if (id) {
      setIsOpen(true);
    } else {
      navigate("/signup");
    }
  };

  return (
    <Box padding={10}>
      <Text fontSize="3xl" textAlign="center">
        Your Cart
      </Text>
      {cartProducts.length === 0 ? (
        <Text mt={4} textAlign="center">
          Your cart is empty.
        </Text>
      ) : (
        <>
          <SimpleGrid columns={1} spacing={8} mt={8}>
            {cartProducts.map((product) => (
              <Box
                key={product.id}
                borderWidth="1px"
                borderRadius="md"
                p={4}
                position="relative"
                _hover={{ boxShadow: "lg" }} // Add hover effect
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Box flex="1">
                    <img
                      src={product.img}
                      alt={product.name}
                      width={100}
                      height={100}
                    />
                  </Box>
                  <Box ml={4}>
                    <Text fontSize="lg" fontWeight="bold">
                      {product.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Quantity: {product.quantity}
                    </Text>
                    <Box display="flex" alignItems="center" mt={2}>
                      <IconButton
                        icon={<FiMinus />}
                        aria-label="Decrease Quantity"
                        variant="ghost"
                        colorScheme="blue"
                        size="sm"
                        onClick={(e) => handleDecreaseQuantity(product.id)}
                      />
                      <IconButton
                        icon={<FiPlus />}
                        aria-label="Increase Quantity"
                        variant="ghost"
                        colorScheme="blue"
                        size="sm"
                        onClick={(e) => handleIncreaseQuantity(product.id)}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Text fontSize="lg" fontWeight="bold">
                      {product.price}
                    </Text>
                  </Box>
                </Box>
                <IconButton
                  icon={<FiTrash />}
                  aria-label="Delete"
                  variant="ghost"
                  colorScheme="red"
                  size="sm"
                  position="absolute"
                  top={2}
                  right={2}
                  onClick={(e) => handleDeleteProduct(product.id)}
                />
              </Box>
            ))}
          </SimpleGrid>
          <Text fontSize="xl" fontWeight="bold" mt={8}>
            Total: ${calculateTotal()}
          </Text>
          <Button
            bg={colors.primary}
            color="white"
            size="md"
            _hover={{ color: colors.primary, bg: "white" }}
            fontWeight="thin"
            mt={4}
            onClick={handleOpenModal}
          >
            Checkout
          </Button>
          <Modal isOpen={isOpen} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Checkout</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  Add your payment details and complete the checkout process.
                </Text>
                {/* Add your payment form here */}
              </ModalBody>
              <ModalFooter>
                <Button
                  // colorScheme="blue"
                  mr={3}
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  variant="ghost"
                  as={Link}
                  to={{
                    pathname: "/payment",
                    search: `?total=${calculateTotal()}`,
                  }}
                  style={{ backgroundColor: "#454545", color: "white" }}
                >
                  Go to Payment
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
};

export default Cart;
