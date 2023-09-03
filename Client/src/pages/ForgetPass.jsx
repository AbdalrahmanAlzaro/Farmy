import React, { useState } from "react";
import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/forgotpassword",
        { email }
      );
      if (response.data.Status === "Success") {
        navigate("/Login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack
      direction="column"
      spacing={5}
      alignItems="center"
      justifyContent="center" // Center the content vertically
      minHeight="70vh" // Set minimum height of the Stack to fill the viewport
    >
      <Stack
        pt="36"
        rounded="md"
        p="5"
        bgOpacity="0.4"
        align="center"
        justify="center"
        spacing={5}
        maxW="400px"
        shadow="lg" // Add a shadow
      >
        <Text fontSize={["xl", "xl", "2xl"]} fontWeight="bold">
          Reset Your Password?
        </Text>
        <Text fontSize="xs">Please Enter Your Email</Text>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your email"
            size="md"
            mb={4}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            backgroundColor="#454545"
            colorScheme="green"
            size="md"
            fontWeight="thin"
            w="100%"
            type="submit"
          >
            Send
          </Button>
        </form>
        <Link to="/Login">
          <Text as="span" fontWeight="bold">
            Back to Login
          </Text>
        </Link>
      </Stack>
    </Stack>
  );
}

export default ForgotPassword;
