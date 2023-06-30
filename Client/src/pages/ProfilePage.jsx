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
    const getUserNameFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(token);
        const name = decodedToken.username;
        const email = decodedToken.email;
        const id1 = decodedToken.id;
        setId(id1);
        setUserName(name);
        setUserEmail(email);
        console.log(id1);

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
      <Flex direction="column" align="center" p={8}>
        <Avatar
          size="xl"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_JlCFnIGX5omgjEjgV9F3sBRq14eTERK9w&usqp=CAU"
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
          colorScheme="teal"
          onClick={onOpen}
          style={{ backgroundColor: "#454545" }}
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
                      <input
                        type="text"
                        id="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        className="chakra-input"
                        style={{
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                          borderRadius: "4px",
                        }}
                      />
                    </Flex>
                  </Box>
                  <Box>
                    <Flex justifyContent="space-between" alignItems="center">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                        className="chakra-input"
                        style={{
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                          borderRadius: "4px",
                        }}
                      />
                    </Flex>
                  </Box>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme="teal"
                  mr={3}
                  style={{ backgroundColor: "#454545" }}
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
        <SimpleGrid columns={3} spacing={4}>
          {userData.map((item) => (
            <Fragment key={item.ordernumber}>
              <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
                <Text fontWeight="bold">Order Number: {item.ordernumber}</Text>
                <Text>Subtotal: {item.subtotal}</Text>
                <Text fontWeight="bold">Product Data:</Text>
                {item.product_data.map((element, index) => (
                  <Box key={element.name} ml={4} mt={index !== 0 ? 2 : 0}>
                    <Text>Name: {element.name}</Text>
                    <Text>Price: {element.price}</Text>
                    <Text>Quantity: {element.quantity}</Text>
                  </Box>
                ))}
              </Box>
            </Fragment>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default ProfilePage;
