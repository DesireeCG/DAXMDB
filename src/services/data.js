const URL = "https://backend-fincher.onrender.com/massbank/search/";

export async function getCompuestos({ formula = "", masa = "", nombre = "", mass_tolerance = 0.00001, limit = 100 }) {
    try {
        const queryParams = new URLSearchParams();

        if (formula) queryParams.append("formula", formula);
        if (masa) queryParams.append("exact_mass", masa); // Cambia "masa" por "exact_mass"
        if (nombre) queryParams.append("compound_name", nombre); // Cambia "nombre" por "compound_name"
        queryParams.append("mass_tolerance", mass_tolerance);
        queryParams.append("limit", limit);

        const response = await fetch(`${URL}?${queryParams.toString()}`);
        if (!response.ok) throw new Error("Error al obtener datos");

        const data = await response.json();
        console.log("Datos recibidos de la API:", data); // Agrega este console.log para depuración
        return data.compuestos || []; 
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        return [];
    }
}
