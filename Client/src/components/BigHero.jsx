"use client";

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function SplitScreen() {
  return (
    <Stack minH={"80vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <motion.div
              initial={{ x: -1000 }} // Initial position (off the screen to the left)
              animate={{ x: 0 }} // Final position (on the screen)
              transition={{ duration: 1 }} // Duration of the animation in seconds
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "20%", md: "30%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "#519341",
                  zIndex: -1,
                }}
              >
                HarvestMart
              </Text>
              <br />
              <Text color={"#519341"} as={"span"}>
                For organic and healthy living
              </Text>
            </motion.div>
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Explore the captivating world of 'Animal Farm' as the animals take
            center stage, while in the adjacent Agricultural nursery, witness
            the meticulous care and nurturing of plants and crops for a
            flourishing harvest
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Link to="/products">
              <Button
                rounded={"full"}
                backgroundColor="#454545"
                colorScheme="teal"
              >
                See Our Product
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://media.istockphoto.com/id/1304018826/photo/a-place-for-poultry-to-call-home.jpg?b=1&s=612x612&w=0&k=20&c=MDwmhTSOd8y19R1Rj4pbOElvOaN5_UDneQwpcdeQkdE="
          }
          borderRadius="lg" // Add the borderRadius prop to set the border radius
        />
      </Flex>
    </Stack>
  );
}
