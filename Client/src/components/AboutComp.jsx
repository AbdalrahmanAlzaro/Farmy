import { Box, Flex, Heading, Text, Image, Stack } from "@chakra-ui/react";

const AboutUsPage = () => {
  return (
    <Box p={8}>
      <Flex direction={{ base: "column", md: "row" }} alignItems="center">
        <Box flex="1">
          <Heading as="h1" size="xl" mb={4}>
            Welcome to Our Company
          </Heading>
          <Text fontSize="lg" mb={6}>
            We are a leading company in our industry, specializing in providing
            high-quality products and services.
          </Text>
          <Text fontSize="lg" mb={6}>
            Our mission is to exceed customer expectations by delivering
            innovative solutions and ensuring customer satisfaction.
          </Text>
          <Text fontSize="lg" mb={6}>
            With a team of dedicated professionals, we strive to maintain the
            highest standards of quality and reliability in everything we do.
          </Text>
        </Box>
        <Box flex="1" ml={{ base: 0, md: 8 }}>
          <Image
            src="https://images.pexels.com/photos/1482101/pexels-photo-1482101.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="About Us Image"
            objectFit="cover"
            borderRadius="md"
            boxShadow="md"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default AboutUsPage;
