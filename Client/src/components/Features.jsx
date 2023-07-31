import { Box, SimpleGrid, Icon, Heading, Text, Center } from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";

const Feature = ({ icon, title, text }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
      {icon}
      <Heading as="h3" size="lg" mt={4} mb={2}>
        {title}
      </Heading>
      <Text>{text}</Text>
    </Box>
  );
};

const FeatureCard = () => {
  return (
    <Center py={8} m={30}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcAssistant} boxSize={10} />}
          title={"Lifetime Support"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
        />
        <Feature
          icon={<Icon as={FcDonate} boxSize={10} />}
          title={"Unlimited Donations"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
        />
        <Feature
          icon={<Icon as={FcInTransit} boxSize={10} />}
          title={"Instant Delivery"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
        />
      </SimpleGrid>
    </Center>
  );
};

export default FeatureCard;
