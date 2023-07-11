import { Fragment } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Flex,
  Text,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { GoLocation } from "react-icons/go";
import { BsPhone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const contactOptions = [
  {
    label: "Address",
    value: "A108 Adam Street, NY 535022, USA",
    icon: GoLocation,
  },
  {
    label: "PHONE NUMBER",
    value: "+1 5589 55488 55",
    icon: BsPhone,
  },
  {
    label: "EMAIL",
    value: "info@example.com",
    icon: HiOutlineMail,
  },
];

const Contact = (props) => {
  const [userid, setUserid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUserNameFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(token);
        const id = decodedToken.id;
        setUserid(id);
        console.log(id);
      }
    };

    if (props.isLog) {
      getUserNameFromToken();
    }
  }, [props.isLog]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/messages/${userid}`,
        {
          name,
          email,
          message,
        }
      );

      console.log(response.data);

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  return (
    <Container maxW="7xl" py={10} px={{ base: 5, md: 8 }}>
      <Stack spacing={10}>
        <Flex align="center" justify="center" direction="column">
          <Heading fontSize="4xl" mb={2}>
            Contact Us
          </Heading>
          <Text fontSize="md" textAlign="center">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque
          </Text>
        </Flex>
        <Stack
          spacing={{ base: 6, md: 0 }}
          direction={{ base: "column", md: "row" }}
          justify="space-between"
        >
          {contactOptions.map((option, index) => (
            <Fragment key={index}>
              <Stack
                spacing={3}
                direction="column"
                justify="center"
                alignItems="center"
                px={3}
              >
                <Icon as={option.icon} w={10} h={10} color="green.400" />
                <Text fontSize="lg" fontWeight="semibold">
                  {option.label}
                </Text>
                <Text fontSize="md" textAlign="center">
                  {option.value}
                </Text>
              </Stack>
              {contactOptions.length - 1 !== index && (
                <Flex d={{ base: "none", md: "flex" }}>
                  <Divider orientation="vertical" />
                </Flex>
              )}
            </Fragment>
          ))}
        </Stack>
        <VStack
          as="form"
          spacing={8}
          w="100%"
          bg={useColorModeValue("white", "gray.700")}
          rounded="lg"
          boxShadow="lg"
          p={{ base: 5, sm: 10 }}
          onSubmit={handleSubmit} // Add onSubmit handler to the form
        >
          <VStack spacing={4} w="100%">
            <Stack
              w="100%"
              spacing={3}
              direction={{ base: "column", md: "row" }}
            >
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Ahmad"
                  rounded="md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  required
                  type="email"
                  placeholder="test@test.com"
                  rounded="md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </Stack>
            <FormControl id="message">
              <FormLabel>Message</FormLabel>
              <Textarea
                required
                size="lg"
                placeholder="Enter your message"
                rounded="md"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormControl>
          </VStack>
          <VStack w="100%">
            <Button
              type="submit" // Specify the button type as "submit"
              //   bg="green.300"
              style={{ backgroundColor: "#454545" }}
              color="white"
              _hover={{
                bg: "green.500",
              }}
              rounded="md"
              w={{ base: "100%", md: "max-content" }}
            >
              Send Message
            </Button>
          </VStack>
        </VStack>
      </Stack>
    </Container>
  );
};

export default Contact;
