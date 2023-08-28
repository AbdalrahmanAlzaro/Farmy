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
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const Signup = ({ updateIsLog }) => {
  // const [path, setPath] = useState("/");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "username":
        if (!value.trim()) {
          errorMessage = "Username is required";
        }
        break;
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
        } else if (!passwordRegex.test(value)) {
          errorMessage =
            "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number";
        }
        break;
      default:
        break;
    }

    return errorMessage;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    Object.keys(values).forEach((fieldName) => {
      const errorMessage = validateField(fieldName, values[fieldName]);
      validationErrors[fieldName] = errorMessage;
    });

    setErrors(validationErrors);

    const isValid = Object.values(validationErrors).every((error) => !error);

    if (isValid) {
      // localStorage.setItem('values', JSON.stringify(values));

      try {
        const response = await axios.post("http://localhost:3000/Register", {
          username: values.username,
          email: values.email,
          password: values.password,
        });
        const { token } = response.data;
        localStorage.setItem("token", token);
        updateIsLog(true);
        navigate("/");
        window.location.reload(); // Refresh the page
        window.location.href = `/`;
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errorMessage = error.response.data.error;
          setErrors((prev) => ({ ...prev, email: errorMessage }));
        } else {
          console.log(error);
        }
      }
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    const errorMessage = validateField(name, value);

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
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
          console.log(response);
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
      <Stack spacing={5} alignItems="center" maxW={["100%", "100%", "400px"]}>
        <Img src={logo} w={14} h={14} />
        <Text fontSize={["xl", "xl", "2xl"]} fontWeight="bold">
          Create an Account
        </Text>
        <Text fontSize="xs">Please Enter your Details</Text>
        <form onSubmit={handleSubmit}>
          <Input
            name="username"
            type="text"
            placeholder="Name"
            size="md"
            mb={4}
            // style={{ width: "23rem" }}
            value={values.username}
            onChange={handleInput}
            isInvalid={!!errors.username}
          />
          {errors.username && (
            <Text fontSize="sm" color="red.500">
              {errors.username}
            </Text>
          )}
          <Input
            name="email"
            type="email"
            placeholder="Email"
            size="md"
            mb={4}
            value={values.email}
            onChange={handleInput}
            isInvalid={!!errors.email}
          />
          {errors.email && (
            <Text fontSize="sm" color="red.500">
              {errors.email}
            </Text>
          )}
          <InputGroup size="md" mb={4}>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              pr="4.5rem"
              value={values.password}
              onChange={handleInput}
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
        <Link to="/login">
          Already have an account?{" "}
          <Text as="span" fontWeight="bold">
            Login
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

export default Signup;
