import { useState } from "react";
import { Button, HStack, Img, Input, Stack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { colors } from "../utils/colors";
import logo from "../assets/logo.png";
import loginImg from "../assets/login-img.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Signup = ({ handleSignup }) => {
  const [displayName, setDisplayName] = useState("");
  const { error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await handleSignup(email, password);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <HStack spacing={10} mt={20} mb={20} justifyContent="space-around">
      <Stack spacing={5} alignItems="center" w={400}>
        <Img src={logo} w={14} h={14} />
        <Text fontSize="2xl" fontWeight="bold">
          Create an Account
        </Text>
        <Text fontSize="xs">Please Enter your Details</Text>
        <form onSubmit={handleSubmit}>
          <Input
            name="displayName"
            type="text"
            placeholder="Name"
            size="md"
            mb={4}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            size="md"
            mb={4}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            size="md"
            mb={4}
          />
          <Button
            bg={colors.primary}
            color="white"
            size="md"
            _hover={{ color: colors.primary, bg: "white" }}
            fontWeight="thin"
            w="100%"
            type="submit"
          >
            Continue
          </Button>
        </form>
        {error && <Text color="red">{error}</Text>}
        <Text>Or</Text>
        <Button
          leftIcon={<FcGoogle fontSize={20} />}
          bg={"white"}
          color={colors.primary}
          size="md"
          fontWeight="thin"
        >
          Continue with Google
        </Button>
        <Button
          leftIcon={<FaFacebook color="#1877F2" fontSize={20} />}
          bg={"white"}
          color={colors.primary}
          size="md"
          fontWeight="thin"
        >
          Continue with Facebook
        </Button>
        <Link to="/login">
          Already have an account?{" "}
          <span style={{ fontWeight: "bold" }}>Login</span>
        </Link>
      </Stack>
      <Img src={loginImg} w={450} h={450} />
    </HStack>
  );
};

export default Signup;
