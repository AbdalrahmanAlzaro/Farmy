import { useState } from "react";
import { Stack, Text, SimpleGrid } from "@chakra-ui/react";
import { colors } from "../utils/colors";
import ProductCard from "../components/ProductCard";
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



const products = [
    {
        id: 1,
        name: "rooster",
        img: d1,
        price: "$45.00",
        category: "animal",
        quantity: 0,
    },
   
    {
        id: 2,
        name: "chicken",
        img: d2,
        price: "$33.00",
        category: "animal",
        quantity: 0,
    },
    {
        id: 3,
        name: "cow",
        img: d3,
        price: "$27.00",
        category: "animal",
        quantity: 0,
    },
    {
        id: 4,
        name: "sheep",
        img: d4,
        price: "$22.00",
        category: "animal",
        quantity: 0,
    },
    {
        id: 5,
        name: "Turkey",
        img: d5,
        price: "$40.00",
        category: "animal",
        quantity: 0,
    },
    {
        id: 6,
        name: "rabbits",
        img: d6,
        price: "$28.00",
        category: "animal",
        quantity: 0,
    },

    {
        id: 7,
        name: "Low Fat Cow Milk",
        img: o1,
        price: "$28.00",
        category: "dairy",
        quantity: 0,
    },
    {
        id: 8,
        name: "Premium Cheese",
        img: o2,
        price: "$40.00",
        category: "dairy",
        quantity: 0,
    },
    {
        id: 9,
        name: "Mozzarella",
        img: o3,
        price: "$22.00",
        category: "dairy",
        quantity: 0,
    },
    {
        id: 10,
        name: "Haloumi",
        img: o4,
        price: "$45.00",
        category: "dairy",
        quantity: 0,
    },
    {
        id: 11,
        name: "Roquefort",
        img: o5,
        price: "$27.00",
        category: "dairy",
        quantity: 0,
    },
    {
        id: 12,
        name: "Fresh Goat Milk",
        img: o6,
        price: "$33.00",
        category: "dairy",
        quantity: 0,
    },
    {
        id: 13,
        name: "cheddar cheese",
        img: o7,
        price: "$33.00",
        category: "dairy",
        quantity: 0,
    },
    {
        id: 14,
        name: "egg",
        img: o8,
        price: "$33.00",
        category: "dairy",
        quantity: 0,
    },
  
];

const AnimalFarmProduct = (props) => {
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
            <Stack spacing={100} direction="row" ml={625} mt={50}>
                <Text
                    cursor="pointer"
                    onClick={() => handleCategoryClick("all")}
                    textDecoration={selectedCategory === "all" ? "underline" : "none"}
                >
                    All
                </Text>
                <Text
                    cursor="pointer"
                    onClick={() => handleCategoryClick("animal")}
                    textDecoration={selectedCategory === "animal" ? "underline" : "none"}
                >
                    Animal
                </Text>
                <Text
                    cursor="pointer"
                    onClick={() => handleCategoryClick("dairy")}
                    textDecoration={
                        selectedCategory === "dairy" ? "underline" : "none"
                    }
                >
                    Dairy
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
export default AnimalFarmProduct;
