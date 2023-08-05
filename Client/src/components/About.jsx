import {
  Box,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import aboutBG from "../assets/aboutBG.png";
import aboutBlob from "../assets/aboutBlob.png";
import jam from "../assets/jam.png";
import milk from "../assets/milk.png";
import wheat from "../assets/wheat.png";
import sprout from "../assets/sprout.png";

const services = [
  {
    text: "A curated selection of artisanal dairy products",
    img: milk,
  },
  {
    text: "Fresh and organic produce straight from local farms.",
    img: jam,
  },
  {
    text: "Transparency and traceability for every product we offer.",
    img: wheat,
  },
  {
    text: "sustainable lifestyle",
    img: sprout,
  },
];

const About = () => {
  const stackDirection = useBreakpointValue({ base: "column", md: "row" });
  const stackSpacing = useBreakpointValue({ base: 4, md: 10 });
  const gridColumns = useBreakpointValue({ base: 1, md: 2 });
  const imageWidth = useBreakpointValue({ base: "200px", md: "300px" });
  const imageHeight = useBreakpointValue({ base: "auto", md: "400px" });

  return (
    <HStack
      alignItems="center"
      justifyContent="space-around"
      mb={28}
      mt={100}
      direction={stackDirection}
      spacing={{ base: 10, md: 0 }}
    >
      <Stack>
        <Image src={aboutBlob} w={imageWidth} h={imageHeight} marginLeft={10} />
        <Image src={aboutBG} w={350} h={300} position="absolute" top={2600} />
      </Stack>
      <Stack spacing={stackSpacing} maxW={{ base: "100%", md: "500px" }}>
        <Text fontSize="3xl">Our Commitment to Quality</Text>
        <Text maxW={500}>
          We believe in the power of nature and its ability to provide us with
          nourishing food and products. That's why we work closely with local
          farmers who share our values to source the freshest organic produce
          and dairy items. From luscious fruits and vegetables to creamy
          artisanal cheeses and wholesome dairy products, every item in our
          collection is carefully curated with your well-being in mind.
        </Text>
        <SimpleGrid columns={gridColumns} spacing={10} alignItems="center">
          {services.map((service) => (
            <HStack alignItems="center" spacing={4} key={service.text}>
              <Image src={service.img} boxSize="50px" />
              <Text maxW={150}>{service.text}</Text>
            </HStack>
          ))}
        </SimpleGrid>
      </Stack>
    </HStack>
  );
};

export default About;
