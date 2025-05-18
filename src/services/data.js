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


const URL_SIMILITUD = "https://daxmdb.onrender.com/buscar_massbank_picos";

export async function getSimilitud(parametros = [], threshold = 0.01) {
  try {
    // 1) Construye el peak_list sólo con filas válidas
    const peakList = parametros
      .filter((p) => p.mz && p.abundancia)
      .map((p) => `${p.mz};${p.abundancia}`)
      .join(",");

    if (!peakList) {
      console.warn("No hay datos para buscar similitud");
      return [];
    }

    // 2) Prepara los parámetros de consulta, incluyendo threshold
    const queryParams = new URLSearchParams();
    queryParams.append("peak_list", peakList);
    queryParams.append("peak_list_threshold", threshold.toString());

    // 3) Para depuración, mira la URL completa:
    console.log("Fetching:", `${URL_SIMILITUD}?${queryParams.toString()}`);

    // 4) Llamada a la API
    const response = await fetch(`${URL_SIMILITUD}?${queryParams.toString()}`);
    if (!response.ok) throw new Error("Error en la búsqueda de similitud");

    const data = await response.json();
    console.log("Respuesta de similitud:", data);

    // 5) Normaliza la respuesta
    const resultados = Array.isArray(data)
      ? data
      : data.records
        ? data.records
        : data.compuestos || [];

    return resultados;
  } catch (error) {
    console.error("Error en getSimilitud:", error);
    return [];
  }
}
