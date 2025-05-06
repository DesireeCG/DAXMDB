import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Spacer, Button, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function TitleSection() {

    const { t } = useTranslation(); //función para traducir

    return (
        <Box ml="10%" mr="10%" mt="10px"  color="#FFFFF" opacity="0.9">
            <Text fontSize="5xl" fontWeight="bold">
                {t("titulo_buscador")}
            </Text>
        </Box>
    );
}