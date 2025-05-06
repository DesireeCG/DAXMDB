import { useState } from "react";
import { Header } from "./components/Header";
import { Box } from "@chakra-ui/react";
import { TitleSection } from "./components/TitleSection";
import { Campos1 } from "./components/Campos1";
import { Campos2 } from "./components/Campos2";
import { Barraseparadora } from "./components/Barraseparadora";

export function App() {
  const [mostrarCampos2, setMostrarCampos2] = useState(true);

  return (
    <Box bg="#f8fdff" minHeight="100vh" >
      <Header />
      <TitleSection />
      {/* Pasamos la función que oculta Campos2 */}

      <Campos1 onBuscar={() => setMostrarCampos2(false)} />
      <Barraseparadora />
      {/* Solo muestra Campos2 si mostrarCampos2 es true */}
      {mostrarCampos2 && <Barraseparadora /> && <Campos2 />}
    </Box>
  );
}