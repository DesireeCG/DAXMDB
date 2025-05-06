//const URL1 = "https://backend-fincher.onrender.com/massbank/search/";
const URL = "https://daxmdb.onrender.com/buscar";

export async function getCompuestos({ formula = "", masa = "", nombre = "", limit = 100 }) {
    try {
      const queryParams = new URLSearchParams();
      if (formula) queryParams.append("formula", formula);
      if (masa)    queryParams.append("peso",    masa);
      if (nombre)  queryParams.append("nombre",  nombre);
      queryParams.append("limit", limit);
  
      const response = await fetch(`${URL}?${queryParams.toString()}`);
      if (!response.ok) throw new Error("Error al obtener datos");
  
      const data = await response.json();
      console.log("Datos crudos de la API:", data);
  
      //  si 'data' es un array, devuélvelo,
      //    si no, intenta devolver data.compuestos
      const compuestos = Array.isArray(data)
        ? data
        : data.compuestos || [];
  
      console.log("Compuestos finales:", compuestos);
      return compuestos;
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      return [];
    }
  }