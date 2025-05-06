import { Box, Text, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function Resultados({ datos }) {

    const { t } = useTranslation();

    const descargarTXT = () => {
        if (datos.length === 0) {
            alert("No hay datos para descargar");
            return;
        }

        let contenido = "Resultados de la búsqueda:\n\n";

        datos.forEach((res, index) => {
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
                <Button size="md" color="black" bgColor="#AEE239" onClick={descargarTXT}>
                    {t("descargar_txt")}
                </Button>
            </Box>

            {datos.map((res, index) => (
            <Box key={index} borderBottom="1px solid gray" pb="4" mb="4">
                <Text fontSize="xl" fontWeight="bold">
                    {res.name}, <Text as="span" fontWeight="normal">{res.formula}</Text>
                </Text>
                <Text>{t("Masa_exacta")} {res.weight}</Text>
                {res.url && ( // Solo muestra si existe res.url
                    <Text color="purple.500" mt="2">
                        <a href={res.url} target="_blank" rel="noopener noreferrer">
                            {res.url}
                        </a>
                    </Text>
            )}
            </Box>
            ))}

        </Box>
    );
}