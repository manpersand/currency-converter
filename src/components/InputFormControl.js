import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/core";

const InputFormControl = ({ label, ...rest }) => {
  return (
    <FormControl>
      <FormLabel
        display={["none", "none", "none", "initial"]}
        fontSize="2rem"
        color="white"
      >
        {label}
      </FormLabel>
      <Input size="lg" fontSize="2rem" backgroundColor="white" {...rest} />
    </FormControl>
  );
};

export default InputFormControl;
