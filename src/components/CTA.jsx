import { HStack, Img, Stack, Text } from "@chakra-ui/react";
import blob from "../assets/blob.png";
import truck from "../assets/Truck.png";
import fruits from "../assets/Fruits.png";
const CTA = () => {
  return (
    <HStack alignItems="center" justifyContent="space-around" >
      <Stack>
        <Text>BUY OUR PRODUCTS</Text>
        <Text fontSize="4xl" maxW={400}>
          Currently Available at Select Retailers
        </Text>
        <Img src={fruits} w={300} h={300} />
      </Stack>
      <Stack>
        <Img src={blob} w={350} h={400} marginLeft={14} />
        <Img src={truck} w={500} h={350} position="absolute" bottom={220} />
      </Stack>
    </HStack>
  );
};
export default CTA;
