import { useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Input, IconButton, Text, Button, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Resultados } from "./Resultados"
import { Barraseparadora } from "./Barraseparadora";
import { useTranslation } from "react-i18next";




export function Campos2() {
    
    const { t } = useTranslation(); //función para traducir

    const [parametros, setParametros] = useState([{ mz: "", abundancia: "" }]);
    const [threshold, setThreshold] = useState("0.01");
    const [resultados, setResultados] = useState([]);
    
    // Función para agregar una nueva fila
    const agregarFila = () => {
        setParametros([...parametros, { formula: "", mz: "", abundancia: "" }]);
    };
   
    // Función para manejar cambios en los inputs
    const handleChange = (index, field, value) => {
        const newParametros = [...parametros];
        newParametros[index][field] = value;
        setParametros(newParametros);
    };

     // Función para filtrar los resultados basados en la entrada del usuario
    // Realizar búsqueda por similitud
    const handleSearch = async () => {
        const peakList = parametros
        .filter(p => p.mz && p.abundancia)
        .map(p => `${p.mz};${p.abundancia}`)
        .join(",");

        if (!peakList) {
        console.warn("No hay datos válidos para la búsqueda.");
        return;
        }

        const resultadosSimilares = await buscarSimilitudMatchMS(peakList, threshold);
        setResultados(resultadosSimilares);
    };
    // Llamada a la API matchMS
    const buscarSimilitudMatchMS = async (peakList, threshold) => {
        const queryParams = new URLSearchParams({
        peak_list: peakList,
        peak_list_threshold: threshold,
    });
      
    try {
        const response = await fetch(
          `https://msbi.ipb-halle.de/MassBank3-api/v1/records/search?${queryParams.toString()}`
        );
        if (!response.ok) throw new Error("Error en la búsqueda de similitud");
        const data = await response.json();
        console.log("Resultados por similitud:", data);
        return data.records || [];
      } catch (error) {
        console.error("Error:", error);
        return [];
      }
    };

    return (
        <Box ml="10%" mr="10%" mt="20px">
            {/* Título y botón de búsqueda */}
            <Flex gap="4">
                <Text fontSize="1.5rem" fontWeight="normal" color="gray.900" opacity="0.6">
                    {t("Instrucciones_2")}
                </Text>
                <Box marginLeft="3%">
                    <Button bgColor="#7FE8F1" w="200px" onClick={handleSearch}>
                        {t("buscar")}
                    </Button>
                </Box>
            </Flex>

            {/* Tabla */}
            <Box overflowX="auto" rounded="3xl" mt="5">
                <Table variant="unstyled">
                    <Thead>
                        <Tr bg="cyan.200">
                            <Th textColor="gray.900" textAlign="center">m/z</Th>
                            <Th textColor="gray.900" textAlign="center">{t("Abundancia")}</Th>
                        </Tr>
                    </Thead>
                    {/* Se agrega maxHeight y overflow para hacer scroll vertical si es necesario */}
                    <Tbody style={{ maxHeight: "300px" }} bg="gray.200" opacity="0.7">
                        {parametros.map((fila, index) => (
                                <Tr key={index} >
                                
                                <Td>
                                    <Input 
                                        margin="-0.5"
                                        placeholder="Ej. 256.24" 
                                        bg="white.600"
                                        value={fila.mz} 
                                        onChange={(e) => handleChange(index, "mz", e.target.value)} 
                                    />
                                </Td>
                                <Td>
                                    <Input 
                                        bg="white.600"
                                        placeholder="Ej. 0.85" 
                                        value={fila.abundancia} 
                                        onChange={(e) => handleChange(index, "abundancia", e.target.value)} 
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
                    colorScheme="teal" 
                    opacity="0.6"
                    aria-label="Agregar fila" 
                    onClick={agregarFila}
                    borderRadius="full"
                    size="lg"
                />
            </Box>

            {/* Resultados */}
            {resultados.length > 0 ? (
                
                <Resultados datos={resultados} />
            ) : (
                <Text mt="6" color="gray.800">{t("No_resultados")}</Text>
            )}
            </Box>
        
    );
}
