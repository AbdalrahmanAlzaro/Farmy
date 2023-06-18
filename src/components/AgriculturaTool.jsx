import { Fragment } from 'react';
import { Container, Text, Stack, Avatar, Icon, Image, Box } from '@chakra-ui/react';
import { ImQuotesLeft } from 'react-icons/im';

const testimonials = [
    {
        name: 'Abd Al-zaro',
        position: 'CEO',
        company: 'HarvestMart',
        image: 'https://images.pexels.com/photos/5218008/pexels-photo-5218008.jpeg?auto=compress&cs=tinysrgb&w=600',
        content: 'When it comes to agriculture and nurseries, having the appropriate tools is essential for efficient and successful operations. Tools like tractors, irrigation systems, and pruning shears enable farmers and nursery owners to cultivate and maintain crops effectively. Additionally, incorporating organic fertilizers promotes sustainable and environmentally-friendly practices, ensuring healthy plant growth without harmful chemicals.'
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
