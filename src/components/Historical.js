import React, { useEffect, useState } from "react";
import { Stack, Box } from "@chakra-ui/core";
import { MdNavigateNext } from "react-icons/md";

import CustomIconButton from "./CustomIconButton";
import InputFormControl from "./InputFormControl";
import CurrencyDisplay from "./CurrencyDisplay";
import CurrencySelectFormSection from "./CurrencySelectFormSection";

const formStyle = {
  width: "100%",
};

const Historical = ({ initialQuery }) => {
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

  const getHistoricalCurrency = async (query) => {
    //if the amount entered by user is NaN or null or 0 set it to 1
    const amount =
      query.amount === null || isNaN(query.amount) || Number(query.amount) === 0
        ? 1
        : Number(query.amount);
    setQuery({
      amount: amount,
      from: query.from,
      to: query.to,
      date: query.date,
    });
    setError(false);
    setLoading(true);
    try {
      const apiResp = await fetch(
        `https://api.exchangeratesapi.io/${query.date}?base=${query.from}`
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
    getHistoricalCurrency(initialQuery);
  }, [initialQuery]);

  const d = new Date();
  const today = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${(
    "0" + d.getDate()
  ).slice(-2)}`;

  return (
    <Stack paddingTop="10">
      <form
        style={formStyle}
        onSubmit={(e) => {
          e.preventDefault();
          getHistoricalCurrency(query);
        }}
      >
        <Stack spacing={{ base: 4, lg: 4 }}>
          <Stack
            direction={["column", "column", "column", "row"]}
            spacing={{ base: 4, lg: 2 }}
          >
            <InputFormControl
              onChange={(e) => {
                setQuery({
                  amount: query.amount,
                  from: query.from,
                  to: query.to,
                  date: e.target.value,
                });
              }}
              value={query.date}
              label="Date"
              type="date"
              min="1999-01-04"
              max={today}
            />
            <Box minWidth="48px" display={{ base: "none", lg: "initial" }} />
            <InputFormControl
              onChange={(e) => {
                setQuery({
                  amount: e.target.value,
                  from: query.from,
                  to: query.to,
                  date: query.date,
                });
              }}
              value={query.amount}
              label="Amount"
              type="number"
              pattern="\d*"
            />
          </Stack>

          <Stack
            direction={["column", "column", "column", "row"]}
            spacing={{ base: 4, lg: 2 }}
          >
            <CurrencySelectFormSection
              query={query}
              setQuery={setQuery}
              initialQuery={initialQuery}
            />
          </Stack>
          <CustomIconButton
            tooltipLabel="Get Results"
            type="submit"
            icon={<MdNavigateNext />}
            width={{ base: "100%" }}
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

export default Historical;
