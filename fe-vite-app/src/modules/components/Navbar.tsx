import { Flex, Box, Spacer } from '@chakra-ui/react';
import { Link as LinkRouter } from 'react-router-dom';
import { route } from '../../route';
import { MenuLinks } from './MenuLinks';
import { CustomLink } from './CustomLink';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";


export function Navbar() {
    
    return (
        <Box>
            <Flex p="4" bg={'blue.50'} flexDirection={{ base: 'column', md: 'row' }} rowGap={2}>
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Flex mr="10" >                        
                        <LinkRouter to={route.home()}>TEST1</LinkRouter>
                    </Flex>
                    <Spacer />
                    <MenuLinks>
                        <CustomLink to={route.home()}>Home</CustomLink>
                        <CustomLink to={route.bank()}>Bank</CustomLink>
                    </MenuLinks>                    
                </Flex> 
                <Spacer />
                <WalletMultiButton />                 
            </Flex>
        </Box>

    );
}