import { Link } from 'react-router-dom';
import i18n from "i18next";
import { Image } from "@chakra-ui/react"
import { Box, Flex, Stack, Text,  Divider } from "@chakra-ui/react";
import logoipn from "../img/logo-ipn-horizontal.svg";


export function PiePagina() {
    return (
    <Box bg="blue.100" px={10} py={6} mt={10}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "start", md: "center" }}
        gap={6}
      >
        {/* Columna 1 */}
        <Stack spacing={2}>
          <Text fontWeight="bold" fontSize="sm">Gobierno</Text>
          <Link href="#">Portal de datos abiertos</Link>
          <Link href="#">Declaración de accesibilidad</Link>
          <Link href="#">Términos y Condiciones</Link>
          <Link href="#">Política de seguridad</Link>
          <Link href="#">Mapa del sitio</Link>
        </Stack>

        {/* Columna 2 */}
        <Stack spacing={2}>
          <Text fontWeight="bold" fontSize="sm">Contacto</Text>
          <Text fontSize="sm">Unidad de Transparencia</Text>
          <Text fontSize="sm">Tel: 5555-5555</Text>
          <Text fontSize="sm">correo@ejemplo.gob.mx</Text>
        </Stack>

        {/* Columna 3 */}
        <Stack spacing={2}>
          <Text fontWeight="bold" fontSize="ms">Acerca de</Text>
          <Text fontSize="sm">Es el portal único de trámites, información y participación ciudadana.</Text>
        </Stack>

        <Stack spacing={2}>
            <Text fontWeight="bold" fontSize="ms">Bases de Datos Utilizadas</Text>
            <Link href="#">Base de datos 1</Link>
            <Link herf="#">Base de datos 2</Link>
        </Stack>

      </Flex>

      <Divider my={4} />

      <Text fontSize="xs" textAlign="center" color="gray.600">
        © {new Date().getFullYear()} Gobierno de México. Todos los derechos reservados.
      </Text>
    </Box>
  );
}

