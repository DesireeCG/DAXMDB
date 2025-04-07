import { Box, Center, Image, Text, Button, Spacer, Tag} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaBook,FaLanguage } from "react-icons/fa";

export function BookItem({ title, first_publish_year, edition_count, language, cover_i, cover_edition_key }) {
    const coverUrl = cover_i 
        ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` 
        : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

        return (
            <Box w="100%" p="4" display="flex" borderWidth="1px" borderRadius="lg">
                {/* Imagen principal del libro */}
                <Image src={coverUrl} width="100px" borderRadius="lg" />
    
                {/* Información del libro */}
                <Box display="flex" p="4" flexDirection="column">
                    <Text as="samp" fontSize="xl">{title}</Text>
                    
                    <Text color="teal">Año: {first_publish_year || "N/A"}</Text>
                    
    
                    {/* Botón de detalles */}
                    {cover_edition_key ? (
                        <Link to={`/book/${cover_edition_key}`}>
                            <Button colorScheme="blue" w="100px" mt="4">
                                Detalles
                            </Button>
                        </Link>
                    ) : (
                        <Text color="red.500" mt="4">No disponible</Text>
                    )}
                </Box>
                <Spacer />
                <Box>
                <Center><FaBook/><Tag m='1' p='2' colorScheme='green' fontSize='sm'>{edition_count}</Tag></Center>
                <Center><FaLanguage/> <Text m='1' >{language?.join(", ") || "N/A"}</Text></Center>
                </Box>
            </Box>
        );
}
