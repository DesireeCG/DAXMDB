import { Box, Text, Button, Flex } from "@chakra-ui/react";

export function Barraseparadora(){
    return (
        <>
        <Box
          opacity="0.3"
          bg="linear-gradient(to right,rgb(0, 0, 0),rgb(249, 242, 231),rgb(0, 0, 0))" // Degradado de izquierda a derecha
          height="3px" // Altura de la barra
          ml="5%" mr="5%" mt="3px"
        ></Box>
        </>
    );
}