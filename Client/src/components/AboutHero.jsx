import { Box, Link, Heading, Flex, Text, Button } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      position="relative"
      bgImage="url('https://images.pexels.com/photos/16463047/pexels-photo-16463047/free-photo-of-flowers-in-hanging-baskets-in-a-greenhouse.jpeg?auto=compress&cs=tinysrgb&w=600')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      p={6}
    >
      <Link to="/">
        <Heading as="h1" size="4xl">
          <Box
            as="span"
            height="1px"
            width="1px"
            position="absolute"
            overflow="hidden"
          >
            AirBnb
          </Box>
        </Heading>
      </Link>
      <Box margin="0 auto" maxW="64rem" py={{ base: "1rem", lg: "8rem" }}>
        <Heading
          as="h2"
          fontSize={{ base: "2.25rem", lg: "3rem" }}
          mb="4"
          color="blue"
        >
          Book a trip. Host travels. All on Airbnb.
        </Heading>
      </Box>
    </Box>
  );
};

export default Header;
