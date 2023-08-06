import { useState, useEffect } from "react";
import { Stack, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import { colors } from "../utils/colors";
import ProductCard from "../components/ProductCard";
import jwt_decode from "jwt-decode";
import axios from "axios"; // Import Axios
import SearchInput from "../components/SearchInput"; // Import the SearchInput component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AnimalFarmProductTools = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [userid, setUserid] = useState("");
  const [cartProducts, setCartProducts] = useState(
    JSON.parse(localStorage.getItem("Carts")) ?? []
  );
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [filteredProductss, setFilteredProducts] = useState(products);

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
      const existingCartProducts =
        JSON.parse(localStorage.getItem("Carts")) || [];
      const existingProduct = existingCartProducts.find(
        (p) => p.id === productId
      );

      if (existingProduct) {
        // If the product already exists in the cart, update its quantity
        existingProduct.quantity += 1;
      } else {
        // If the product does not exist in the cart, add it with quantity 1
        existingCartProducts.push({ ...product, quantity: 1 });
      }

      // Update the cart in localStorage with the updated cart products
      localStorage.setItem("Carts", JSON.stringify(existingCartProducts));

      // Update the state of the cartProducts in the Offers component
      setCartProducts(existingCartProducts);

      // Show the toast notification
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

  const saveToLocalStorage = (cart) => {
    localStorage.setItem("Carts", JSON.stringify(cart));
  };

  useEffect(() => {
    // Fetch data from the endpoint
    axios
      .get("http://localhost:3000/allproductsAimalFarmTool") // Replace this with the correct endpoint URL
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        // Handle error if necessary
      });
  }, []);

  const handleSearch = (searchTerm) => {
    setFilteredProducts(
      products.filter((product) =>
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };
  // console.log(filteredProductss);

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <ToastContainer />
      <Text fontSize="3xl" textAlign="center" ml={25}>
        Explore <span style={{ color: colors.green }}>Nature's</span> Finest
        Selection
      </Text>
      <Flex justifyContent="center">
        <Stack spacing={10} direction="row">
          {/* SearchInput component with the onSearch prop */}
          <SearchInput onSearch={handleSearch} />
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
          {/* Use the filteredProducts instead of products */}

          {(filteredProductss.length === 0 ? products : filteredProductss).map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                setCartProducts={props.setCartProductss}
              />
            )
          )}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default AnimalFarmProductTools;
