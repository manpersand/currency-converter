import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/core";

import CurrencySelect from "./CurrencySelect";

const CurrencySelectFormControl = ({ defaultValue, handleChange, label }) => {
  return (
    <FormControl>
      <FormLabel
        display={["none", "none", "none", "initial"]}
        fontSize="2rem"
        color="white"
      >
        {label}
      </FormLabel>
      <CurrencySelect defaultValue={defaultValue} handleChange={handleChange} />
    </FormControl>
  );
};

export default CurrencySelectFormControl;
