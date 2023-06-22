

// import { useState } from "react";
// import {
//   Button,
//   HStack,
//   Img,
//   Input,
//   InputGroup,
//   InputRightElement,
//   Stack,
//   Text,
// } from "@chakra-ui/react";
// import { Link, useNavigate } from "react-router-dom";
// import { colors } from "../utils/colors";
// import logo from "../assets/logo.png";
// import loginImg from "../assets/login-img.png";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebook } from "react-icons/fa";
// import { HiEye, HiEyeOff } from "react-icons/hi";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <Stack
//       direction={["column", "column", "row"]}
//       spacing={10}
//       mt={20}
//       mb={20}
//       justifyContent="space-around"
//     >
//       <Stack spacing={5} alignItems="center" maxW={["100%", "100%", "400px"]}>
//         <Img src={logo} w={14} h={14} />
//         <Text fontSize={["xl", "xl", "2xl"]} fontWeight="bold">
//           Welcome Back
//         </Text>
//         <Text fontSize="xs">Please Enter your Details</Text>
//         <form onSubmit={handleLogin}>
//           <Input
//             name="email"
//             type="email"
//             placeholder="Email"
//             size="md"
//             mb={4}
//             style={{width:"25rem"}}
//           />
//           <InputGroup size="md" mb={4}>
//             <Input
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               pr="4.5rem"
//             />
//             <InputRightElement width="4.5rem">
//               <Button
//                 h="1.75rem"
//                 size="sm"
//                 onClick={togglePasswordVisibility}
//                 bg="transparent"
//               >
//                 {showPassword ? <HiEyeOff /> : <HiEye />}
//               </Button>
//             </InputRightElement>
//           </InputGroup>
//           <Button
//             bg={colors.primary}
//             color="white"
//             size="md"
//             _hover={{ color: colors.primary, bg: "white" }}
//             fontWeight="thin"
//             w="100%"
//             type="submit"
//           >
//             Continue
//           </Button>
//         </form>
//         <Text>Or</Text>
//         <Button
//           leftIcon={<FcGoogle fontSize={20} />}
//           bg="white"
//           color={colors.primary}
//           size="md"
//           fontWeight="thin"
//         >
//           Continue with Google
//         </Button>
//         <Button
//           leftIcon={<FaFacebook color="#1877F2" fontSize={20} />}
//           bg="white"
//           color={colors.primary}
//           size="md"
//           fontWeight="thin"
//         >
//           Continue with Facebook
//         </Button>
//         <Link to="/signup">
//           Don't have an account?{" "}
//           <Text as="span" fontWeight="bold">
//             Sign Up Here!
//           </Text>
//         </Link>
//       </Stack>
//       <Img src={loginImg} w={["100%", "100%", "450px"]} h={["auto", "auto", "450px"]} />
//     </Stack>
//   );
// };

// export default Login;








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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/LogIn", { email, password });
      const { token } = response.data;
      // Save the token in local storage or cookies for future requests
      localStorage.setItem("token", token);
      // Redirect to the home page
      navigate("/");
    } catch (error) {
      console.error(error);
      // Handle error here (e.g., display error message to the user)
    }
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
          Welcome Back
        </Text>
        <Text fontSize="xs">Please Enter your Details</Text>
        <form onSubmit={handleLogin}>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            size="md"
            mb={4}
            style={{ width: "25rem" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputGroup size="md" mb={4}>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              pr="4.5rem"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
