import { useParams } from "react-router-dom";
import * as API from '../services/data1';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Image, Center, Text } from '@chakra-ui/react';

export function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        API.getBooks(id)
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setBook(data[0]);
                } else {
                    setBook(null);
                }
                setLoading(false);
            })
            .catch(() => {
                setBook(null);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (!book) return <p>Libro no encontrado.</p>;

    const coverUrl = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

    // Link de lectura si está disponible
    const readLink = book.ia_collection_s ? `https://openlibrary.org/books/${id}` : null;

    
     return (
        <Box mt="50">
            <Box mt="6" borderWidth="1px" borderRadius="lg" p="6">
                <Flex mb="2">
                    <Box w="20%" color="gray.400">Título:</Box>
                    <Box w="80%" color="gray.400">{book.title}</Box>
                </Flex>
                <Flex mb="2">
                    <Box w="20%" color="gray.400">Autor:</Box>
                    <Box w="80%" color="gray.400">{book.author_name?.join(", ") || "Desconocido"}</Box>
                </Flex>
                <Flex mb="2">
                    <Box w="20%" color="gray.400">Fecha de publicación:</Box>
                    <Box w="80%" color="gray.400">{book.first_publish_year || "No disponible"}</Box>
                </Flex>
                <Flex mb="2">
                    <Box w="20%" color="gray.400">Ediciones:</Box>
                    <Box w="80%" color="gray.400">{book.edition_count || "No disponible"}</Box>
                </Flex>
                <Flex mb="2">
                    <Box w="20%" color="gray.400">Colección:</Box>
                    <Box w="80%" color="gray.400">{book.ia_collection_s || "No disponible"}</Box>
                </Flex>
                <Flex mb="2">
                    <Box w="20%" color="gray.400">Idioma:</Box>
                    <Box w="80%" color="gray.400">{book.language ? book.language.join(", ") : 'No disponible'}</Box>
                </Flex>

                <Center>
                    <Image src={coverUrl} width="300px" borderRadius="lg" mt="6" />
                </Center>

                <Flex mt="4">
                    <Box w="20%" color="gray.400">Leer en línea:</Box>
                    <Box w="80%" color="gray.400">
                        {readLink ? (
                            <Text>
                                <strong>Disponible:</strong>{" "}
                                <a href={readLink} target="_blank" rel="noopener noreferrer" style={{ color: "#2B6CB0" }}>
                                    Haz clic aquí
                                </a>
                            </Text>
                        ) : (
                            <Text><strong>No disponible</strong></Text>
                        )}
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}