import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Stack, Text, Divider, Link, Image } from "@chakra-ui/react";
import logoipn from "../img/logo-ipn-horizontal.svg";
import { useTranslation } from "react-i18next";


export function PiePagina() {

  const { t } = useTranslation(); // Función para traducir

  return (
    <Box bg="blue.100" px={'28'} py={6} mt={10}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        gap={6}
        wrap="wrap"
      >
        

        {/* Columna 1 */}
        <Stack spacing={2}>
          <Text fontWeight="bold" fontSize="sm">
            {t("contacto")}
          </Text>
          <Text fontSize="sm">Dr. Emmanuel Cabañas García</Text>
          <Text fontSize="sm">ecabanasg@ipn.mx</Text>
          <Text fontSize="sm">Dr. Mario César Ordóñez Gutiérrez</Text>
          <Text fontSize="sm">mordonezg@ipn.mx</Text>
          
        </Stack>

        {/* Columna 2 */}
        <Stack spacing={2} >
          <Text fontWeight="bold" fontSize="sm">
            {t("desarrolladores")}
          </Text>
          <Text fontSize="sm">Axel Giovanni Ojeda Hernandez</Text>
          <Text fontSize="sm">aojedah1800@alumno.ipn.mx</Text>
          <Text fontSize="sm">Desireé Castañeda García</Text>
          <Text fontSize="sm">dcastanedag2100@alumno.ipn.mx</Text>
        </Stack>

        {/* Columna 3 */}
        <Stack spacing={2}>
          <Text fontWeight="bold" fontSize="sm">
            {t("DB")}
          </Text>
          <Link href="https://massbank.eu/MassBank/Search" fontSize="sm">MaskBank</Link>
          <Link href="https://hmdb.ca/" fontSize="sm">HMDB</Link>
          <Link href="https://pubchem.ncbi.nlm.nih.gov/" fontSize="sm">Pubchem</Link>
        </Stack>
      </Flex>

      <Divider my={3} />

            
      <Text fontSize="xs" textAlign="center" color="gray.600">
        © {new Date().getFullYear()} Todos los derechos reservados.
      </Text>
    </Box>
  );
}

