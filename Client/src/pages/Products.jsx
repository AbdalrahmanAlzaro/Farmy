import { useState } from "react";
import { Stack, Text, SimpleGrid } from "@chakra-ui/react";
import { colors } from "../utils/colors";
import ProductCard from "../components/ProductCard";
import d1 from "../assets/products/D1.png";
import d2 from "../assets/products/D2.webp";
import d3 from "../assets/products/D3.webp";
import d4 from "../assets/products/D4.webp";
import d5 from "../assets/products/D5.webp";
import d6 from "../assets/products/D6.png";
import o1 from "../assets/products/O1.jpg";
import o2 from "../assets/products/O2.jpg";
import o3 from "../assets/products/O3.jpg";
import o4 from "../assets/products/O4.jpg";
import o5 from "../assets/products/O5.jpg";
import o6 from "../assets/products/O6.jpg";
import { v4 as uuidv4 } from "uuid"; // Import the uuidv4 function


const products = [
  {
    id: uuidv4(),
    name: "Low Fat Cow Milk",
    img: d1,
    price: "$45.00",
    category: "dairy",
    quantity: 0,
  },

  {
    id: uuidv4(),
    name: "Premium Cheese",
    img: d2,
    price: "$33.00",
    category: "dairy",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Mozzarella",
    img: d3,
    price: "$27.00",
    category: "dairy",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Haloumi",
    img: d4,
    price: "$22.00",
    category: "dairy",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Roquefort",
    img: d5,
    price: "$40.00",
    category: "dairy",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Fresh Goat Milk",
    img: d6,
    price: "$28.00",
    category: "dairy",
    quantity: 0,
  },

  {
    id: uuidv4(),
    name: "Baby Plum Tomatoes",
    img: o1,
    price: "$28.00",
    category: "organic",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Diet Snapple Tea",
    img: o2,
    price: "$40.00",
    category: "organic",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Fresh Grapes",
    img: o3,
    price: "$22.00",
    category: "organic",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Fresh Kiwi",
    img: o4,
    price: "$45.00",
    category: "organic",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Blue Raisins",
    img: o5,
    price: "$27.00",
    category: "organic",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Sweet Mixed Grapes",
    img: o6,
    price: "$33.00",
    category: "organic",
    quantity: 0,
  },
];



const Products = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  return (
    <>
      <Text fontSize="3xl" textAlign="center" ml={25}>
        Explore <span style={{ color: colors.green }}>Nature's </span> Finest
        Selection
      </Text>
      <Stack padding={10} spacing="72" direction="row" >
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
              product={product}
              key={product.id}
              setCartProducts={props.setCartProductss}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};
export default Products;
