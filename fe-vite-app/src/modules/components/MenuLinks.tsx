import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import { ReactNode } from "react";
import { Flex, Box, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';

type MenuLinksProps = {
    children: ReactNode;
}

export function MenuLinks({ children }: MenuLinksProps) {
    return (
        <Box>
            <Box display={{ base: 'block', md: 'none' }} mr={2}>
                <Menu >
                    <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline"/>
                    <MenuList color={'white'} zIndex={1000}>
                        {children && React.Children.map(children, (child) => {
                            return (
                                <MenuItem color={'white'} >
                                    {child}
                                </MenuItem>
                            )
                        })}
                    </MenuList>
                </Menu>
            </Box>
            <Flex flexDirection={{ base: 'column', md: 'row' }} display={{ base: 'none', md: 'block' }} >
                {children}
            </Flex>
        </Box>
    )
}