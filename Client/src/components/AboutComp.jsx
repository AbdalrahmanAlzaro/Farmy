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

      <Stack spacing={9} mt={8}>
        <Heading as="h2" size="lg">
          Our Team
        </Heading>
        <Flex direction={{ base: "column", md: "row" }}>
          <Box
            flex="1"
            p={4}
            bg="gray.100"
            borderRadius="md"
            textAlign="center"
            boxShadow="md"
          >
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_JlCFnIGX5omgjEjgV9F3sBRq14eTERK9w&usqp=CAU"
              alt="Team Member 1"
              borderRadius="full"
              boxSize="150px"
              mb={4}
              mx="auto"
            />
            <Heading as="h3" size="md" mb={2}>
              John Doe
            </Heading>
            <Text>CEO</Text>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
};

export default AboutUsPage;
