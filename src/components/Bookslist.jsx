import { useEffect, useState } from "react";
import * as API from "../services/data"; 
import { BookItem } from "./BookItem";
import { Flex } from "@chakra-ui/react";

export function BooksList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        API.getBooks().then(setBooks);
    }, []); // Se ejecuta solo una vez al montar el componente

    return (
        <>
            <section>
                <Flex direction='column'>
                    {books.map(book => {
                    const { key, ...bookProps } = book; // Extraer "key" del objeto
                    return <BookItem key={key} {...bookProps} />;
                    })}
                </Flex>
            </section>
           
    </>
    );
}
