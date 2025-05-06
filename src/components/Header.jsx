import { Link } from 'react-router-dom';
import i18n from "i18next";
import { Box, Flex, Button, Spacer, Select } from "@chakra-ui/react";


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
    <Box bg="blue.100" px={6} py={4} boxShadow="md">
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
  );
}
