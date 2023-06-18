import { useState } from "react";
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
} from "@chakra-ui/react";

const ProfilePage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const user = {
        name: "John Doe",
        email: "johndoe@example.com",
        phoneNumber: "0782111991",
        location: "New York, USA",
        avatarUrl: "https://example.com/avatar.png",
    };

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [location, setLocation] = useState(user.location);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform update logic here
        toast({
            title: "Profile Updated",
            description: "Your profile information has been updated.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        onClose();
    };

    return (
        <Flex direction="column" align="center" p={8}>
            <Avatar size="xl" src={user.avatarUrl} mb={4} />
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
                    {user.name}
                </Heading>
                <Stack spacing={2} align="start">
                    <Text fontSize="lg">
                        <strong>Email:</strong> {user.email}
                    </Text>
                    <Text fontSize="lg">
                        <strong>Phone Number:</strong> {user.phoneNumber}
                    </Text>
                    <Text fontSize="lg">
                        <strong>Location:</strong> {user.location}
                    </Text>
                </Stack>
            </Flex>

            <Button mt={8} colorScheme="teal" onClick={onOpen} style={{backgroundColor:"#454545"}}>
                Edit Profile
            </Button>

            {/* Edit Profile Modal */}
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
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                        <label htmlFor="location">Location:</label>
                                        <input
                                            type="text"
                                            id="location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
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
                            <Button type="submit" colorScheme="teal" mr={3} style={{backgroundColor:"#454545"}}>
                                Save Changes
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default ProfilePage;
