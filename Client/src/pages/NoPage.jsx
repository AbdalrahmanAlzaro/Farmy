import { Center, Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import img from "../assets/404.png";

const NoRoutePage = () => {
  return (
    <Center minHeight="80vh">
      <Box
        p={8}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        maxW="md"
        textAlign="center"
        width={1000}
      >
        <Image src={img} alt="404 Not Found" maxH="200px" mx="auto" mb={4} />
        <Heading as="h2" size="lg" mb={4}>
          Oops! Page Not Found
        </Heading>
        <Text>The requested page could not be found.</Text>
        <Link to="/">
          <Button
            mt={4}
            colorScheme="blue"
            _hover={{ color: "white", backgroundColor: "#454545" }}
            style={{ color: "white", backgroundColor: "#454545" }}
          >
            Go Back Home
          </Button>
        </Link>
      </Box>
    </Center>
  );
};

export default NoRoutePage;
