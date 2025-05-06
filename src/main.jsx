import { createRoot } from 'react-dom/client'
import {App} from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import React from "react"; // <-- Importación necesaria
import { BrowserRouter } from 'react-router-dom';
import i18n from './i18n.js';
import { I18nextProvider } from 'react-i18next';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ChakraProvider>
          <BrowserRouter>  
            <App />
          </BrowserRouter>
      </ChakraProvider>
    </I18nextProvider>
  </React.StrictMode>
)