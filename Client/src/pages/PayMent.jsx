import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useLocation } from "react-router-dom";

const PayMent = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const getUserNameFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(token);
        const id1 = decodedToken.id;
        setId(id1);
        // console.log(id1);
      }
    };

    getUserNameFromToken();
  }, []);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const total = searchParams.get("total");
  // console.log(total)

  const generateOrderNumber = () => {
    const prefix = "HM-";
    const randomNum = Math.floor(Math.random() * 1000000);
    const paddedNum = randomNum.toString().padStart(6, "0");
    return prefix + paddedNum;
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formValues, setFormValues] = useState({
    Username: "",
    Email: "",
    CardNumber: "",
    ExpDate: "",
    CVV: "",
    StreetName: "",
    ZipCode: "",
    Subtotal: total || "",
    PhoneNumber: "",
    OrderNumber: generateOrderNumber(),
    Date: getCurrentDate(),
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const {
      Email,
      CardNumber,
      ExpDate,
      CVV,
      StreetName,
      ZipCode,
      PhoneNumber,
    } = formValues;
    const errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!Email.match(emailRegex)) {
      errors.Email = "Invalid email address";
    }

    // Card number validation
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!CardNumber.match(cardNumberRegex)) {
      errors.CardNumber = "Invalid card number";
    }

    // Expire validation
    const expireRegex = /^(0[1-9]|1[0-2])\/[0-9]{4}$/;
    if (!ExpDate.match(expireRegex)) {
      errors.ExpDate = "Invalid expiration date";
    }

    // CVV validation
    const cvvRegex = /^[0-9]{3}$/;
    if (!CVV.match(cvvRegex)) {
      errors.CVV = "Invalid CVV";
    }

    // Billing address validation
    if (StreetName.trim() === "") {
      errors.StreetName = "Billing address is required";
    }

    // ZIP validation
    const zipRegex = /^\d{5}$/;
    if (!ZipCode.match(zipRegex)) {
      errors.ZipCode = "Invalid ZIP code";
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!PhoneNumber.match(phoneRegex)) {
      errors.PhoneNumber = "Invalid phone number";
    }

    setErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        // Send the form values to the server
        const response = await axios.post(
          `http://localhost:3000/confirmationPayment/${id}`,
          formValues
        );
        console.log("Form values:", formValues);
        console.log("Server response:", response.data);
        // TODO: Handle the response and navigate to the next page
      } catch (error) {
        console.error("Error submitting form:", error);
        // TODO: Handle the error
      }
    }

    const product_data = localStorage.getItem("Carts");

    const data = {
      product_data,
    };

    // Make the POST request to the endpoint using Axios
    axios
      .post(`http://localhost:3000/orders/${id}`, data)
      .then((response) => {
        console.log(response.data.message); // Success message received from the server
      })
      .catch((error) => {
        console.error(error); // Log any errors that occurred during the request
      });

      navigate('/Check');
  };

  return (
      <Container py={5} maxW="50%">
      <Grid placeItems="center">
        <GridItem md="10" lg="8" xl="5">
          <Box rounded="md" bg="white" p={4}>
            <Stack spacing={4}>
              <Box textAlign="center" mb={4}>
                <Text fontSize="xl" fontWeight="bold">
                  Payment
                </Text>
              </Box>
              <FormControl>
                <FormLabel htmlFor="Username">Cardholder's Name</FormLabel>
                <Input
                  id="Username"
                  type="text"
                  size="lg"
                  name="Username"
                  value={formValues.Username}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="Email">Cardholder's Email</FormLabel>
                <Input
                  id="Email"
                  type="email"
                  size="lg"
                  name="Email"
                  value={formValues.Email}
                  onChange={handleChange}
                  isInvalid={!!errors.Email}
                />
                {errors.Email && (
                  <Text color="red" fontSize="sm">
                    {errors.Email}
                  </Text>
                )}
              </FormControl>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(12, 1fr)",
                }}
                gap={4}
                my={4}
              >
                <GridItem colSpan={{ base: 1, md: 7 }}>
                  <FormControl>
                    <FormLabel htmlFor="CardNumber">Card Number <span style={{color:"red"}}>*</span></FormLabel>
                    <Input
                      id="CardNumber"
                      type="text"
                      size="lg"
                      name="CardNumber"
                      value={formValues.CardNumber}
                      onChange={handleChange}
                      isInvalid={!!errors.CardNumber}
                    />
                    {errors.CardNumber && (
                      <Text color="red" fontSize="sm">
                        {errors.CardNumber}
                      </Text>
                    )}
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 3 }}>
                  <FormControl>
                    <FormLabel htmlFor="ExpDate">Expire <span style={{color:"red"}}>*</span></FormLabel>
                    <Input
                      id="ExpDate"
                      type="text"
                      size="lg"
                      name="ExpDate"
                      value={formValues.ExpDate}
                      onChange={handleChange}
                      placeholder="MM/YYYY"
                      isInvalid={!!errors.ExpDate}
                    />
                    {errors.ExpDate && (
                      <Text color="red" fontSize="sm">
                        {errors.ExpDate}
                      </Text>
                    )}
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 2 }}>
                  <FormControl>
                    <FormLabel htmlFor="CVV">CVV <span style={{color:"red"}}>*</span></FormLabel>
                    <Input
                      id="CVV"
                      type="text"
                      size="lg"
                      name="CVV"
                      value={formValues.CVV}
                      onChange={handleChange}
                      placeholder="CVV"
                      isInvalid={!!errors.CVV}
                    />
                    {errors.CVV && (
                      <Text color="red" fontSize="sm">
                        {errors.CVV}
                      </Text>
                    )}
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 7 }}>
                  <FormControl>
                    <FormLabel htmlFor="StreetName">
                      Shipping Address <span style={{color:"red"}}>*</span>
                    </FormLabel>
                    <Input
                      id="StreetName"
                      type="text"
                      size="lg"
                      name="StreetName"
                      value={formValues.StreetName}
                      onChange={handleChange}
                      placeholder="Street Address"
                      isInvalid={!!errors.StreetName}
                    />
                    {errors.StreetName && (
                      <Text color="red" fontSize="sm">
                        {errors.StreetName}
                      </Text>
                    )}
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 3 }}>
                  <FormControl>
                    <FormLabel htmlFor="ZipCode">ZIP <span style={{color:"red"}}>*</span></FormLabel>
                    <Input
                      id="ZipCode"
                      type="text"
                      size="lg"
                      name="ZipCode"
                      value={formValues.ZipCode}
                      onChange={handleChange}
                      placeholder="ZIP"
                      isInvalid={!!errors.ZipCode}
                    />
                    {errors.ZipCode && (
                      <Text color="red" fontSize="sm">
                        {errors.ZipCode}
                      </Text>
                    )}
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 12 }}>
                  <FormControl>
                    <FormLabel htmlFor="Subtotal">Subtotal</FormLabel>
                    <Input
                      id="Subtotal"
                      type="number"
                      step="0.01"
                      size="lg"
                      readOnly
                      name="Subtotal"
                      value={formValues.Subtotal}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 7 }}>
                  <FormControl>
                    <FormLabel htmlFor="PhoneNumber">Phone Number <span style={{color:"red"}}>*</span></FormLabel>
                    <Input
                      id="PhoneNumber"
                      type="tel"
                      size="lg"
                      name="PhoneNumber"
                      value={formValues.PhoneNumber}
                      onChange={handleChange}
                      isInvalid={!!errors.PhoneNumber}
                    />
                    {errors.PhoneNumber && (
                      <Text color="red" fontSize="sm">
                        {errors.PhoneNumber}
                      </Text>
                    )}
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 5 }}>
                  <FormControl>
                    <FormLabel htmlFor="OrderNumber">Order Number</FormLabel>
                    <Input
                      id="OrderNumber"
                      type="text"
                      size="lg"
                      name="OrderNumber"
                      value={formValues.OrderNumber}
                      readOnly
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              <Button
                // bg="primary"
                color="white"
                size="lg"
                onClick={handleSubmit}
                style={{backgroundColor:"#454545"}}
              >
                Place Order
              </Button>
            </Stack>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default PayMent;
