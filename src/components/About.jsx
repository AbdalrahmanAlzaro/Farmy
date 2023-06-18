import { Box, HStack, Img, SimpleGrid, Stack, Text } from "@chakra-ui/react";
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
  return (
    <HStack alignItems="center" justifyContent="space-around" mb={28} mt={100}>
      <Stack>
        <Img src={aboutBlob} w={300} h={400} marginLeft={10} />
        <Img src={aboutBG} w={350} h={300} position="absolute" top={1515} />
      </Stack>
      <Stack spacing={10}>
        <Text fontSize="3xl">Our Commitment to Quality</Text>
        <Text maxW={500}>
          We believe in the power of nature and its ability to provide us with
          nourishing food and products. That's why we work closely with local
          farmers who share our values to source the freshest organic produce
          and dairy items. From luscious fruits and vegetables to creamy
          artisanal cheeses and wholesome dairy products, every item in our
          collection is carefully curated with your well-being in mind.
        </Text>
        <SimpleGrid columns={2} spacing={10} alignItems="center">
          {services.map((service) => (
            <HStack alignItems="center" spacing={4} key={service.text}>
              <Img src={service.img} w={50} h={50} />
              <Text maxW={150}>{service.text}</Text>
            </HStack>
          ))}
        </SimpleGrid>
      </Stack>
    </HStack>
  );
};
export default About;
