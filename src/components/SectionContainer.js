import React from "react";
import { Flex } from "@chakra-ui/core";

const SectionContainer = ({ children }) => {
  return <Flex direction="column">{children}</Flex>;
};

export default SectionContainer;
