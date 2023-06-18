// import { HStack, Icon, Image, Text, border } from "@chakra-ui/react";
// import logo from "../assets/logo.png";
// import { BiCart, BiUser } from "react-icons/bi";
// import { Link, useLocation } from "react-router-dom";
// const Navbar = ({ displayName, handleLogout, cartProducts }) => {

//   const location = useLocation();
//   const isActiveLink = (path) => {
//     return location.pathname === path;
//   };
//   const counterOfCart = cartProducts.map(el => {
//     return el.quantity
//   }).reduce((acc, cur) => {
//     return acc + cur
//   }, 0)


//   return (
//     <>
//       <HStack mt="3" mb="3"
//         alignItems="center"
//         justifyContent="space-around"
//       >
//         <Link to="/" className={isActiveLink("/") ? "active-link" : ""}>
//           <HStack alignItems="center" spacing="4">
//             <Image src={logo} alt="logo" boxSize="50px" />
//             <Text fontSize="2xl">HarvestMart</Text>
//           </HStack>
//         </Link>
//         <HStack spacing={8}>
//           <Link to="/" className={isActiveLink("/") ? "active-link" : ""}>
//             <Text>Home</Text>
//           </Link>
//           <Link
//             to="/Agriculturalnursery"
//             className={isActiveLink("/Agriculturalnursery") ? "active-link" : ""}
//           >
//             <Text>Agricultural nursery</Text>
//           </Link>
//           <Link
//             to="/AnimalFarm"
//             className={isActiveLink("/AnimalFarm") ? "active-link" : ""}
//           >
//             <Text>Animal farm</Text>
//           </Link>
//           <Link
//             to="/products"
//             className={isActiveLink("/products") ? "active-link" : ""}
//           >
//             <Text>Products</Text>
//           </Link>
//           {!displayName && (
//             <>
//               {/* <Link
//                 to="/login"
//                 className={isActiveLink("/login") ? "active-link" : ""}
//               >
//                 <Text>Login</Text>
//               </Link> */}
//               <Link
//                 to="/signup"
//                 className={isActiveLink("/signup") ? "active-link" : ""}
//               >
//                 <Text>Signup</Text>
//               </Link>
//             </>
//           )}
//         </HStack>
//         <HStack spacing={8} alignItems="center">
//           <Link to="/cart">
//             <Icon as={BiCart} w={6} h={6} />
//             <span >{counterOfCart}</span>
//             {/* style={{ border: '1px solid', borderRadius: "15px", padding: "5px", backgroundColor: "green", color: "#FFFF" }} */}
//           </Link>
//           {displayName ? (
//             <>
//               <Text>Hi {displayName}!</Text>
//               <Link to="/" onClick={handleLogout}>
//                 <Text>Logout</Text>
//               </Link>
//             </>
//           ) : (
//             <Link to="/">
//               <Icon as={BiUser} w={6} h={6} />
//             </Link>
//           )}
//         </HStack>
//       </HStack>
//     </>
//   );
// };

// export default Navbar;






import { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { BiCart, BiUser } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = ({ displayName, handleLogout, cartProducts }) => {
  const [isSmallerThanMd] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const counterOfCart = cartProducts.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        p={4}
        // bg="gray.800"
        color="white"
        wrap={isMenuOpen ? "wrap" : "nowrap"}
      >
        <Flex align="center" mr={5}>
          <Link to="/" className={isActiveLink("/") ? "active-link" : ""}>
            <HStack alignItems="center" spacing="4">
              <Image src={logo} alt="logo" boxSize="50px" />
              <Text fontSize="2xl" style={{ color: "#454545" }}>HarvestMart</Text>
            </HStack>
          </Link>
        </Flex>

        {isSmallerThanMd ? (
          <>
            <Box
              display="flex"
              alignItems="center"
              onClick={handleMenuClick}
              cursor="pointer"

            >
              <Icon as={FiMenu} boxSize={6} style={{ backgroundColor: "white", color: "#454545" }} />
            </Box>
          </>
        ) : (
          <>
            <HStack spacing={8} style={{ color: "#454545" }}>
              <Link to="/" className={isActiveLink("/") ? "active-link" : ""}>
                <Text>Home</Text>
              </Link>
              <Link
                to="/Agriculturalnursery"
                className={
                  isActiveLink("/Agriculturalnursery") ? "active-link" : ""
                }
              >
                <Text>Agricultural nursery</Text>
              </Link>
              <Link
                to="/AnimalFarm"
                className={isActiveLink("/AnimalFarm") ? "active-link" : ""}
              >
                <Text>Animal farm</Text>
              </Link>
              <Link
                to="/products"
                className={isActiveLink("/products") ? "active-link" : ""}
              >
                <Text>Products</Text>
              </Link>
              {!displayName && (
                <>
                  <Link
                    to="/signup"
                    className={isActiveLink("/signup") ? "active-link" : ""}
                  >
                    <Text>Signup</Text>
                  </Link>
                </>
              )}
            </HStack>

            <HStack spacing={8} alignItems="center" style={{ color: "#454545" }}>
              <Link to="/cart">
                <Icon as={BiCart} boxSize={6} />
                <span>{counterOfCart}</span>
              </Link>
              {displayName ? (
                <>
                  <Text>Hi {displayName}!</Text>
                  <Link to="/" onClick={handleLogout}>
                    <Text>Logout</Text>
                  </Link>
                </>
              ) : (
                <Link to="/ProfilePage">
                  <Icon as={BiUser} boxSize={6} />
                </Link>
              )}
            </HStack>
          </>
        )}
      </Flex>

      {isSmallerThanMd && isMenuOpen && (
        <Box p={4} bg="" style={{ color: "#454545" }} >
          <Link to="/" className={isActiveLink("/") ? "active-link" : ""}>
            <Text mb={2}>Home</Text>
          </Link>
          <Link
            to="/Agriculturalnursery"
            className={
              isActiveLink("/Agriculturalnursery") ? "active-link" : ""
            }
          >
            <Text mb={2}>Agricultural nursery</Text>
          </Link>
          <Link
            to="/AnimalFarm"
            className={isActiveLink("/AnimalFarm") ? "active-link" : ""}
          >
            <Text mb={2}>Animal farm</Text>
          </Link>
          <Link
            to="/products"
            className={isActiveLink("/products") ? "active-link" : ""}
          >
            <Text mb={2}>Products</Text>
          </Link>
          {!displayName && (
            <>
              <Link
                to="/signup"
                className={isActiveLink("/signup") ? "active-link" : ""}
              >
                <Text mb={2}>Signup</Text>
              </Link>
            </>
          )}
          <Link to="/cart" onClick={handleMenuClick}>
            <Text mb={2}>
              <Icon as={BiCart} boxSize={6} />
              {counterOfCart}
            </Text>
          </Link>
          {displayName ? (
            
            <>
              <Text mb={2}>Hi {displayName}!</Text>
              <Link to="/" onClick={handleLogout}>
                <Text>Logout</Text>
              </Link>
            </>
          ) : (
            <Link to="/ProfilePage">
              <Icon as={BiUser} boxSize={6} />
            </Link>
          )}
        </Box>
      )}
    </>
  );
};

export default Navbar;
