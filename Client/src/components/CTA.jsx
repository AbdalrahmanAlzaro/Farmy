import { HStack, Img, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import blob from "../assets/blob.png";
import truck from "../assets/Truck.png";
import fruits from "../assets/Fruits.png";

const CTA = () => {
  const stackDirection = useBreakpointValue({ base: "column", md: "row" });
  const stackSpacing = useBreakpointValue({ base: 4, md: 10 });
  const imageWidth = useBreakpointValue({
    base: "100%",
    md: "300px",
    lg: "400px",
  });
  const imageHeight = useBreakpointValue({
    base: "auto",
    md: "300px",
    lg: "400px",
  });
  const blobWidth = useBreakpointValue({
    base: "300px",
    md: "350px",
    lg: "400px",
  });
  const truckWidth = useBreakpointValue({
    base: "300px",
    md: "400px",
    lg: "500px",
  });
  const truckHeight = useBreakpointValue({
    base: "200px",
    md: "350px",
    lg: "400px",
  });

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <HStack
      alignItems="center"
      justifyContent="space-around"
      direction={stackDirection}
      spacing={stackSpacing}
    >
      <Stack padding={5}>
        <Text fontSize="xl">BUY OUR PRODUCTS</Text>
        <Text fontSize="4xl" maxW={400}>
          Currently Available at Select Retailers
        </Text>
        <Img src={fruits} w={imageWidth} h={imageHeight} />
      </Stack>
      {isSmallScreen ? null : (
        <Stack>
          <Img
            src={blob}
            w={blobWidth}
            h={blobWidth}
            marginLeft={{ base: 0, md: 14 }}
          />
          <Img
            src={truck}
            w={truckWidth}
            h={truckHeight}
            position="absolute"
            bottom={300}
          />
        </Stack>
      )}
    </HStack>
  );
};

export default CTA;
