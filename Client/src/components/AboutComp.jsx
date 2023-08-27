import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Stack, Text, Image, Skeleton, Box } from "@chakra-ui/react";

const FullSection = () => {
  const [aboutUsData, setAboutUsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/aboutus");
        setAboutUsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Box py={20}>
      <Container maxW="9xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 6, md: 12 }} // Increased spacing between image and text
          alignItems="center" // Center content vertically
        >
          <Box flex={{ base: 1, md: 1.5 }}>
            <Image
              boxShadow="lg"
              w="100%"
              h="100%"
              minW={{ base: "auto", md: "30rem" }}
              maxH="20rem"
              objectFit="cover"
              src={`https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60`}
              rounded="md"
              fallback={<Skeleton />}
            />
          </Box>
          <Stack
            direction="column"
            spacing={6}
            justifyContent="center"
            flex={1.5} // Adjusted flex value for the text stack
          >
            {aboutUsData.map((item) => (
              <Box key={item.id} mt={6} textAlign="center">
                <Text as="h1" fontSize="6xl" fontWeight="bold">
                  {item.title}
                </Text>
                <Text color="gray.600">{item.description}</Text>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default FullSection;
