import { Box, Text, Button } from "@chakra-ui/react";

export function ResultadosSimples({ datos }) {
    // Función para descargar los resultados en un archivo .txt
    const descargarTXT = () => {
        if (datos.length === 0) {
            alert("No hay datos para descargar");
            return;
        }

        let contenido = "Resultados de la búsqueda:\n\n";

        datos.forEach((res, index) => {
            contenido += `Nombre: ${res.nombre}\n`;
            contenido += `Fórmula: ${res.formula}\n`;
            contenido += `Masa Exacta: ${res.masa_exacta}\n`;
            contenido += `Enlace: ${res.url}\n\n`;
        });

        // Crear un Blob con el contenido del archivo
        const blob = new Blob([contenido], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        // Crear un enlace de descarga
        const link = document.createElement("a");
        link.href = url;
        link.download = "resultados_busqueda.txt";
        document.body.appendChild(link);
        link.click();

        // Limpiar el objeto URL
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };

    return (
        <Box mt="6">
            {/* Botón de descarga */}
            <Box mb="8">
                <Button colorScheme="green" variant="solid" onClick={descargarTXT}>
                    Descargar TXT
                </Button>
            </Box>

            {/* Mostrar los resultados */}
            {datos.map((res, index) => (
                <Box key={index} borderBottom="1px solid gray" pb="4" mb="4">
                    <Text fontSize="xl" fontWeight="bold">
                        {res.nombre}, <Text as="span" fontWeight="normal">{res.formula}</Text>
                    </Text>
                    <Text>Masa Exacta: {res.masa_exacta}</Text>
                    <Text color="purple.500" mt="2">
                        <a href={res.url} target="_blank" rel="noopener noreferrer">
                            {res.url}
                        </a>
                    </Text>
                </Box>
            ))}
        </Box>
    );
}
