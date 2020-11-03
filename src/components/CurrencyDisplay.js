import React from "react";
import { Stack, Text, Alert, AlertIcon, Spinner } from "@chakra-ui/core";

const CurrencyDisplay = ({ loading, error, currency }) => {
  const date = new Date(currency.date + "T00:00:00"); //added time string to adjust for local timezone
  return (
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
            fontSize={["xl", "xl", "3xl", "5xl"]}
            fontWeight="700"
          >
            {currency.amount + " " + currency.from.code} ={" "}
            {(currency.amount * currency.to.rate).toFixed(7) +
              " " +
              currency.to.code}
          </Text>
          <Text
            color="white"
            fontSize={["lg", "lg", "lg", "2xl"]}
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
          <Text
            color="white"
            fontSize={["10px", "xs", "sm", "md"]}
            fontWeight="400"
          >
            Updated: {date.toDateString()}
          </Text>
        </Stack>
      )}
    </Stack>
  );
};

export default CurrencyDisplay;
