import { useState } from "react";
import { Stack, Text, SimpleGrid } from "@chakra-ui/react";
import { colors } from "../utils/colors";
import ProductCard from "../components/ProductCard";
import d1 from "../assets/products2/D1.jpg";
import d2 from "../assets/products2/D2.jpg";
import d3 from "../assets/products2/D3.jpg";
import d4 from "../assets/products2/D4.jpg";
import d5 from "../assets/products2/D5.jpg";
import d6 from "../assets/products2/D6.jpg";
import o1 from "../assets/products2/E1.jpg";
import o2 from "../assets/products2/E2.jpg";
import o3 from "../assets/products2/E3.jpg";
import o4 from "../assets/products2/E4.png";
import o5 from "../assets/products2/E5.jpg";
import o6 from "../assets/products2/E6.jpg";

const products = [
    {
        id: 1,
        name: "Sulfopotash",
        img: d1,
        price: "$45.00",
        category: "fertilizers",
        quantity: 0,
    },

    {
        id: 2,
        name: "Novaqua",
        img: d2,
        price: "$33.00",
        category: "fertilizers",
        quantity: 0,
    },
    {
        id: 3,
        name: "Radix",
        img: d3,
        price: "$27.00",
        category: "fertilizers",
        quantity: 0,
    },
    {
        id: 4,
        name: "Aggis",
        img: d4,
        price: "$22.00",
        category: "fertilizers",
        quantity: 0,
    },
    {
        id: 5,
        name: "Libro",
        img: d5,
        price: "$40.00",
        category: "fertilizers",
        quantity: 0,
    },
    {
        id: 6,
        name: "Medotec",
        img: d6,
        price: "$28.00",
        category: "fertilizers",
        quantity: 0,
    },

    {
        id: 7,
        name: "Agriculture shovel",
        img: o1,
        price: "$28.00",
        category: "equipment",
        quantity: 0,
    },
    {
        id: 8,
        name: "Soil ax",
        img: o2,
        price: "$40.00",
        category: "equipment",
        quantity: 0,
    },
    {
        id: 9,
        name: "Tree scissors",
        img: o3,
        price: "$22.00",
        category: "equipment",
        quantity: 0,
    },
    {
        id: 10,
        name: "Soil comb",
        img: o4,
        price: "$45.00",
        category: "equipment",
        quantity: 0,
    },
    {
        id: 11,
        name: "Manual water sprinkler",
        img: o5,
        price: "$27.00",
        category: "equipment",
        quantity: 0,
    },
    {
        id: 12,
        name: "Water mist sprayer",
        img: o6,
        price: "$33.00",
        category: "equipment",
        quantity: 0,
    },
];

const AgriculturaNnurseryTool = (props) => {
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
            <Text fontSize="3xl" textAlign="center" ml={35} mt={60}>
                Explore <span style={{ color: colors.green }}>Nature's </span> Finest
                Selection
            </Text>
            <Stack spacing={100} direction="row" ml={600} mt={35}>
                <Text
                    cursor="pointer"
                    onClick={() => handleCategoryClick("all")}
                    textDecoration={selectedCategory === "all" ? "underline" : "none"}
                >
                    All
                </Text>
                <Text
                    cursor="pointer"
                    onClick={() => handleCategoryClick("fertilizers")}
                    textDecoration={selectedCategory === "fertilizers" ? "underline" : "none"}
                >
                    Fertilizers
                </Text>
                <Text
                    cursor="pointer"
                    onClick={() => handleCategoryClick("equipment")}
                    textDecoration={
                        selectedCategory === "equipment" ? "underline" : "none"
                    }
                >
                    equipment
                </Text>
            </Stack>
            <Stack padding={10} spacing="72" direction="row"  >
                <SimpleGrid columns={5} spacing={12} alignItems="center" ml={230} >
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
export default AgriculturaNnurseryTool;
