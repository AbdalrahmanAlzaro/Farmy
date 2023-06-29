import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Operation accomplished successfully
      </Heading>
      <Text color={"gray.500"}></Text>
      <Button
      style={{backgroundColor:"#454545", color:"white"}}
        as={Link}
        to="/"
        // colorScheme="blue"
        mt={6}
        size="lg"
        // fontWeight="thin"
      >
        Go Back Home
      </Button>
    </Box>
  );
}
