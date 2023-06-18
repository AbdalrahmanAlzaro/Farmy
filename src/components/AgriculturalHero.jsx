import { chakra, Stack, Box, useColorModeValue } from '@chakra-ui/react';


const Index = () => {
  return (
    <Box pb={8}>
      <Stack
        pos="relative"
        backgroundImage="url('https://images.pexels.com/photos/3076897/pexels-photo-3076897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
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
              Agricultural Nursery
            </chakra.h1>
            <chakra.h1 color="gray.400" fontSize="xl" maxW="600px" lineHeight={1.2}>
              An agricultural nursery plays a vital role in propagating and nurturing plants for various agricultural purposes. It serves as a source for high-quality plant seedlings, saplings, and cuttings, providing farmers and growers with a diverse range of crops and tree species. Agricultural nurseries contribute to sustainable farming practices by supplying healthy and disease-resistant plants, enabling successful agricultural ventures.
            </chakra.h1>

            {/* <Stack direction={{ base: 'column', md: 'row' }} spacing={8} w={200} h={200}
              display="flex" alignItems="center" justifyContent="space-between">
              <img src="https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?b=1&s=612x612&w=0&k=20&c=ypi6_4naoAQuOgbH6TSU6jJ-uPSvKR1igsXRNlBoJNQ=" alt="" />

              <img src="https://media.istockphoto.com/id/1372896674/photo/banana-tree-in-stone-pot-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=xqBq8MzeLJxZILBUz45jgb4CAJDwqhvn_7biEpQdg7w=" alt="" />

              <img src="https://media.istockphoto.com/id/1401702743/photo/3d-illustration-of-houseplant-potted-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=v81_OT9i1b7Q61UQF8OOJKcru_T3VK8Jb4zLCWI-qoI=" alt="" />


            </Stack> */}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;