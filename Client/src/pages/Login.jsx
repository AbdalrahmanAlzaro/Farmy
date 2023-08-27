import { useState } from "react";
import {
  Button,
  HStack,
  Img,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../utils/colors";
import logo from "../assets/logo.png";
import loginImg from "../assets/login-img.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const Login = ({ updateIsLog }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "email":
        if (!value.trim()) {
          errorMessage = "Email is required";
        } else if (!emailRegex.test(value)) {
          errorMessage = "Invalid email address";
        }
        break;
      case "password":
        if (!value.trim()) {
          errorMessage = "Password is required";
        }
        break;
      default:
        break;
    }

    return errorMessage;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    let isValid = true;

    Object.entries({ email, password }).forEach(([fieldName, value]) => {
      const errorMessage = validateField(fieldName, value);
      validationErrors[fieldName] = errorMessage;

      if (errorMessage) {
        isValid = false;
      }
    });

    setErrors(validationErrors);

    if (isValid) {
      try {
        const response = await axios.post("http://localhost:3000/LogIn", {
          email,
          password,
        });

        const { token } = response.data;
        // Save the token in local storage or cookies for future requests
        localStorage.setItem("token", token);
        // Redirect to the home page
        updateIsLog(true);
        navigate("/");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle incorrect email or password error
          setErrors({ ...errors, email: "Incorrect email or password" });
        } else {
          console.error(error);
          // Handle other errors (e.g., display error message to the user)
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // setUserGoogle(codeResponse)

      getGoogleLogin(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const getGoogleLogin = async (userGoogle) => {
    if (userGoogle.length !== 0) {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogle.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${userGoogle.access_token}`,
              Accept: "application/json",
            },
          }
        );

        console.log(response.data);
        try {
          const newUserResponse = await axios.post(
            `http://localhost:3000/register-google`,
            response.data
          );
          console.log(response)
          localStorage.setItem("token", newUserResponse.data.token);
          window.location.href = `/`;
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <Stack
      direction={["column", "column", "row"]}
      spacing={10}
      mt={20}
      mb={20}
      justifyContent="space-around"
    >
      <Stack spacing={5} alignItems="center" maxW={["100%", "100%", "800px"]}>
        <Img src={logo} w={14} h={14} />
        <Text fontSize={["xl", "xl", "2xl"]} fontWeight="bold">
          Welcome Back
        </Text>
        <Text fontSize="xs">Please Enter your Details</Text>
        <form onSubmit={handleLogin}>
          <Input
            style={{ width: "26rem" }}
            name="email"
            type="email"
            placeholder="Email"
            size="md"
            mb={4}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
          />
          {errors.email && (
            <Text fontSize="sm" color="red.500">
              {errors.email}
            </Text>
          )}
          <InputGroup size="md" mb={4}>
            <Input
              w="100%"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
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
          {errors.password && (
            <Text fontSize="sm" color="red.500">
              {errors.password}
            </Text>
          )}
          <Button
            backgroundColor="#454545"
            colorScheme="green"
            color="white"
            size="md"
            fontWeight="thin"
            w="100%"
            type="submit"
          >
            Continue
          </Button>
        </form>
        <Link to="/ForgotPassword">
          <Text as="span" fontWeight="bold">
            Forget Your PassWord
          </Text>
        </Link>
        <Text>Or</Text>
        <Button
          w="100%"
          leftIcon={<FcGoogle fontSize={20} />}
          bg="white"
          color={colors.primary}
          size="md"
          fontWeight="thin"
          id="google-sign-in"
          onClick={() => login()}
        >
          Continue with Google
        </Button>
        <Link to="/signup">
          Don't have an account?{" "}
          <Text as="span" fontWeight="bold">
            Sign Up Here!
          </Text>
        </Link>
      </Stack>
      <Img
        src={loginImg}
        w={["100%", "100%", "450px"]}
        h={["auto", "auto", "450px"]}
      />
    </Stack>
  );
};

export default Login;
