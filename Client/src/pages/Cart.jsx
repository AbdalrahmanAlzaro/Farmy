// import { Box, SimpleGrid, Text, Button, IconButton } from "@chakra-ui/react";
// import { colors } from "../utils/colors";
// import { FiTrash, FiPlus, FiMinus } from "react-icons/fi";
// import { Link } from "react-router-dom";

// const Cart = (props) => {
//   const cartProducts = props.cartProductss
//   const setCartProducts = props.setCartProductss
//   const handleDeleteProduct = (productId) => {
//     const updatedCart = cartProducts.filter(
//       (product) => product.id !== productId
//     );
//     setCartProducts(updatedCart);
//   };

//   const handleIncreaseQuantity = (productId) => {
//     const updatedCart = cartProducts.map((product) => {
//       if (product.id === productId) {
//         return { ...product, quantity: product.quantity + 1 };
//       }
//       return product;
//     });
//     setCartProducts(updatedCart);
//   };

//   const handleDecreaseQuantity = (productId) => {
//     const updatedCart = cartProducts.map((product) => {
//       if (product.id === productId && product.quantity > 1) {
//         return { ...product, quantity: product.quantity - 1 };
//       }
//       return product;
//     });
//     setCartProducts(updatedCart);
//   };

//   const calculateTotal = () => {
//     const totalPrice = cartProducts.reduce(
//       (accumulator, product) =>
//         accumulator +
//         parseFloat(product.price.replace("$", "")) * product.quantity,
//       0
//     );
//     return totalPrice.toFixed(2);
//   };

//   return (
//     <Box padding={10}>
//       <Text fontSize="3xl" textAlign="center">
//         Your Cart
//       </Text>
//       {cartProducts.length === 0 ? (
//         <Text mt={4} textAlign="center">
//           Your cart is empty.
//         </Text>
//       ) : (
//         <>
//           <SimpleGrid columns={1} spacing={8} mt={8}>
//             {cartProducts.map((product) => (
//               <Box
//                 key={product.id}
//                 borderWidth="1px"
//                 borderRadius="md"
//                 p={4}
//                 position="relative"
//               >
//                 <Box
//                   display="flex"
//                   alignItems="center"
//                   justifyContent="space-between"
//                   mb={2}
//                 >
//                   <Box flex="1">
//                     <img
//                       src={product.img}
//                       alt={product.name}
//                       width={100}
//                       height={100}
//                     />
//                   </Box>
//                   <Box ml={4}>
//                     <Text fontSize="lg">{product.name}</Text>
//                     <Text fontSize="sm" color="gray.500">
//                       Quantity: {product.quantity}
//                     </Text>
//                     <Box display="flex" alignItems="center" mt={2}>
//                       <IconButton
//                         icon={<FiMinus />}
//                         aria-label="Decrease Quantity"
//                         variant="ghost"
//                         colorScheme="blue"
//                         size="sm"
//                         onClick={() => handleDecreaseQuantity(product.id)}
//                       />
//                       <IconButton
//                         icon={<FiPlus />}
//                         aria-label="Increase Quantity"
//                         variant="ghost"
//                         colorScheme="blue"
//                         size="sm"
//                         onClick={() => handleIncreaseQuantity(product.id)}
//                       />
//                     </Box>
//                   </Box>
//                   <Box>
//                     <Text fontSize="lg" fontWeight="bold">
//                       {product.price}
//                     </Text>
//                   </Box>
//                 </Box>
//                 <IconButton
//                   icon={<FiTrash />}
//                   aria-label="Delete"
//                   variant="ghost"
//                   colorScheme="red"
//                   size="sm"
//                   position="absolute"
//                   top={2}
//                   right={2}
//                   onClick={() => handleDeleteProduct(product.id)}
//                 />
//               </Box>
//             ))}
//           </SimpleGrid>
//           <Text fontSize="xl" fontWeight="bold" mt={8}>
//             Total: ${calculateTotal()}
//           </Text>
//           <Button
//             bg={colors.primary}
//             color="white"
//             size="md"
//             _hover={{ color: colors.primary, bg: "white" }}
//             fontWeight="thin"
//             mt={4}
//           >
//             <Link to="/PayMent">
//               Checkout
//             </Link>
//           </Button>
//         </>
//       )}
//     </Box>
//   );
// };



// export default Cart;




import { useState } from "react";
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
import { Link } from "react-router-dom";

const Cart = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const cartProducts = props.cartProductss;
  const setCartProducts = props.setCartProductss;

  const handleDeleteProduct = (productId) => {
    const updatedCart = cartProducts.filter(
      (product) => product.id !== productId
    );
    setCartProducts(updatedCart);
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cartProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setCartProducts(updatedCart);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cartProducts.map((product) => {
      if (product.id === productId && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setCartProducts(updatedCart);
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
    setIsOpen(true);
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
                    <Text fontSize="lg">{product.name}</Text>
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
                        onClick={() => handleDecreaseQuantity(product.id)}
                      />
                      <IconButton
                        icon={<FiPlus />}
                        aria-label="Increase Quantity"
                        variant="ghost"
                        colorScheme="blue"
                        size="sm"
                        onClick={() => handleIncreaseQuantity(product.id)}
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
                  onClick={() => handleDeleteProduct(product.id)}
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
                <Button colorScheme="blue" mr={3} onClick={handleCloseModal} style={{backgroundColor:"#454545"}}>
                  Cancel
                </Button>
                <Button variant="ghost" as={Link} to="/PayMent">
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
