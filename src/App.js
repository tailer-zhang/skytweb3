import Home from "./pages/index"
import { ChakraProvider } from "@chakra-ui/react"
import React, {useEffect, useState} from "react";
import { IntlProvider } from 'react-intl';
import localMessages from './locale/index';

function App() {
    const [currentLocale, setCurrentLocale] = useState('en-US');
    const handlelanguage = function (value) {
        setCurrentLocale(value)
    }
  return (
      <IntlProvider locale={currentLocale} messages={localMessages[currentLocale]}>
          <ChakraProvider>
              <Home
                  handlelanguage={handlelanguage}
              />
          </ChakraProvider>
      </IntlProvider>
  );
}

export default App;
