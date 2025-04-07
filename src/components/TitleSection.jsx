import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Spacer, Button, Text } from "@chakra-ui/react";



export function TitleSection() {
    return (
        <Box ml="10%" mr="15%" mt="10px"  color="#00A8C6">
            <Text fontSize="5xl" fontWeight="bold">
                Buscador de Fórmulas Químicas en Bases de Datos
            </Text>
        </Box>
    );
}