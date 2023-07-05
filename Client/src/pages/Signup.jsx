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
import axios from 'axios';

const Signup = ({ updateIsLog }) => {
  console.log(updateIsLog)
  // const [path, setPath] = useState("/");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const validateField = (fieldName, value) => {
    let errorMessage = '';

    switch (fieldName) {
      case 'username':
        if (!value.trim()) {
          errorMessage = 'Username is required';
        }
        break;
      case 'email':
        if (!value.trim()) {
          errorMessage = 'Email is required';
        } else if (!emailRegex.test(value)) {
          errorMessage = 'Invalid email address';
        }
        break;
      case 'password':
        if (!value.trim()) {
          errorMessage = 'Password is required';
        } else if (!passwordRegex.test(value)) {
          errorMessage = 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number';
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
        const response = await axios.post('http://localhost:3000/Register', {
          username: values.username,
          email: values.email,
          password: values.password,
        });
        const { token } = response.data;
        localStorage.setItem('token', token);
        updateIsLog(true);
        navigate('/')
        console.log(response);
      } catch (error) {
        console.log(error);
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
            style={{ width: "23rem" }}
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
        <Text>Or</Text>
        <Button
          leftIcon={<FcGoogle fontSize={20} />}
          bg="white"
          color={colors.primary}
          size="md"
          fontWeight="thin"
        >
          Continue with Google
        </Button>
        <Button
          leftIcon={<FaFacebook color="#1877F2" fontSize={20} />}
          bg="white"
          color={colors.primary}
          size="md"
          fontWeight="thin"
        >
          Continue with Facebook
        </Button>
        <Link to="/login">
          Already have an account?{" "}
          <Text as="span" fontWeight="bold">
            Login
          </Text>
        </Link>
      </Stack>
      <Img src={loginImg} w={["100%", "100%", "450px"]} h={["auto", "auto", "450px"]} />
    </Stack>
  );
};

export default Signup;
