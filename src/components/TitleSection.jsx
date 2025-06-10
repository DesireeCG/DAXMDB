import { Box, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function TitleSection() {
    const { t } = useTranslation(); // Función para traducir

    return (
        <Box ml="10%" mr="10%" mt="10px" opacity="0.9">
            <Text fontSize="5xl" fontWeight="bold">
                {t("titulo_buscador")}
            </Text>

            <Accordion allowMultiple defaultIndex={[0]} mt={4}>
                {items.map((item, index) => (
                    <AccordionItem key={index}>
                        <AccordionButton>
                            <Box flex="1" textAlign="left" fontWeight="semibold">
                                {item.title}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            {item.text}
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
}

const items = [
    {
        title: "More",
        text: "Este sitio web es una herramienta de búsqueda y comparación de espectros de masas orientada a estudiantes, investigadores y docentes que trabajan con espectrometría de masas en el área de química, bioquímica o ciencias afines. No tiene fines de lucro y fue desarrollado con fines educativos."
    }
];
