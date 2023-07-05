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
      alignItems="center"
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
            bg={colors.primary}
            color="white"
            _hover={{ color: colors.primary, bg: "white" }}
            fontWeight="thin"
          >
            <Link to="/products">Get Fresh & Healthy</Link>
          </Button>
          {/* <Image src={label} boxSize="20px" /> */}
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
