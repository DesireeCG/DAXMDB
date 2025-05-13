import { Box, Flex, Text, Button, Input, Spinner, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Resultados } from "./Resultados";
import { getCompuestos } from "../services/data";
import { useTranslation } from "react-i18next";

export function Campos1({ onBuscar }) {

    const { t } = useTranslation(); //función para traducir

    const [formula, setFormula] = useState("");
    const [masa, setMasa] = useState("");
    const [nombre, setNombre] = useState("");
    const [resultados, setResultados] = useState([]); // ✅ Solo un useState
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);
        console.log("Buscando con:", { formula, masa, nombre });

        const compuestos = await getCompuestos({ formula, masa, nombre });
        console.log("Resultados encontrados:", compuestos);

        setResultados(compuestos);
        setIsLoading(false);
    };
    

    // ✅ Ejecutar `onBuscar()` solo cuando `resultados` cambie
    useEffect(() => {
        if (resultados.length > 0) {
            onBuscar();
        }
    }, [resultados]);

    return (
        <Box ml="10%" mr="15%" mt="20px">
            <Flex gap="4">
                <Text fontSize="1.5rem" fontWeight="normal" color="gray.900" opacity="0.6">
                    {t("Instrucciones")}
                </Text>
                <Box marginLeft="9%">
                    
                    <Button bgColor="#7FE8F1" w="200px" onClick={handleSearch}>
                        {t("buscar")}
                    </Button>
                </Box>
            </Flex>

            {/* Campos de entrada */}
            <Flex mt="4" gap="4" align="center">
                <Flex align="center">
                    <Text marginLeft="10%" fontWeight="bold" mr="2" fontSize="xl">{t("formula")}</Text>
                    <Input bg="white" placeholder="Ej. C6H12O6" w="202px" value={formula} onChange={(e) => setFormula(e.target.value)} />
                </Flex>

                <Flex align="center">
                    <Text fontWeight="bold" mr="2" fontSize="xl">{t("masa")}</Text>
                    <Input placeholder="Ej. 256.24" w="202px" bg="white" value={masa} onChange={(e) => setMasa(e.target.value)} />
                </Flex>

                <Flex align="center">
                    <Text fontWeight="bold" mr="2" fontSize="xl">{t("nombre_comun")}</Text>
                    <Input placeholder="Ej. Glucosa" w="202px" bg="white" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </Flex>
            </Flex>

            {/* Mostrar carga o resultados */}
            {isLoading ? (
                <VStack mt="6" spacing="4" align="center">
                    <Spinner color="teal.600" size="xl" />
                    <Text color="teal.600">{t("Cargando")}</Text>
                </VStack>
            ) : (
                resultados.length > 0 ? (
                    <>
                        <Text mt="6" fontWeight="bold" color="gray.700">
                            {t("numero_resultados", { count: resultados.length })}
                        </Text>
                        <Resultados datos={resultados} />
                    </>
                    
                ) : (
                    resultados.length > 0 (
                         <Text mt="6" color="gray.500">{t("No_resultados")}</Text>
                    )
                   
                )
            )}
        </Box>
    );
}
