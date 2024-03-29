"use client";

import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function WithBackgroundImage() {
  return (
    <Flex
      w={"full"}
      h={"50vh"}
      backgroundImage={
        "url(https://images.pexels.com/photos/17849326/pexels-photo-17849326/free-photo-of-panoramic-view-of-a-vineyard.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"
      }
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
            About Us
          </Text>
        </Stack>
      </VStack>
    </Flex>
  );
}
