import { useState, useEffect } from "react";
import { Stack, Text, SimpleGrid, Flex, Button } from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchInput from "../components/SearchInput";
import ProductCard from "../components/ProductCard";
import { colors } from "../utils/colors";

const Products = (props) => {
  const [userid, setUserid] = useState("");
  const [cartProducts, setCartProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [selectedCategory, setSelectedCategory] = useState(null); // State to hold the selected category

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    // Fetch data based on the selected category
    axios
      .get(`http://localhost:3000/allproducts${category}`)
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setCurrentPage(1); // Reset the current page when changing categories
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
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
      const existingCartProducts =
        JSON.parse(localStorage.getItem("Carts")) || [];
      const existingProduct = existingCartProducts.find(
        (p) => p.id === productId
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        existingCartProducts.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("Carts", JSON.stringify(existingCartProducts));
      setCartProducts(existingCartProducts);

      toast.success("Product added to cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/allproducts")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filteredProducts with all products
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    setFilteredProducts(
      products.filter((product) =>
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <ToastContainer />
      <Text fontSize="3xl" textAlign="center" ml={25}>
        Explore <span style={{ color: colors.green }}>Nature's</span> Finest
        Selection
      </Text>
      <br />
      <Flex justifyContent="center">
        <Stack spacing={10} direction="row">
          <SearchInput onSearch={handleSearch} />
        </Stack>
      </Flex>

      <Flex justifyContent="center" mt={5}>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 2, md: 4 }}
        >
          {/* Category buttons */}
          <Button
            onClick={() => handleCategorySelect("")} // To show all products
            colorScheme={selectedCategory === "" ? "green" : "gray"}
            size="md"
            mb={{ base: 2, md: 0 }}
            width={{ base: "100%", md: "auto" }}
          >
            All
          </Button>
          <Button
            onClick={() => handleCategorySelect("AgriculturalNursery")}
            colorScheme={
              selectedCategory === "AgriculturalNursery" ? "green" : "gray"
            }
            size="md"
            mb={{ base: 2, md: 0 }}
            width={{ base: "100%", md: "auto" }}
          >
            Agricultural Nursery
          </Button>
          <Button
            onClick={() => handleCategorySelect("AgriculturalTool")}
            colorScheme={
              selectedCategory === "AgriculturalTool" ? "green" : "gray"
            }
            size="md"
            mb={{ base: 2, md: 0 }}
            width={{ base: "100%", md: "auto" }}
          >
            Agricultural Tool
          </Button>
          <Button
            onClick={() => handleCategorySelect("AimalFarm")}
            colorScheme={selectedCategory === "AimalFarm" ? "green" : "gray"}
            size="md"
            mb={{ base: 2, md: 0 }}
            width={{ base: "100%", md: "auto" }}
          >
            Animal Farm
          </Button>
          <Button
            onClick={() => handleCategorySelect("AimalFarmTool")}
            colorScheme={
              selectedCategory === "AimalFarmTool" ? "green" : "gray"
            }
            size="md"
            mb={{ base: 2, md: 0 }}
            width={{ base: "100%", md: "auto" }}
          >
            Animal Farm Tool
          </Button>
          <Button
            onClick={() => handleCategorySelect("Offer")}
            colorScheme={selectedCategory === "Offer" ? "green" : "gray"}
            size="md"
            mb={{ base: 2, md: 0 }}
            width={{ base: "100%", md: "auto" }}
          >
            Offer
          </Button>
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
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              setCartProducts={props.setCartProductss}
            />
          ))}
        </SimpleGrid>
      </Stack>

      <Flex justifyContent="center" mt={5}>
        <Stack direction="row" spacing={2}>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              onClick={() => paginate(i + 1)}
              colorScheme={currentPage === i + 1 ? "green" : "gray"}
            >
              {i + 1}
            </Button>
          ))}
        </Stack>
      </Flex>
    </>
  );
};

export default Products;
