import { Center, Flex, Heading } from "@chakra-ui/react";
import { DefaultBox } from '../components/DefaultBox';


export function HomePage() {
    return (
        <DefaultBox>
            <Center>
                <Flex flexDirection={"column"} textAlign={'center'} alignItems={'center'} justifyContent={'center'} maxW={'80%'}>
                    <Heading as="h1" size="xl" m={5}>
                        Home page
                    </Heading>                                    
                </Flex>
            </Center>

        </DefaultBox>
    )
}