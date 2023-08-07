import {
  Stack,
  Flex,
  Text,
  VStack,
  useBreakpointValue,
  Heading, // Import the Heading component
} from "@chakra-ui/react";
import image from "../assets/imagesTooooooooools.png";

export default function WithBackgroundImage() {
  return (
    <>
      {/* Centered section for small screens */}
      <Stack
        align="center" // Center-align horizontally
        justify="center" // Center-align vertically
        minH={{ base: "40vh", md: "20vh", }} // Adjust min height for different screen sizes
        p="3rem"
      >
        <Text style={{ color: "#454545", fontSize: "3rem" }}>
          See the best <span style={{ color: "#519341" }}>equipment</span>
        </Text>
      </Stack>
      <Flex
        w={"full"}
        h={"65vh"}
        backgroundImage={`url(${image})`}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
            >
              Agricultural nursery tools are essential implements used for
              cultivating, planting, and nurturing plants during their initial
              growth stages.
            </Text>
          </Stack>
        </VStack>
      </Flex>
    </>
  );
}
