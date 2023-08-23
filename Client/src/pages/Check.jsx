import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <Box textAlign="center" py={10} px={6} mt={150}>
      <CheckCircleIcon boxSize={50} color="green.500" mb={6} />

      <Heading as="h2" size="xl" mb={2}>
        Operation accomplished successfully
      </Heading>

      <Text color="gray.500" fontSize="lg" mb={6}>
        Thank you for your order!
      </Text>

      <Button
        as={Link}
        to="/"
        size="lg"
        fontWeight="thin"
        borderRadius="md"
        backgroundColor="#454545"
        colorScheme="teal"
      >
        Go Back Home
      </Button>
    </Box>
  );
}
