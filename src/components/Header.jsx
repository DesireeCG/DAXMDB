import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Spacer, Button, Text } from "@chakra-ui/react";

export function Header() {

    // Función para recargar la página
    const recargarPagina = () => {
        window.location.reload();
    };

    return (
        <Box bg="blue.100" px={6} py={4} boxShadow="md">
            <Flex wrap="wrap" justify="left">
                <Button 
                    as={Link} 
                    to="/" 
                    h="40px" 
                    fontSize="4xl" 
                    fontWeight="bold"
                    variant="ghost"
                    textColor="#8FBE00"
                    onClick={recargarPagina}
                >
                    FINCHER
                </Button>
            </Flex>
        </Box>
    );
}

