import {
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import bg from "../assets/heroBG.png";
import { colors } from "../utils/colors";
import { Link } from "react-router-dom";

const Hero = () => {
  const imageWidth = useBreakpointValue({ base: "100%", md: "500px" });

  return (
    <Flex
      alignItems={{ base: "center", md: "flex-start" }} // Align items in the center for small screens and flex-start for medium screens and above
      justifyContent="space-around"
      mb={10}
      mt={100}
      direction={{ base: "column", md: "row" }}
    >
      <Stack>
        <Text
          mt={8}
          fontSize={{ base: "4xl", md: "5xl" }}
          maxW={500}
          textAlign={{ base: "center", md: "left" }}
        >
          Sustainable Animal Farm and Organic Agricultural Nursery: Embracing a{" "}
          <Text as="span" color={colors.green}>
            Healthy
          </Text>{" "}
          Lifestyle
        </Text>
        <Stack direction={{ base: "column", md: "row" }} spacing={2} mt={4}>
          <Button
            width={150}
            backgroundColor="#454545"
            colorScheme="green"
            color="white"
            fontWeight="thin"
            alignSelf="center" // Center the button on small screens
          >
            <Link to="/products">Get Fresh & Healthy</Link>
          </Button>
        </Stack>
      </Stack>
      <Image
        src={bg}
        boxSize={imageWidth}
        objectFit="cover"
        alt="Background Image"
        mt={{ base: 8, md: 0 }}
      />
    </Flex>
  );
};

export default Hero;
