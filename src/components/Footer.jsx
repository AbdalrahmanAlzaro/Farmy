import {
    Box,
    Container,
    Stack,
    Text,
    // Link,
    useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';


export default function SmallWithNavigation() {
    return (
        <Box
            mt={100}
            bg="#454545"
            color="white"
            
            >
            <Container
                as={Stack}
                maxW={'6xl'}
                py={8}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Stack direction={'row'} spacing={6}>
                    <Link to={'/'}>Home</Link>
                    <Link to={'#'}>About</Link>
                    <Link to={'/Contact'}>Contact</Link>
                </Stack>
                <Text>© 2023 HarvestMart. All rights reserved</Text>
            </Container>
        </Box>
    );
}