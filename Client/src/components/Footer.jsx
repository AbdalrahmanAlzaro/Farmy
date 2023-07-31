import {
  Box,
  Container,
  Stack,
  Text,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronUpIcon } from "@chakra-ui/icons";

export default function SmallWithNavigation() {
  // State to track whether the user has scrolled down
  const [showArrow, setShowArrow] = useState(false);

  // Function to handle the scroll event and show/hide the arrow accordingly
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  };

  // Add event listener to handle scroll events
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll to the top when arrow is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box mt={135} bg="#454545" color="white">
      <Container
        as={Stack}
        maxW={"6xl"}
        py={8}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Stack direction={"row"} spacing={6}>
          <Link to={"/"}>Home</Link>
          <Link to={"/About"}>About</Link>
          <Link to={"/Contact"}>Contact</Link>
        </Stack>
        <Text>© 2023 HarvestMart. All rights reserved</Text>
        {showArrow && (
          <IconButton
            icon={<ChevronUpIcon />}
            style={{backgroundColor:"#519341"}}
            aria-label="Scroll to top"
            onClick={scrollToTop}
            size="lg"
            variant="ghost"
            colorScheme="white"
            position="fixed"
            bottom={4}
            right={4}
            zIndex="tooltip"
            _hover={{
              bg: "rgba(0, 0, 0, 0.4)", // Black with 40% opacity for light mode
            }}
            _active={{
              bg: "rgba(0, 0, 0, 0.6)", // Black with 60% opacity for light mode
            }}
            transition="transform 0.3s ease"
            transform="scale(1)"
            _focus={{
              boxShadow: "outline",
              transform: "scale(1.1)",
            }}
          />
        )}
      </Container>
    </Box>
  );
}
