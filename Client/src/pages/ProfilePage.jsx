import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
  Card,
  SimpleGrid,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import React, { Fragment } from "react";

const ProfilePage = ({ isLog, updateIsLog }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [id, setId] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getUserNameFromToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(token);
        const id1 = decodedToken.id;
        setId(id1);

        try {
          const response = await axios.get(
            `http://localhost:3000/userinfo/${id1}`
          );
          const user = response.data;

          setUserName(user.username);
          setUserEmail(user.email);
        } catch (error) {
          console.error("Error fetching user information:", error);
        }

        axios
          .get(`http://localhost:3000/join-data/${id1}`)
          .then((response) => {
            const data = response.data;
            setUserData(response.data);
            // Process the retrieved data
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    getUserNameFromToken();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/user/${id}`, {
        username: userName,
        email: userEmail,
      });
      console.log(id);

      if (response.status === 200) {
        toast({
          title: "Profile Updated",
          description: "Your profile information has been updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        onClose();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  console.log(userData);
  return (
    <>
      <Flex direction="column" align="center" p={6}>
        <Avatar
          size="xl"
          src="https://www.shutterstock.com/image-vector/farmer-icon-trendy-modern-placeholder-260nw-1684506436.jpg"
          mb={4}
        />
        <Flex
          direction="column"
          align="center"
          maxW="500px"
          w="100%"
          mx="auto"
          px={4}
          py={6}
          borderWidth={1}
          borderRadius="md"
          boxShadow="md"
        >
          <Heading as="h1" size="xl" mb={2}>
            {userName}
          </Heading>
          <Stack spacing={2} align="start">
            <Text fontSize="lg">
              <strong>Email:</strong> {userEmail}
            </Text>
          </Stack>
        </Flex>

        <Button
          mt={8}
          colorScheme="green"
          onClick={onOpen}
          backgroundColor="#454545"
        >
          Edit Profile
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Stack spacing={4}>
                  <Box>
                    <Flex justifyContent="space-between" alignItems="center">
                      <label htmlFor="name">Name:</label>
                      <Input
                        type="text"
                        id="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                    </Flex>
                  </Box>
                  <Box>
                    <Flex justifyContent="space-between" alignItems="center">
                      <label htmlFor="email">Email:</label>
                      <Input
                        type="email"
                        id="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                      />
                    </Flex>
                  </Box>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme="green"
                  mr={3}
                  backgroundColor="#454545"
                >
                  Save Changes
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Flex>

      <Box mt={8}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} padding={4}>
          {userData.map((item) => (
            <Box key={item.ordernumber}>
              <Card boxShadow="md" p={4} borderRadius="md">
                <Text fontSize="lg" fontWeight="bold" color="green" mb={2}>
                  Order Number:{" "}
                  <span style={{ color: "#454545" }}>{item.ordernumber}</span>
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="green" mb={2}>
                  Date:{" "}
                  <span style={{ color: "#454545" }}>
                    {new Date(item.date).toLocaleDateString("en-US")}
                  </span>
                </Text>
                <Text mt={2} fontWeight="bold" color="green">
                  Subtotal:{" "}
                  <span style={{ color: "#454545" }}> ${item.subtotal} </span>
                </Text>
                <Text mt={4} fontWeight="bold" style={{ color: "#454545" }}>
                  Product:
                </Text>
                {item.product_data.map((element) => (
                  <Box key={element.name} mt={2} textAlign="left">
                    <Card
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      boxShadow="md"
                    >
                      <Text fontSize={{ base: "sm", md: "md" }}>
                        <Text as="span" color="green" fontWeight="bold">
                          Name:
                        </Text>{" "}
                        {element.description}
                      </Text>
                      <Text fontSize={{ base: "sm", md: "md" }}>
                        <Text as="span" color="green" fontWeight="bold">
                          Price:
                        </Text>{" "}
                        ${element.price}
                      </Text>
                      <Text fontSize={{ base: "sm", md: "md" }}>
                        <Text as="span" color="green" fontWeight="bold">
                          Quantity:
                        </Text>{" "}
                        {element.quantity}
                      </Text>
                    </Card>
                  </Box>
                ))}
              </Card>
            </Box>
          ))}
        </SimpleGrid>
      </Box>  
    </>
  );
};

export default ProfilePage;
