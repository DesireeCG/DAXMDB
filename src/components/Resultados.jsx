import { Box, Text, Button, Menu, MenuButton, MenuList, MenuItem, VStack, IconButton, ButtonGroup } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { ChevronDownIcon } from "@chakra-ui/icons";

const pageSize = 15;

export function Resultados({ datos }) {
    const { t } = useTranslation();
    const [paginaActual, setPaginaActual] = useState(1);
    const [filtroOrigen, setFiltroOrigen] = useState("Todos");


    // Reinicia a la primera página si llegan nuevos datos
    useEffect(() => {
        setPaginaActual(1);
    }, [datos, filtroOrigen]);

    // Filtrar todos los datos segun la opcion seleccionada
    const datosFiltrados =
        filtroOrigen === "Todos"
            ? datos
            : filtroOrigen === "PubChem"
                ? datos.filter((res) =>
                    res.url.toLowerCase().includes("pubchem")
                    )
                : datos.filter((res) =>
                    res.url.toLowerCase().includes("massbank")
                    );


    const totalPaginas   = Math.ceil(datosFiltrados.length / pageSize);
    const inicio         = (paginaActual - 1) * pageSize;
    const fin            = inicio + pageSize;
    const datosPaginados = datosFiltrados.slice(inicio, fin);


    const descargarTXT = () => {
        if (datos.length === 0) {
            alert("No hay datos para descargar");
            return;
        }

        let contenido = "Resultados de la búsqueda:\n\n";

        datos.forEach((res) => {
            contenido += `Nombre: ${res.name}\n`;
            contenido += `Fórmula: ${res.formula}\n`;
            contenido += `Masa Exacta: ${res.weight}\n`;
            contenido += `Enlace: ${res.url}\n\n`;
        });

        const blob = new Blob([contenido], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "resultados_busqueda.txt";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };

    return (
        <Box mt="6">
            <Box textAlign="right" mr="0%">
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mr={4}>
                        {t("Filtrar")}: {t(filtroOrigen.toLowerCase())}
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => setFiltroOrigen("Todos")}>Todos</MenuItem>
                        <MenuItem onClick={() => setFiltroOrigen("PubChem")}>PubChem</MenuItem>
                        <MenuItem onClick={() => setFiltroOrigen("MassBank")}>MassBank</MenuItem>
                    </MenuList>
                </Menu>
                <Button size="md" color="black" bgColor="#AEE239" onClick={descargarTXT}>
                    {t("descargar_txt")}
                </Button>
            </Box>

            {datosPaginados.map((res, index) => (
                <Box key={index} borderBottom="1px solid gray" pb="4" mb="4">
                    <Text fontSize="xl" fontWeight="bold">
                        {res.name}, <Text as="span" fontWeight="normal">{res.formula}</Text>
                    </Text>
                    <Text>{t("Masa_exacta")} {res.weight}</Text>
                    {res.url && (
                        <Text color="purple.500" mt="2">
                            <a href={res.url} target="_blank" rel="noopener noreferrer">
                                {res.url}
                            </a>
                        </Text>
                    )}
                    
                </Box>
                
            ))}
            <Text fontSize="md" color="gray.600" mt="4" mb="2">
                {t("Mostrando")}{" "}
                {datosFiltrados.length === 0
                    ? "0"
                    : `${inicio + 1}–${Math.min(fin, datosFiltrados.length)} ${t("de")} ${datosFiltrados.length}`}{" "}
                {t("resultados")}
                
            </Text>


            {/* Paginación */}
            {totalPaginas > 1 && (
                <VStack mt="4">
                    <ButtonGroup size="sm" variant="ghost">
                        <IconButton
                            icon={<HiChevronLeft />}
                            onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
                            isDisabled={paginaActual === 1}
                            aria-label="Anterior"
                        />
                        {[...Array(totalPaginas)].map((_, i) => (
                            <Button
                                key={i}
                                onClick={() => setPaginaActual(i + 1)}
                                variant={paginaActual === i + 1 ? "solid" : "ghost"}
                            >
                                {i + 1}
                            </Button>
                        ))}
                        <IconButton
                            icon={<HiChevronRight />}
                            onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
                            isDisabled={paginaActual === totalPaginas}
                            aria-label="Siguiente"
                        />
                    </ButtonGroup>
                </VStack>
            )}
            
        </Box>
        
    );
    
}
