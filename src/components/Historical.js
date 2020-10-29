import React, { useEffect, useRef, useState } from "react";
import { Spinner, Stack, Text, Alert, AlertIcon } from "@chakra-ui/core";
import { MdSwapHoriz, MdNavigateNext } from "react-icons/md";

import CustomIconButton from "./CustomIconButton";
import InputFormControl from "./InputFormControl";
import CurrencySelectFormControl from "./CurrencySelectFormControl";

const formStyle = {
  width: "100%",
};

const Historical = ({ initialQuery }) => {
  const [query, setQuery] = useState({
    amount: 1,
    from: null,
    to: null,
  });
  const [currency, setCurrency] = useState({
    amount: null,
    from: { code: null, rate: null },
    to: { code: null, rate: null },
    date: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fromRef = useRef();
  const toRef = useRef();

  const getHistoricalCurrency = async (query) => {
    //if the amount entered by user is NaN set it to 1
    const amount =
      query.amount === null || isNaN(query.amount) ? 1 : Number(query.amount);
    setQuery({ amount: amount, from: query.from, to: query.to });
    setError(false);
    setLoading(true);
    console.log("Get call", query);
    try {
      const apiResp = await fetch(
        `https://api.exchangeratesapi.io/Historical?base=${query["from"]}`
      );
      const respJSON = await apiResp.json();
      setCurrency({
        amount: amount,
        from: { code: respJSON.base, rate: 1 / respJSON.rates[query.to] }, //the inverse of the requested rate (to show both rates)
        to: { code: query.to, rate: respJSON.rates[query.to] }, //the actual rate
        date: respJSON.date,
      });
      // console.log(currency);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getHistoricalCurrency(initialQuery);
  }, [initialQuery]);

  const handleSwap = (e) => {
    e.preventDefault();
    const to = toRef.current.state.value;
    const from = fromRef.current.state.value;
    toRef.current.select.selectOption(from);
    fromRef.current.select.selectOption(to);
    //for some reason the first ref called for selectOption does not change the query value
    //as a temporary fix manually changing the query value here
    setQuery({ amount: query.amount, from: to.value, to: from.value });
  };

  return (
    <Stack paddingTop="10">
      <form
        style={formStyle}
        onSubmit={(e) => {
          e.preventDefault();
          getHistoricalCurrency(query);
        }}
      >
        <Stack
          direction={["column", "column", "column", "row"]}
          spacing={{ base: 4, lg: 2 }}
        >
          <InputFormControl
            onChange={(e) => {
              setQuery({
                amount: e.target.value,
                from: query.from,
                to: query.to,
              });
            }}
            value={query.amount}
            label="Amount"
          />
          <CurrencySelectFormControl
            handleChange={(value) => {
              console.log("from:", value);
              setQuery({ amount: query.amount, to: query.to, from: value });
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
              console.log("to:", value);
              setQuery({ amount: query.amount, from: query.from, to: value });
            }}
            label="To"
            defaultValue={initialQuery.to}
            ref={toRef}
          />
          <CustomIconButton
            tooltipLabel="Get Results"
            type="submit"
            icon={<MdNavigateNext />}
            width={{ base: "100%", lg: "auto" }}
            color="blue.600"
            bg="white"
            variant="outline"
          />
        </Stack>
      </form>
      <Stack
        height={{ base: "200px", lg: "250px" }}
        paddingY="10"
        align="center"
        justify="center"
      >
        {loading && !error ? ( //loading without any errors
          <Spinner
            size="xl"
            thickness="4px"
            color="white"
            emptyColor="blue.800"
          />
        ) : !loading && error ? ( //not loading but there is an error
          <Alert status="error">
            <AlertIcon />
            There was an error processing your request.
          </Alert>
        ) : (
          //no error an not loading display results
          <Stack align="center">
            <Text
              color="white"
              fontSize={["lg", "xl", "3xl", "5xl"]}
              fontWeight="700"
            >
              {currency.amount + " " + currency.from.code} ={" "}
              {(currency.amount * currency.to.rate).toFixed(7) +
                " " +
                currency.to.code}
            </Text>
            <Text
              color="white"
              fontSize={["sm", "md", "lg", "2xl"]}
              fontWeight="600"
            >
              {" "}
              {"1 " + currency.from.code} ={" "}
              {currency.to.rate //if there is an error error this will be null
                ? currency.to.rate.toFixed(7) + " " + currency.to.code
                : null}
            </Text>
            <Text
              color="white"
              fontSize={["sm", "md", "lg", "2xl"]}
              fontWeight="600"
            >
              {" "}
              {"1 " + currency.to.code} ={" "}
              {currency.from.rate //if there is an error error this will be null
                ? currency.from.rate.toFixed(7) + " " + currency.from.code
                : null}
            </Text>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Historical;
