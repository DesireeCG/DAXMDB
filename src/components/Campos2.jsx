import { useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Input, IconButton, Text, Button, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Resultados } from "./Resultados"
import { Barraseparadora } from "./Barraseparadora";


// Simulación de una base de datos de compuestos
const BASE_DATOS_SIMULADA = [
    { nombreComun: "Sacarosa", formula: "C12H22O11", mz: "256.24", abundancia: "0.85", enlace: "www.PaginadDeBaseDatos.com" },
    { nombreComun: "Alcohol etílico", formula: "C2H5OH", mz: "205.63", abundancia: "0.92", enlace: "www.PaginadDeBaseDatos.com" },
    { nombreComun: "Glucosa", formula: "C6H12O6", mz: "180.16", abundancia: "0.80", enlace: "www.PaginadDeBaseDatos.com" },
    { nombreComun: "TEQUILA", formula: "C2H5OH", mz: "205.63", abundancia: "0.92", enlace: "www.PaginadDeBaseDatos.com" },
    { nombreComun: "GORDA", formula: "C6H12O6", mz: "180.16", abundancia: "0.80", enlace: "www.PaginadDeBaseDatos.com" },
    { nombreComun: "Aspirin", formula: "C9H8O4", mz: "180.04", abundancia: "0.92", enlace: "www.PaginadDeBaseDatos.com" },
];

export function Campos2() {
    const [parametros, setParametros] = useState([
        {  mz: "", abundancia: "" } // Fila inicial vacía
    ]);

    // Función para agregar una nueva fila
    const agregarFila = () => {
        setParametros([...parametros, { formula: "", mz: "", abundancia: "" }]);
    };
    const [resultados, setResultados] = useState([]); // Estado para almacenar los resultados

    // Función para manejar cambios en los inputs
    const handleChange = (index, field, value) => {
        const newParametros = [...parametros];
        newParametros[index][field] = value;
        setParametros(newParametros);
    };

     // Función para filtrar los resultados basados en la entrada del usuario
    const handleSearch = () => {
        // Filtramos los compuestos que coincidan con al menos un parámetro ingresado
        const nuevosResultados = BASE_DATOS_SIMULADA.filter(compuesto =>
            parametros.some(param =>
                (param.mz && compuesto.mz.includes(param.mz)) ||
                (param.abundancia && compuesto.abundancia.includes(param.abundancia))
            )
        );

        setResultados(nuevosResultados);
    };

    return (
        <Box ml="10%" mr="10%" mt="20px">
            {/* Título y botón de búsqueda */}
            <Flex gap="4">
                <Text fontSize="1.5rem" fontWeight="normal" color="gray.600" opacity="0.6">
                    Rellena los siguientes campos si deseas una búsqueda más precisa:
                </Text>
                <Box marginLeft="3%">
                    <Button bgColor="#7FE8F1" w="200px" onClick={handleSearch}>
                        Buscar
                    </Button>
                </Box>
            </Flex>

            {/* Tabla */}
            <Box overflowX="auto" rounded="3xl" mt="5">
                <Table variant="unstyled">
                    <Thead>
                        <Tr bg="cyan.200">
                            <Th textColor="gray.900" textAlign="center">m/z</Th>
                            <Th textColor="gray.900" textAlign="center">Abundancia</Th>
                        </Tr>
                    </Thead>
                    {/* Se agrega maxHeight y overflow para hacer scroll vertical si es necesario */}
                    <Tbody style={{ maxHeight: "300px" }} bg="gray.50" opacity="0.7">
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
            

            {/* Botón para agregar más filas */}
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
            

             {/* Resultados de la búsqueda */}
             {resultados.length > 0 ? (
                <Resultados datos={resultados} />
            ) : (
                <Text mt="6" color="gray.500">No se encontraron resultados</Text>
            )}
        </Box>
        
    );
}
