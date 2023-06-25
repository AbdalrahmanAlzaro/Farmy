import { useState } from "react";
import { Stack, Text, SimpleGrid } from "@chakra-ui/react";
import { colors } from "../utils/colors";
import ProductCard from "../components/ProductCard";
import d1 from "../assets/products2/A1.jpeg";
import d2 from "../assets/products2/A2.jpg";
import d3 from "../assets/products2/A3.jpeg";
import d4 from "../assets/products2/A4.jpeg";
import d5 from "../assets/products2/A5.jpeg";
import d6 from "../assets/products2/A6.jpeg";

import o1 from "../assets/products2/B1.jpeg";
import o2 from "../assets/products2/B2.jpeg";
import o3 from "../assets/products2/B3.jpeg";
import o4 from "../assets/products2/B4.jpeg";
import o5 from "../assets/products2/B5.jpeg";
import o6 from "../assets/products2/B6.jpeg";

import c1 from "../assets/products2/C1.jpg";
import c2 from "../assets/products2/C2.jpeg";
import c3 from "../assets/products2/C3.jpeg";
import c4 from "../assets/products2/C4.jpeg";
import c5 from "../assets/products2/C5.jpg";

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
  {
    id: uuidv4(),
    name: "Grape",
    img: d5,
    price: "$40.00",
    category: "fruitful",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Pepper",
    img: d6,
    price: "$28.00",
    category: "fruitful",
    quantity: 0,
  },

  {
    id: uuidv4(),
    name: "White Blossom",
    img: o1,
    price: "$28.00",
    category: "decoration",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Red Flower",
    img: o2,
    price: "$40.00",
    category: "decoration",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Cherry Blossoms",
    img: o3,
    price: "$22.00",
    category: "decoration",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Green Fern Leaves",
    img: o4,
    price: "$45.00",
    category: "decoration",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Blooming flowers",
    img: o5,
    price: "$27.00",
    category: "decoration",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "green ivy",
    img: o6,
    price: "$33.00",
    category: "decoration",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "pine tree",
    img: c1,
    price: "$40.00",
    category: "forest trees",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "broad leaf",
    img: c2,
    price: "$35.00",
    category: "forest trees",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: " Australian Pine",
    img: c3,
    price: "$26.00",
    category: "forest trees",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "Yellow Leaves ",
    img: c4,
    price: "$43.00",
    category: "forest trees",
    quantity: 0,
  },
  {
    id: uuidv4(),
    name: "leyland cypress hedge",
    img: c5,
    price: "$39.00",
    category: "forest trees",
    quantity: 0,
  },
];

const AgriculturalNurseryProdacut = (props) => {
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
      <Text fontSize="3xl" textAlign="center" ml={35} mt={50}>
        Explore <span style={{ color: colors.green }}>Nature's </span> Finest
        Selection
      </Text>
      <Stack spacing={100} direction="row" ml={500} mt={50}>
        <Text
          cursor="pointer"
          onClick={() => handleCategoryClick("all")}
          textDecoration={selectedCategory === "all" ? "underline" : "none"}
        >
          All
        </Text>
        <Text
          cursor="pointer"
          onClick={() => handleCategoryClick("fruitful")}
          textDecoration={selectedCategory === "fruitful" ? "underline" : "none"}
        >
          Fruitful
        </Text>
        <Text
          cursor="pointer"
          onClick={() => handleCategoryClick("decoration")}
          textDecoration={
            selectedCategory === "decoration" ? "underline" : "none"
          }
        >
          Decoration
        </Text>
        <Text
          cursor="pointer"
          onClick={() => handleCategoryClick("forest trees")}
          textDecoration={
            selectedCategory === "forest trees" ? "underline" : "none"
          }
        >
          Forest trees
        </Text>
      </Stack>
      <Stack padding={10} spacing="72" direction="row"  >
        <SimpleGrid columns={5} spacing={12} alignItems="center" ml={220} >
          {filteredProducts.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              setCartProducts={props.onAddToCart}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};
export default AgriculturalNurseryProdacut;
