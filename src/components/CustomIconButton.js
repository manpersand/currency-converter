import React from "react";
import { IconButton, Tooltip } from "@chakra-ui/core";

const CustomIconButton = ({ tooltipLabel, icon, ariaLabel, type, ...rest }) => {
  return (
    <Tooltip
      bg="white"
      color="blue.600"
      openDelay={700}
      hasArrow
      label={tooltipLabel}
    >
      <IconButton
        size="lg"
        icon={icon}
        alignSelf={{ base: "center", lg: "flex-end" }}
        aria-label={ariaLabel}
        fontSize="3rem"
        type={type}
        _hover={{
          color: "white",
          backgroundColor: "blue.600",
        }}
        _active={{
          color: "white",
          backgroundColor: "blue.600",
        }}
        {...rest}
      />
    </Tooltip>
  );
};

export default CustomIconButton;
