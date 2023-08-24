import React, { useState } from "react";
import { Button, Input, Stack, Text, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HiEye, HiEyeOff } from "react-icons/hi";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();
  const decodedToken = atob(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/reset-password/${id}/${decodedToken}`,
        { password }
      );
      if (response.data.Status === "Success") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Stack
      direction="column"
      spacing={5}
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      bgSize="cover"
      bgPosition="bottom"
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
          Reset Your Password
        </Text>
        <form onSubmit={handleSubmit}>
          <InputGroup size="md">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              autoComplete="off"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pr="4.5rem" // Add space for the icon
              mb={4} // Add margin bottom to create space
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={togglePasswordVisibility}
                bg="transparent"
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            backgroundColor="#454545"
            colorScheme="green"
            size="md"
            fontWeight="thin"
            w="100%"
            type="submit"
          >
            Reset Password
          </Button>
        </form>
      </Stack>
    </Stack>
  );
}

export default ResetPassword;
