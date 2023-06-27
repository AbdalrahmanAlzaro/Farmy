import { useState, useEffect } from "react";
import { Stack, Text, SimpleGrid } from "@chakra-ui/react";
import { colors } from "../utils/colors";
import ProductCard from "../components/ProductCard";
import jwt_decode from "jwt-decode"; // Import jwt-decode library
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

import { v4 as uuidv4 } from "uuid"; // Import the uuidv4 function

const products = [
    {
        id: uuidv4(),
        name: "Sulfopotash",
        img: d1,
        price: "$45.00",
        category: "fertilizers",
        quantity: 0,
    },

    {
        id: uuidv4(),
        name: "Novaqua",
        img: d2,
        price: "$33.00",
        category: "fertilizers",
        quantity: 0,
    },
    {
        id: uuidv4(),
        name: "Radix",
        img: d3,
        price: "$27.00",
        category: "fertilizers",
        quantity: 0,
    },
    {
        id: uuidv4(),
        name: "Aggis",
        img: d4,
        price: "$22.00",
        category: "fertilizers",
        quantity: 0,
    },
    {
        id: uuidv4(),
        name: "Libro",
        img: d5,
        price: "$40.00",
        category: "fertilizers",
        quantity: 0,
    },
    {
        id: uuidv4(),
        name: "Medotec",
        img: d6,
        price: "$28.00",
        category: "fertilizers",
        quantity: 0,
    },

    {
        id: uuidv4(),
        name: "Agriculture shovel",
        img: o1,
        price: "$28.00",
        category: "equipment",
        quantity: 0,
    },
    {
        id: uuidv4(),
        name: "Soil ax",
        img: o2,
        price: "$40.00",
        category: "equipment",
        quantity: 0,
    },
    {
        id: uuidv4(),
        name: "Tree scissors",
        img: o3,
        price: "$22.00",
        category: "equipment",
        quantity: 0,
    },
    {
        id: uuidv4(),
        name: "Soil comb",
        img: o4,
        price: "$45.00",
        category: "equipment",
        quantity: 0,
    },
    {
        id: uuidv4(),
        name: "Manual water sprinkler",
        img: o5,
        price: "$27.00",
        category: "equipment",
        quantity: 0,
    },
    {
        id: uuidv4(),
        name: "Water mist sprayer",
        img: o6,
        price: "$33.00",
        category: "equipment",
        quantity: 0,
    },
];


const AgriculturaNnurseryTool = (props) => {
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
            const existingProduct = updatedCartProducts.find(
                (p) => p.id === productId
            );
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                updatedCartProducts.push({ ...product, quantity: 1 });
            }
            setCartProducts(updatedCartProducts);
            saveToLocalStorage(updatedCartProducts);
        }
    };

    const saveToLocalStorage = (cart) => {
        const storedCarts = JSON.parse(localStorage.getItem("Carts")) || [];
        const updatedCarts = storedCarts.filter((user) => user.id !== userid);
        updatedCarts.push({ id: userid, cart });
        localStorage.setItem("Carts", JSON.stringify(updatedCarts));
    };

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

export default AgriculturaNnurseryTool;