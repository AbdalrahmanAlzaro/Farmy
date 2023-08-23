// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   chakra,
//   Container,
//   Stack,
//   Text,
//   useColorModeValue,
//   Image,
//   Skeleton,
//   Box,
//   Link,
// } from "@chakra-ui/react";

// const FullSection = () => {
//   const [aboutUsData, setAboutUsData] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get("/aboutus");
//         setAboutUsData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <Box bg={useColorModeValue("gray.100", "gray.800")} py={20}>
//       <Container maxW="6xl">
//         <Stack direction={{ base: "column", md: "row" }} spacing={8}>
//           <Box flex={1}>
//             <Image
//               boxShadow="lg"
//               w="100%"
//               h="100%"
//               minW={{ base: "auto", md: "30rem" }}
//               maxH="20rem"
//               objectFit="cover"
//               src={`https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80`}
//               rounded="md"
//               fallback={<Skeleton />}
//             />
//           </Box>
//           <Stack direction="column" spacing={6} justifyContent="center">
//             <chakra.h1
//               fontSize="5xl"
//               lineHeight={1}
//               fontWeight="bold"
//               textAlign="left"
//             >
//               Discover Our Products
//             </chakra.h1>
//             <Text fontSize="lg" color="gray.600">
//               HarvestMart is an integrated platform encompassing agricultural
//               nurseries and animal farms, fostering sustainable practices for
//               diverse agricultural needs.
//             </Text>
//           </Stack>
//         </Stack>
//       </Container>
//     </Box>
//   );
// };

// export default FullSection;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Image,
  Skeleton,
  Box,
  Link,
} from "@chakra-ui/react";

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
      <Container maxW="6xl">
        <Stack direction={{ base: "column", md: "row" }} spacing={8}>
          <Box flex={1}>
            <Image
              boxShadow="lg"
              w="100%"
              h="100%"
              minW={{ base: "auto", md: "30rem" }}
              maxH="20rem"
              objectFit="cover"
              src={`https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80`}
              rounded="md"
              fallback={<Skeleton />}
            />
          </Box>
          <Stack direction="column" spacing={6} justifyContent="center">
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
