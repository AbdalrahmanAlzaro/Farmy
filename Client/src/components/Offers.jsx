import { useState, useEffect } from "react";
import { Stack, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import { colors } from "../utils/colors";
import ProductCard from "../components/ProductCard";
import jwt_decode from "jwt-decode"; // Import jwt-decode library

import d1 from "../assets/products2/A1.jpeg";
import d2 from "../assets/products2/A2.jpg";
import d3 from "../assets/products2/A3.jpeg";
import d4 from "../assets/products2/A4.jpeg";

import { v4 as uuidv4 } from "uuid"; // Import the uuidv4 function

const products = [
  {
    id: uuidv4(),
    name: "Strawberries",
    img: d1,
    price: "$45.00",
    category: "fruitful",
    quantity: 0,
  },

  {
    id: uuidv4(),
    name: "cabbage",
    img: d2,
    price: "$33.00",
    category: "fruitful",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Berries",
    img: d3,
    price: "$27.00",
    category: "fruitful",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Red Mistletoe",
    img: d4,
    price: "$22.00",
    category: "fruitful",
    quantity: 0,
  },
];

const Offers = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [userid, setUserid] = useState("");
  const [cartProducts, setCartProducts] = useState([]);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const getUserNameFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(token);
        const id = decodedToken.id;
        setUserid(id);
      }
    };

    if (props.isLog) {
      getUserNameFromToken();
      getLocal();
    }
  }, [props.isLog]);

  const getLocal = () => {
    const storedCarts = JSON.parse(localStorage.getItem("Carts"));
    if (storedCarts) {
      const userCart = storedCarts.find((user) => user.id === userid);
      if (userCart) {
        setCartProducts(userCart.cart);
      }
    }
  };

  const handleAddToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const updatedCartProducts = [...cartProducts];
      const existingProductIndex = updatedCartProducts.findIndex(
        (p) => p.id === productId
      );

      if (existingProductIndex !== -1) {
        // Update the quantity of the existing product
        updatedCartProducts[existingProductIndex].quantity += 1;
      } else {
        // Add the new product to the cart
        updatedCartProducts.push({ ...product, quantity: 1 });
      }

      setCartProducts(updatedCartProducts);
      saveToLocalStorage(updatedCartProducts);
    }
  };

  const saveToLocalStorage = (cart) => {
    localStorage.setItem("Carts", JSON.stringify(cart));
  };

  useEffect(() => {
    const getCartFromLocalStorage = () => {
      const storedCart = localStorage.getItem("Carts");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCartProducts(parsedCart);
      }
    };

    getCartFromLocalStorage();
  }, []);

  return (
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
      <Text fontSize="3xl" textAlign="center" ml={25} mb={10}>
        Our <span style={{ color: colors.green }}>Best</span> Offers
      </Text>
      <Flex justifyContent="center">
        <Stack spacing={10} direction="row">
          <Text
            cursor="pointer"
            onClick={() => handleCategoryClick("all")}
            textDecoration={selectedCategory === "all" ? "underline" : "none"}
          >
            All
          </Text>
          <Text
            cursor="pointer"
            onClick={() => handleCategoryClick("dairy")}
            textDecoration={selectedCategory === "dairy" ? "underline" : "none"}
          >
            Dairy
          </Text>
          <Text
            cursor="pointer"
            onClick={() => handleCategoryClick("organic")}
            textDecoration={
              selectedCategory === "organic" ? "underline" : "none"
            }
          >
            Organic
          </Text>
        </Stack>
      </Flex>
      <Stack
        padding={10}
        spacing={["4", "6", "8"]}
        direction={["column", "row"]}
        alignItems="center"
        justifyContent="center"
      >
        <SimpleGrid columns={[1, 2, 4]} spacing={12}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              setCartProducts={props.setCartProductss}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default Offers;
