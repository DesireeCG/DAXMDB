import { useState } from "react";
import { Header } from "./components/Header";
import { Box } from "@chakra-ui/react";
import { TitleSection } from "./components/TitleSection";
import { Campos1 } from "./components/Campos1";
import { Campos2 } from "./components/Campos2";
import { PiePagina } from "./components/PiePagina";
import { Barraseparadora } from "./components/Barraseparadora";

export function App() {

  const [mostrarCampos2, setMostrarCampos2] = useState(true);
  const [mostrarCampos1, setMostrarCampos1] = useState(true);

  return (
    <Box bg="#f8fdff" minHeight="100vh">
  <Header />
  <TitleSection />

  {/* Campos1 solo si mostrarCampos1 es true */}
  {mostrarCampos1 && (
    <>
      <Campos1 onBuscar={() => setMostrarCampos2(false)} />
      <Barraseparadora />
    </>
  )}

  {/* Campos2 solo si mostrarCampos2 es true */}
  {mostrarCampos2 && (
    <>
      <Campos2 onBuscar={() => setMostrarCampos1(false)} />
      <Barraseparadora />
    </>
  )}

  <PiePagina />

</Box>

  );
}