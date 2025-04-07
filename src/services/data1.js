const URL = "https://openlibrary.org/search.json";

export async function getBooks(query = "test", limit = 100) {
  try {
    const response = await fetch(`${URL}?q=${encodeURIComponent(query)}&limit=${limit}`);
    if (!response.ok) throw new Error("Error al obtener los libros");
    
    const data = await response.json();
    return data.docs || []; // Devolver solo los documentos de libros
  } catch (error) {
    console.error("Error en getBooks:", error);
    return [];
  }
}

// ✅ Función corregida para obtener detalles de un libro
export async function getBookDetail(id) {
  try {
    if (!id) throw new Error("ID del libro no proporcionado");

    // Open Library usa "/works/" o "/books/" para detalles
    const response = await fetch(`https://openlibrary.org/works/${id}.json`);
    
    if (!response.ok) throw new Error("Error al obtener detalles del libro");

    return await response.json();
  } catch (error) {
    console.error("Error en getBookDetail:", error);
    return null;
  }
}
