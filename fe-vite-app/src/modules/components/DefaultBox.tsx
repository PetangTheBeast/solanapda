import { Box } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import { ReactNode } from "react";

type DefaultBoxProps = {
    children: ReactNode;
}

export function DefaultBox({ children }: DefaultBoxProps) {
    return (
        <Box minH={'100vh'} maxH={'100%'} minW={'100vw'} maxW={'100%'}>
            <Navbar />
            <Box p={2}>
                {children}
            </Box>
        </Box>
    )
}