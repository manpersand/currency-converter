import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/core";

const InputFormControl = ({ value, onChange, label }) => {
  return (
    <FormControl>
      <FormLabel
        display={["none", "none", "none", "initial"]}
        fontSize="2rem"
        color="white"
      >
        {label}
      </FormLabel>
      <Input
        onChange={onChange}
        size="lg"
        fontSize="2rem"
        backgroundColor="white"
        value={value}
      />
    </FormControl>
  );
};

export default InputFormControl;
