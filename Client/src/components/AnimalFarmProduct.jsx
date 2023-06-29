import { useState, useEffect } from "react";
import { Stack, Text, SimpleGrid } from "@chakra-ui/react";
import { colors } from "../utils/colors";
import ProductCard from "../components/ProductCard";
import jwt_decode from "jwt-decode"; // Import jwt-decode library
import d1 from "../assets/products2/F1.jpeg";
import d2 from "../assets/products2/F2.jpeg";
import d3 from "../assets/products2/F3.jpeg";
import d4 from "../assets/products2/F4.jpeg";
import d5 from "../assets/products2/F5.jpg";
import d6 from "../assets/products2/F6.jpg";

import o1 from "../assets/products/D1.png";
import o2 from "../assets/products/D2.webp";
import o3 from "../assets/products/D3.webp";
import o4 from "../assets/products/D4.webp";
import o5 from "../assets/products/D5.webp";
import o6 from "../assets/products/D6.png";
import o7 from "../assets/products/D7.jpg";
import o8 from "../assets/products/D8.jpg";

import { v4 as uuidv4 } from "uuid"; // Import the uuidv4 function

const products = [
  {
    id: uuidv4(),
    name: "rooster",
    img: d1,
    price: "$45.00",
    category: "animal",
    quantity: 0,
  },

  {
    id: uuidv4(),
    name: "chicken",
    img: d2,
    price: "$33.00",
    category: "animal",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "cow",
    img: d3,
    price: "$27.00",
    category: "animal",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "sheep",
    img: d4,
    price: "$22.00",
    category: "animal",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Turkey",
    img: d5,
    price: "$40.00",
    category: "animal",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "rabbits",
    img: d6,
    price: "$28.00",
    category: "animal",
    quantity: 0,
  },

  {
    id: uuidv4(),
    name: "Low Fat Cow Milk",
    img: o1,
    price: "$28.00",
    category: "dairy",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Premium Cheese",
    img: o2,
    price: "$40.00",
    category: "dairy",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Mozzarella",
    img: o3,
    price: "$22.00",
    category: "dairy",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Haloumi",
    img: o4,
    price: "$45.00",
    category: "dairy",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Roquefort",
    img: o5,
    price: "$27.00",
    category: "dairy",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Fresh Goat Milk",
    img: o6,
    price: "$33.00",
    category: "dairy",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "cheddar cheese",
    img: o7,
    price: "$33.00",
    category: "dairy",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "egg",
    img: o8,
    price: "$33.00",
    category: "dairy",
    quantity: 0,
  },
];

const AnimalFarmProduct = (props) => {
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
      <Text fontSize="3xl" textAlign="center" ml={25}>
        Explore <span style={{ color: colors.green }}>Nature's</span> Finest
        Selection
      </Text>
      <Stack padding={10} spacing="72" direction="row">
        <Stack spacing={10}>
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
        <SimpleGrid columns={4} spacing={12} alignItems="center">
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

export default AnimalFarmProduct;
