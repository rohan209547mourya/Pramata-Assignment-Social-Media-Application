import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { GlobalProvider } from './context/GlobalContext';
import App from './App';
import './index.css';
import theme from './theme';

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'rgb(24, 22, 22)', // set your custom color here
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={customTheme}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
