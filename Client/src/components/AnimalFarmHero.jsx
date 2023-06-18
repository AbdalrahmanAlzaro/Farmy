import { chakra, Stack, Box, useColorModeValue } from '@chakra-ui/react';


const Index = () => {
    return (
        <Box pb={8}>
            <Stack
                pos="relative"
                backgroundImage="url('https://images.pexels.com/photos/2681870/pexels-photo-2681870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
                backgroundSize="cover"
                height="500px"
                w="100%"
            ></Stack>
            <Box maxW="3xl" p={4} isolation="isolate" zIndex={3} mt="-10rem" marginInline="auto">
                <Box
                    boxShadow={useColorModeValue(
                        '0 4px 6px rgba(160, 174, 192, 0.6)',
                        '0 4px 6px rgba(9, 17, 28, 0.9)'
                    )}
                    bg={useColorModeValue('white', 'gray.800')}
                    p={{ base: 4, sm: 8 }}
                    overflow="hidden"
                    rounded="2xl"
                >
                    <Stack pos="relative" zIndex={1} direction="column" spacing={6} textAlign="left ">
                        <chakra.h1 fontSize="4xl" lineHeight={1.2} fontWeight="bold" >
                            Animal Farm
                        </chakra.h1>
                        <chakra.h1 color="gray.400" fontSize="xl" maxW="600px" lineHeight={1.2}>
                            An animal farm is a managed facility where various livestock animals are raised for agricultural purposes such as meat, milk, and eggs. These farms provide essential care, housing, and nutrition to ensure the well-being and productivity of the animals. They play a crucial role in meeting the demand for animal-based products while adhering to animal welfare standards.
                        </chakra.h1>

                        {/* <Stack direction={{ base: 'column', md: 'row' }} spacing={8} w={200} h={200}
                            display="flex" alignItems="center" justifyContent="space-between">
                            <img src="https://media.istockphoto.com/id/1359737381/photo/professional-veterinarian-feeding-cow-with-hay-on-farm-animal-husbandry.jpg?s=612x612&w=0&k=20&c=6smk2K3q0lUPTUHQ3JfM3rG-BjKDsWCaseIBHNoaE-8=" alt="" />

                            <img src="https://media.istockphoto.com/id/1222803292/photo/pov-image-of-female-hands-feeding-red-hens-with-grain-poultry-farming-concept.jpg?b=1&s=612x612&w=0&k=20&c=EJe6NBXJI3L-BZ9gNqg9VIdSPLFiQgY08yz30Tr3NJQ=" alt="" />

                            <img src="https://images.pexels.com/photos/195226/pexels-photo-195226.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />


                        </Stack> */}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default Index;