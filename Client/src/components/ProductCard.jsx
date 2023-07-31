import { Box, Img, Text, HStack, Icon } from "@chakra-ui/react";
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
    <Box
    width={275}
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      _hover={{ shadow: "xl" }}
      cursor="pointer"
      transition="transform 0.2s ease"
      onClick={addToCart}
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
  );
};

export default ProductCard;
