import React, { useState } from "react";
import Select, { components } from "react-select";
import { Stack, Text, Image } from "@chakra-ui/core";

const currencies = require("../currency.json");

const currencyOptions = currencies.map((currency) => {
  return {
    value: currency.code,
    label: `${currency.code} - ${currency.name}`,
    flagUrl: `https://www.countryflags.io/${currency.countryCode}/flat/64.png`,
    currencyName: currency.name,
  };
});

const flag = (url, code) => {
  url = url.replace("64", "32"); //change the flag size from 64px to 32px
  return {
    alignItems: "center",
    display: "flex",

    ":before": {
      content: `url(${url})`,
      display: "block",
      marginRight: 10,
      height: "32px",
    },
  };
};

const SingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>
    <Stack isInline>
      <Image height="64px" src={props.data.flagUrl} />
      <Stack justify="center" align="baseline" spacing={0}>
        <Text lineHeight="100%" fontSize="2xl" fontWeight="700">
          {props.data.value}
        </Text>
        <Text lineHeight="100%" fontSize="md" fontWeight="500">
          {props.data.currencyName}
        </Text>
      </Stack>
    </Stack>
  </components.SingleValue>
);

const customStyles = {
  control: (styles) => ({
    ...styles,
    height: "3rem",
    backgroundColor: "white",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      ...flag(data.flagUrl, data.value),
    };
  },
  dropdownIndicator: (styles, { isFocused }) => {
    return {
      ...styles,
      opacity: isFocused ? 0.8 : 0.6, //focused? 80% opaque : 60%
      color: isFocused ? "#2B6CB0" : "#63B3ED", //focused? blue.600 : blue.300
      ":hover": { opacity: 1 }, //fully opaque on hover
    };
  },
  input: (styles) => ({ ...styles, fontSize: "1.4rem" }),
  placeholder: (styles) => ({ ...styles, fontSize: "1.4rem" }),
};

const CurrencySelect = ({ handleChange, defaultValue, ...rest }, ref) => {
  return (
    <Select
      ref={ref}
      className="basic-single"
      classNamePrefix="select"
      //set the default value according to the currency code passed in the initial query
      defaultValue={
        currencyOptions.filter((option) => option.value === defaultValue)[0]
      }
      options={currencyOptions}
      placeholder="Type to search..."
      styles={customStyles}
      components={{
        SingleValue,
        IndicatorSeparator: () => null,
      }}
      onChange={(selectedOption, { action }) => {
        selectedOption
          ? handleChange(selectedOption.value)
          : handleChange(null);
      }}
      {...rest}
    />
  );
};

const forwardCurrencySelect = React.forwardRef(CurrencySelect);

export default forwardCurrencySelect;
