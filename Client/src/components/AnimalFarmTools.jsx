import { Fragment } from 'react';
import { Container, Text, Stack, Avatar, Icon, Image, Box } from '@chakra-ui/react';
import { ImQuotesLeft } from 'react-icons/im';

const testimonials = [
    {
        name: 'Abd Al-zaro',
        position: 'CEO',
        company: 'HarvestMart',
        image: 'https://images.pexels.com/photos/7772719/pexels-photo-7772719.jpeg?auto=compress&cs=tinysrgb&w=600',
        content: 'Animal tools and equipment refer to specialized devices and implements used in animal husbandry and care. These tools are designed to assist with tasks such as feeding, grooming, handling, and health monitoring of animals. They play a crucial role in ensuring the welfare and proper management of animals in various agricultural, veterinary, and research settings.'
    }
];

const Testimonials = () => {
    return (

        <Container maxW="5xl" p={{ base: 5, md: 8 }} mt={100}>
            {testimonials.map((obj, index) => (
                <Fragment key={index}>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        bgGradient="linear(to-br, #EDF2F7, #EDF2F7)"
                        spacing={{ base: 0, sm: 10 }}
                        p={{ base: 4, sm: 10 }}
                        rounded="lg"
                        justify="center"
                    >
                        <Box width="100rem" pos="relative" d={{ base: 'none', sm: 'block' }}>
                            <Image
                                size="2xl"
                                pos="absolute"
                                rounded="lg"
                                src={obj.image}
                                top="-3.8rem"
                                boxShadow="lg"
                            />
                        </Box>
                        <Stack direction="column" spacing={4} textAlign="left" maxW="4xl">
                            <Icon as={ImQuotesLeft} w={10} h={10} color="#454545" />
                            <Text fontSize="md" fontWeight="medium" color="#454545">
                                {obj.content}
                            </Text>
                            <Stack alignItems={{ base: 'center', sm: 'flex-start' }} spacing={0}>
                                <Text fontWeight="bold" fontSize="lg" color="#454545">
                                    {obj.name}
                                </Text>
                                <Text fontWeight="medium" fontSize="sm" color="#454545">
                                    {obj.position}, {obj.company}
                                </Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </Fragment>
            ))}
        </Container>
    );
};

export default Testimonials;
