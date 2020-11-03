import React, { useEffect, useState } from "react";
import { Stack } from "@chakra-ui/core";
import { MdNavigateNext } from "react-icons/md";

import CustomIconButton from "./CustomIconButton";
import InputFormControl from "./InputFormControl";
import CurrencyDisplay from "./CurrencyDisplay";
import CurrencySelectFormSection from "./CurrencySelectFormSection";

const formStyle = {
  width: "100%",
};

const Latest = ({ initialQuery }) => {
  const [query, setQuery] = useState({
    amount: 1,
    from: null,
    to: null,
    date: null,
  });
  const [currency, setCurrency] = useState({
    amount: null,
    from: { code: null, rate: null },
    to: { code: null, rate: null },
    date: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getLatestCurrency = async (query) => {
    //if the amount entered by user is NaN or null or 0 set it to 1
    const amount =
      query.amount === null || isNaN(query.amount) || Number(query.amount) === 0
        ? 1
        : Number(query.amount);
    setQuery({ amount: amount, from: query.from, to: query.to });
    setError(false);
    setLoading(true);
    try {
      const apiResp = await fetch(
        `https://api.exchangeratesapi.io/latest?base=${query.from}`
      );
      const respJSON = await apiResp.json();
      setCurrency({
        amount: amount,
        from: { code: respJSON.base, rate: 1 / respJSON.rates[query.to] }, //the inverse of the requested rate (to show both rates)
        to: { code: query.to, rate: respJSON.rates[query.to] }, //the actual rate
        date: respJSON.date,
      });
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getLatestCurrency(initialQuery);
  }, [initialQuery]);

  return (
    <Stack paddingTop="10">
      <form
        style={formStyle}
        onSubmit={(e) => {
          e.preventDefault();
          getLatestCurrency(query);
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
            type="number"
            pattern="\d*"
          />
          <CurrencySelectFormSection
            query={query}
            setQuery={setQuery}
            initialQuery={initialQuery}
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
      <CurrencyDisplay loading={loading} error={error} currency={currency} />
    </Stack>
  );
};

export default Latest;
