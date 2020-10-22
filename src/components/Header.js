import React from "react";
import { Flex, Heading } from "@chakra-ui/core";

const Header = () => {
  return (
    <Flex
      justify="center"
      align="center"
      w="100%"
      h="100px"
      backgroundColor="white"
      color="blue.600"
    >
      <Heading size="2xl">Currency Converter</Heading>
    </Flex>
  );
};

export default Header;
