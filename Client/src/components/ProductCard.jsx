import { HStack, Icon, Img, Stack, Text } from "@chakra-ui/react";
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
    <Stack alignItems="center" mb={10}>
      <Img src={product.img} alt={product.name} w={170} h={170} />
      <Text>{product.name}</Text>
      <HStack spacing={8} alignItems="center">
        <Text>{product.price}</Text>
        <Icon as={BiCart} w={6} h={6} cursor="pointer" onClick={addToCart} />
      </HStack>
    </Stack>
  );
};

export default ProductCard;
