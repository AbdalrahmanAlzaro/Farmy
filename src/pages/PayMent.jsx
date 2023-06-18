// import React from "react";
// import {
//     Box,
//     Button,
//     Container,
//     FormControl,
//     FormLabel,
//     Grid,
//     GridItem,
//     Input,
//     Stack,
//     Text,
// } from "@chakra-ui/react";
// import { colors } from "../utils/colors";
// import { Link } from "react-router-dom";

// export default function App() {
//     return (
//         <Container
//             py={5}
//             maxW="50%"
//         >
//             <Grid placeItems="center" >
//                 <GridItem md="10" lg="8" xl="5">
//                     <Box rounded="md" bg="white" p={4}>
//                         <Stack spacing={4}>
//                             <Box textAlign="center" mb={4}>
//                                 <Text fontSize="xl" fontWeight="bold">
//                                     Payment
//                                 </Text>
//                             </Box>
//                             <FormControl>
//                                 <FormLabel htmlFor="form3">Cardholder's Name</FormLabel>
//                                 <Input
//                                     id="form3"
//                                     type="text"
//                                     size="lg"
//                                 />
//                             </FormControl>
//                             <FormControl>
//                                 <FormLabel htmlFor="form3">Cardholder's Email</FormLabel>
//                                 <Input
//                                     id="form3"
//                                     type="text"
//                                     size="lg"
//                                 />
//                             </FormControl>
//                             <Grid templateColumns="repeat(12, 1fr)" gap={4} my={4}>
//                                 <GridItem colSpan={7}>
//                                     <FormControl>
//                                         <FormLabel htmlFor="form4">Card Number</FormLabel>
//                                         <Input
//                                             id="form4"
//                                             type="text"
//                                             size="lg"
//                                         />
//                                     </FormControl>
//                                 </GridItem>
//                                 <GridItem colSpan={3}>
//                                     <FormControl>
//                                         <FormLabel htmlFor="form5">Expire</FormLabel>
//                                         <Input
//                                             id="form5"
//                                             type="text"
//                                             size="lg"
//                                             placeholder="MM/YYYY"
//                                         />
//                                     </FormControl>
//                                 </GridItem>
//                                 <GridItem colSpan={2}>
//                                     <FormControl>
//                                         <FormLabel htmlFor="form6">CVV</FormLabel>
//                                         <Input
//                                             id="form6"
//                                             type="text"
//                                             size="lg"
//                                             placeholder="CVV"
//                                         />
//                                     </FormControl>
//                                 </GridItem>
//                                 <GridItem colSpan={7}>
//                                     <FormControl>
//                                         <FormLabel htmlFor="form4">Billing Address</FormLabel>
//                                         <Input
//                                             id="form4"
//                                             type="text"
//                                             size="lg"
//                                             placeholder="Street Address"
//                                         />
//                                     </FormControl>
//                                 </GridItem>
//                                 <GridItem colSpan={3}>
//                                     <FormControl>
//                                         <FormLabel htmlFor="form5">ZIP</FormLabel>
//                                         <Input
//                                             id="form5"
//                                             type="text"
//                                             size="lg"
//                                             placeholder="ZIP"
//                                         />
//                                     </FormControl>
//                                 </GridItem>
//                             </Grid>
//                             <Button bg={colors.primary} color="white" size="lg" >
//                                 <Link to="/Check">
//                                     Place Order
//                                 </Link>
//                             </Button>
//                         </Stack>
//                     </Box>
//                 </GridItem>
//             </Grid>
//         </Container>
//     );
// }







import React, { useState } from "react";
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
import { colors } from "../utils/colors";
import { Link } from "react-router-dom";

export default function App() {
    const [formValues, setFormValues] = useState({
        cardholderName: "",
        cardholderEmail: "",
        cardNumber: "",
        expire: "",
        cvv: "",
        billingAddress: "",
        zip: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { cardholderEmail, cardNumber, expire, cvv, billingAddress, zip } =
            formValues;
        const errors = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!cardholderEmail.match(emailRegex)) {
            errors.cardholderEmail = "Invalid email address";
        }

        // Card number validation
        const cardNumberRegex = /^[0-9]{16}$/;
        if (!cardNumber.match(cardNumberRegex)) {
            errors.cardNumber = "Invalid card number";
        }

        // Expire validation
        const expireRegex = /^(0[1-9]|1[0-2])\/[0-9]{4}$/;
        if (!expire.match(expireRegex)) {
            errors.expire = "Invalid expiration date";
        }

        // CVV validation
        const cvvRegex = /^[0-9]{3}$/;
        if (!cvv.match(cvvRegex)) {
            errors.cvv = "Invalid CVV";
        }

        // Billing address validation
        if (billingAddress.trim() === "") {
            errors.billingAddress = "Billing address is required";
        }

        // ZIP validation
        const zipRegex = /^\d{5}$/;
        if (!zip.match(zipRegex)) {
            errors.zip = "Invalid ZIP code";
        }

        setErrors(errors);

        // Return true if there are no errors
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            // Process the form submission or navigate to the next page
            // For now, just console.log the form values
            console.log("Form values:", formValues);
        }
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
                                <FormLabel htmlFor="cardholderName">Cardholder's Name</FormLabel>
                                <Input
                                    id="cardholderName"
                                    type="text"
                                    size="lg"
                                    name="cardholderName"
                                    value={formValues.cardholderName}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="cardholderEmail">Cardholder's Email</FormLabel>
                                <Input
                                    id="cardholderEmail"
                                    type="email"
                                    size="lg"
                                    name="cardholderEmail"
                                    value={formValues.cardholderEmail}
                                    onChange={handleChange}
                                    isInvalid={!!errors.cardholderEmail}
                                />
                                {errors.cardholderEmail && (
                                    <Text color="red" fontSize="sm">
                                        {errors.cardholderEmail}
                                    </Text>
                                )}
                            </FormControl>
                            <Grid templateColumns="repeat(12, 1fr)" gap={4} my={4}>
                                <GridItem colSpan={7}>
                                    <FormControl>
                                        <FormLabel htmlFor="cardNumber">Card Number</FormLabel>
                                        <Input
                                            id="cardNumber"
                                            type="text"
                                            size="lg"
                                            name="cardNumber"
                                            value={formValues.cardNumber}
                                            onChange={handleChange}
                                            isInvalid={!!errors.cardNumber}
                                        />
                                        {errors.cardNumber && (
                                            <Text color="red" fontSize="sm">
                                                {errors.cardNumber}
                                            </Text>
                                        )}
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={3}>
                                    <FormControl>
                                        <FormLabel htmlFor="expire">Expire</FormLabel>
                                        <Input
                                            id="expire"
                                            type="text"
                                            size="lg"
                                            name="expire"
                                            value={formValues.expire}
                                            onChange={handleChange}
                                            placeholder="MM/YYYY"
                                            isInvalid={!!errors.expire}
                                        />
                                        {errors.expire && (
                                            <Text color="red" fontSize="sm">
                                                {errors.expire}
                                            </Text>
                                        )}
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <FormLabel htmlFor="cvv">CVV</FormLabel>
                                        <Input
                                            id="cvv"
                                            type="text"
                                            size="lg"
                                            name="cvv"
                                            value={formValues.cvv}
                                            onChange={handleChange}
                                            placeholder="CVV"
                                            isInvalid={!!errors.cvv}
                                        />
                                        {errors.cvv && (
                                            <Text color="red" fontSize="sm">
                                                {errors.cvv}
                                            </Text>
                                        )}
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={7}>
                                    <FormControl>
                                        <FormLabel htmlFor="billingAddress">Billing Address</FormLabel>
                                        <Input
                                            id="billingAddress"
                                            type="text"
                                            size="lg"
                                            name="billingAddress"
                                            value={formValues.billingAddress}
                                            onChange={handleChange}
                                            placeholder="Street Address"
                                            isInvalid={!!errors.billingAddress}
                                        />
                                        {errors.billingAddress && (
                                            <Text color="red" fontSize="sm">
                                                {errors.billingAddress}
                                            </Text>
                                        )}
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={3}>
                                    <FormControl>
                                        <FormLabel htmlFor="zip">ZIP</FormLabel>
                                        <Input
                                            id="zip"
                                            type="text"
                                            size="lg"
                                            name="zip"
                                            value={formValues.zip}
                                            onChange={handleChange}
                                            placeholder="ZIP"
                                            isInvalid={!!errors.zip}
                                        />
                                        {errors.zip && (
                                            <Text color="red" fontSize="sm">
                                                {errors.zip}
                                            </Text>
                                        )}
                                    </FormControl>
                                </GridItem>
                            </Grid>
                            <Button bg={colors.primary} color="white" size="lg" onClick={handleSubmit}>
                                <Link to="/Check">Place Order</Link>
                            </Button>
                        </Stack>
                    </Box>
                </GridItem>
            </Grid>
        </Container>
    );
}
