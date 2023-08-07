import { Box, HStack, Icon, Img, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BiCart } from "react-icons/bi";

const ProductCard = ({ product, onAddToCart, setCartProducts }) => {
  const addToCart = () => {
    setCartProducts((prevCartProducts) => {
      // Check if the product is already in the cart
      const existingProduct = prevCartProducts.find(
        (cartProduct) => cartProduct.id === product.id
      );

      if (existingProduct) {
        // If the product is already in the cart, increase its quantity by 1
        return prevCartProducts.map((cartProduct) =>
          cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct
        );
      } else {
        // If the product is not in the cart, add it with quantity = 1
        return [...prevCartProducts, { ...product, quantity: 1 }];
      }
    });
    onAddToCart(product.id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "xl" }}
      whileTap={{ scale: 0.95 }}
      onClick={() => addToCart(product)} // Pass the product to addToCart function
      cursor="pointer"
    >
      <Box
        width={275}
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        shadow="md"
        transition="transform 0.2s ease"
      >
        <Img
          src={product.image}
          alt={product.name}
          w="100%"
          h={250}
          objectFit="cover"
        />
        <Box p={4}>
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            {product.description}
          </Text>
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" fontWeight="semibold">
              {product.price} <span>$</span>
            </Text>
            <Icon
              as={BiCart}
              w={8}
              h={8}
              color="gray.500"
              _hover={{ color: "blue.500" }}
            />
          </HStack>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ProductCard;
