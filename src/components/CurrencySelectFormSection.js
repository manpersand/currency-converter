import React, { useRef } from "react";
import { FormControl, FormLabel } from "@chakra-ui/core";
import { MdSwapHoriz } from "react-icons/md";

import CurrencySelect from "./CurrencySelect";
import CustomIconButton from "./CustomIconButton";

const CurrencySelectFormSection = ({ query, setQuery, initialQuery }) => {
  const fromRef = useRef();
  const toRef = useRef();

  const handleSwap = (e) => {
    e.preventDefault();
    const to = toRef.current.state.value;
    const from = fromRef.current.state.value;
    toRef.current.select.setValue(from);
    fromRef.current.select.setValue(to);
    //for some reason the first ref called for selectOption does not change the query value
    //as a temporary fix manually changing the query value here
    setQuery({
      amount: query.amount,
      from: to.value,
      to: from.value,
      date: query.date,
    });
  };

  return (
    <React.Fragment>
      <CurrencySelectFormControl
        handleChange={(value) => {
          setQuery({
            amount: query.amount,
            to: query.to,
            from: value,
            date: query.date,
          });
        }}
        label="From"
        defaultValue={initialQuery.from}
        ref={fromRef}
      />
      <CustomIconButton
        tooltipLabel="Swap Currencies"
        type="button"
        icon={<MdSwapHoriz />}
        transform={{ base: "rotate(90deg)", lg: "rotate(0)" }}
        color="white"
        variant="ghost"
        onClick={handleSwap}
      />
      <CurrencySelectFormControl
        handleChange={(value) => {
          setQuery({
            amount: query.amount,
            from: query.from,
            to: value,
            date: query.date,
          });
        }}
        label="To"
        defaultValue={initialQuery.to}
        ref={toRef}
      />
    </React.Fragment>
  );
};

export default CurrencySelectFormSection;

const CurrencySelectFormControl = React.forwardRef(
  ({ label, ...rest }, ref) => {
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
  }
);
