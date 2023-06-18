import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
} from '@chakra-ui/react';
import imm from '../assets/images.png'
import { colors } from "../utils/colors";
export default function WithBackgroundImage() {
    return (
        <Flex
            w={'full'}
            h={'90vh'}
            backgroundImage={
                `url(${imm})`
            }
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            <VStack
                w={'full'}
                justify={'center'}
                px={useBreakpointValue({ base: 4, md: 8 })}
                bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
                <Stack maxW={'2xl'} align={'flex-start'} spacing={3}>
                    <Text
                        color={'white'}
                        fontWeight={700}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
                        For Animal Farm, a popular product is Orwellian-themed merchandise, while for Agricultural Nursery, specialized fertilizers and pest control solutions are essential products.
                    </Text>
                    <Stack direction={'row'}>
                        <Button
                            bg={colors.primary}
                            rounded={'full'}
                            color={'white'}
                            _hover={{ color: colors.primary, bg: "white" }}
                            // style={{backgroundColor:"#454545"}}
                            >
                            Show me more
                        </Button>
                    </Stack>
                </Stack>
            </VStack>
        </Flex>
    );
}