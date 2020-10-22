import { ChakraProvider, CSSReset, Stack } from "@chakra-ui/core";
import React from "react";
import "./App.css";
import "focus-visible/dist/focus-visible";

import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <CSSReset />
        <Stack justify="space-between" spacing={0}>
          <Header />
          <Main />
          <Footer />
        </Stack>
      </ChakraProvider>
    </div>
  );
}

export default App;
