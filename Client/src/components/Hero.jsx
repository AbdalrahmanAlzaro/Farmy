import { Box, Button, HStack, Img, Stack, Text } from "@chakra-ui/react";
import bg from "../assets/heroBG.png";
import label from "../assets/organic-label.webp";
import { colors } from "../utils/colors";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <HStack alignItems="center" justifyContent="space-around" mb={10} mt={100}>
      <Stack>
        <Text mt={8} fontSize="5xl" maxW={500}>
          Sustainable Animal Farm and Organic Agricultural Nursery: Embracing a{" "}
          <span style={{ color: colors.green }}>Healthy</span> Lifestyle
        </Text>
        <HStack spacing={10}>
          <Button
            bg={colors.primary}
            color="white"
            _hover={{ color: colors.primary, bg: "white" }}
            fontWeight="thin"
          >
            <Link to="/products">
              Get Fresh & Healthy
            </Link>
          </Button>
          <Img src={label} w={20} h={20} />
        </HStack>
      </Stack>
      <Img src={bg} w={500} h={500} />
    </HStack>
  );
};
export default Hero;
