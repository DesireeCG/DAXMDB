import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Stack, Text, Divider, Link, Image } from "@chakra-ui/react";
import logoipn from "../img/logo-ipn-horizontal.svg";

export function PiePagina() {
  return (
    <Box bg="blue.100" px={10} py={6} mt={10}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        gap={6}
        wrap="wrap"
      >
        

        {/* Columna 2 */}
        <Stack spacing={2}>
          <Text fontWeight="bold" fontSize="sm">Contacto</Text>
          <Text fontSize="sm">Dr. Emmanuel Cabañas García</Text>
          <Text fontSize="sm">ecabanasg@ipn.mx</Text>
          <Text fontSize="sm">Dr. Mario César Ordóñez Gutiérrez</Text>
          <Text fontSize="sm">mordonezg@ipn.mx</Text>
          <Text fontSize="sm">Axel Giovanni Ojeda Hernandez</Text>
          <Text fontSize="sm">aojedah1800@alumno.ipn.mx</Text>
          <Text fontSize="sm">Desireé Castañeda García</Text>
          <Text fontSize="sm">dcastanedag2100@alumno.ipn.mx</Text>
        </Stack>

        {/* Columna 3 */}
        <Stack spacing={2} maxW="250px">
          <Text fontWeight="bold" fontSize="sm">Acerca de</Text>
          <Text fontSize="sm">
             Este proyecto no tiene fines de lucro. Está desarrollado con propósitos educativos y de investigación, dirigido principalmente a estudiantes, docentes e investigadores interesados en el análisis de compuestos químicos mediante espectrometría de masas. Toda la información presentada se obtiene de fuentes públicas y se utiliza exclusivamente con fines académicos.
          </Text>
        </Stack>

        {/* Columna 4 */}
        <Stack spacing={2}>
          <Text fontWeight="bold" fontSize="sm">Bases de Datos Utilizadas en el Proyecto</Text>
          <Link href="https://massbank.eu/MassBank/Search" fontSize="sm">MaskBank</Link>
          <Link href="https://hmdb.ca/" fontSize="sm">HMDB</Link>
          <Link href="https://pubchem.ncbi.nlm.nih.gov/" fontSize="sm">Pubchem</Link>
        </Stack>
      </Flex>

      <Divider my={4} />

      <Image src={logoipn} alt="Logo IPN" w="150px" mt={4} mx="auto" />
      
      <Text fontSize="xs" textAlign="center" color="gray.600">
        © {new Date().getFullYear()} 2025. Todos los derechos reservados.
      </Text>
    </Box>
  );
}

