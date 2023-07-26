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
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      _hover={{ shadow: "xl" }}
    >
      <Img
        src={product.img}
        alt={product.name}
        w="100%"
        h={200}
        objectFit="cover"
      />
      <Box p={4}>
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          {product.name}
        </Text>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold">{product.price}</Text>
          <Icon
            as={BiCart}
            w={6}
            h={6}
            cursor="pointer"
            _hover={{ color: "blue.500" }}
            onClick={addToCart}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
