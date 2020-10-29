import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/core";

import CurrencySelect from "./CurrencySelect";

const CurrencySelectFormControl = ({ label, ...rest }, ref) => {
  return (
    <FormControl>
      <FormLabel
        display={["none", "none", "none", "initial"]}
        fontSize="2rem"
        color="white"
      >
        {label}
      </FormLabel>
      <CurrencySelect ref={ref} {...rest} />
    </FormControl>
  );
};

const forwardCurrencySelectFormControl = React.forwardRef(
  CurrencySelectFormControl
);

export default forwardCurrencySelectFormControl;
