import { useState, useEffect } from "react";
import {
  Box, Table, Thead, Tbody, Tr, Th,Td, Input,IconButton,Text, Button, Flex, VStack, Spinner, Stack, Heading, Highlight,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Resultados } from "./Resultados";
import { useTranslation } from "react-i18next";
import { getSimilitud } from "../services/data";

export function Campos2({ onBuscar }) {
  const { t } = useTranslation();

  const [parametros, setParametros] = useState([{ mz: "", intensidad: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const [resultados, setResultados] = useState([]);

  // Agregar nueva fila
  const agregarFila = () => {
    setParametros((prev) => [...prev, { mz: "", intensidad: "" }]);
  };

  // Actualizar mz o intensidad
  const handleChange = (index, field, value) => {
    setParametros((prev) => {
      const next = [...prev];
      next[index][field] = value;
      return next;
    });
  };

  // Ejecutar búsqueda de similitud
  const handleSearch = async () => {
    setIsLoading(true);
    console.log("Buscando con parámetros:", parametros);

    const sims = await getSimilitud(parametros);
    console.log("Resultados encontrados:", sims);

    setResultados(sims);
    setIsLoading(false);
  };

  // Llamar onBuscar al llegar resultados
  useEffect(() => {
    if (resultados.length > 0 && onBuscar) {
      onBuscar();
    }
  }, [resultados, onBuscar]);

  return (
    <Box ml="10%" mr="10%" mt="20px">
      {/* Título y botón de búsqueda */}
      <Flex gap="4" margin="10" align="center">
        <Text fontSize="1.5rem" fontWeight="normal" color="gray.900" opacity="0.6">
          {t("Instrucciones_2")}
        </Text>
        <Button bgColor="#7FE8F1" w="200px" onClick={handleSearch}>
          {t("buscar")}
        </Button>
      </Flex>

      {/* Tabla de entrada */}
      <Box overflowX="auto" rounded="3xl">
        <Table variant="unstyled">
          <Thead>
            <Tr bg="cyan.200">
              <Th textAlign="center">
                <Text fontStyle="italic">m/z</Text>
              </Th>
              <Th textAlign="center">{t("Intensidad")}</Th>
            </Tr>
          </Thead>
          <Tbody maxH="300px" overflowY="auto" bg="gray.200" opacity="0.7">
            {parametros.map((fila, idx) => (
              <Tr key={idx}>
                <Td>
                  <Input
                    bg="gray.50"
                    placeholder={t("placeholder_mz")}
                    value={fila.mz}
                    onChange={(e) => handleChange(idx, "mz", e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    bg="gray.50"
                    placeholder={t("placeholder_intensidad")}
                    value={fila.intensidad}
                    onChange={(e) => handleChange(idx, "intensidad", e.target.value)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Botón agregar fila */}
      <Box display="flex" justifyContent="center" mt="4">
        <IconButton
          icon={<AddIcon />}
          aria-label={t("agregar_fila")}
          onClick={agregarFila}
          colorScheme="teal"
          size="lg"
          borderRadius="full"
        />
      </Box>

      

      {/* Mostrar carga, número de resultados y listado */}
      {isLoading ? (
        <VStack mt="6" spacing="4" align="center">
          <Spinner color="teal.600" size="xl" />
          <Text color="teal.600">{t("cargando")}</Text>
        </VStack>
      ) : resultados.length > 0 ? (
        <>
          <Stack mt="10">
            <Heading size="lg" letterSpacing="tight">
              <Highlight
                query={[String(resultados.length)]}
                styles={{ color: "teal.600" }}
              >
                {t("numero_resultados", { count: resultados.length })}
              </Highlight>
            </Heading>
          </Stack>
          <Resultados datos={resultados} />
        </>
      ) : (
        <Text mt="6" color="gray.500">
          
        </Text>
      )}
    </Box>
  );
}
