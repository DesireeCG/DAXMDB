import { Link } from 'react-router-dom';
import i18n from "i18next";
import { Image, Stack } from "@chakra-ui/react"
import { Box, Flex, Button, Spacer, Select, Text } from "@chakra-ui/react";
import logoipn from "../img/logo-ipn-horizontal.svg";
import logoupiiz from "../img/upiiz-icono.png";


export function Header() {
  // Función para recargar la página
  const recargarPagina = () => {
    window.location.reload();
  };

  // ✅ Función para cambiar idioma
  const cambiarIdioma = (lang) => {
    i18n.changeLanguage(lang); // 'es' o 'en'
  };

  return (
    <>
    {/* Logo del IPN */}
    <Box px={6} py={4} boxShadow="md">
      <Flex 
        grap="4" 
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "start", md: "center" }}
        >
        <Stack spacing={1}>
          <img height="100px" width="300px" src={logoipn} alt="Logo IPN" />
        </Stack>
        <Stack spacing={2}>
          
        </Stack>
        <Stack spacing={3}>
          <Text>
            
          </Text>
        </Stack>
        <Stack spacing={4}>
          <img height="100px" width="100px" src={logoupiiz} alt='Logo UPIIZ'/>
        </Stack>
      </Flex>
     
    </Box>
    <Box bg="blue.100" px={6} py={4} >
      
      <Flex align="center">
        <Button
          as={Link}
          to="/"
          h="40px"
          fontSize="3xl"
          fontWeight="bold"
          variant="ghost"
          color="black"
          opacity="0.7"
          onClick={recargarPagina}
        >
          DAXMDB
        </Button>

        <Spacer />

        {/* Selector de idioma */}
        <Select
          w="200px"
          onChange={(e) => cambiarIdioma(e.target.value)}
          defaultValue={i18n.language}
          bg="white"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </Select>
      </Flex>
    </Box>
    </>
    
  );
}
