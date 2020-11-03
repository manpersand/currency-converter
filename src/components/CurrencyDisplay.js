import React from "react";
import { Stack, Text, Alert, AlertIcon, Spinner, Box } from "@chakra-ui/core";
import Reel from "react-reel";
import { motion } from "framer-motion";

const CurrencyDisplay = ({ loading, error, currency }) => {
  const date = new Date(currency.date + "T00:00:00"); //added time string to adjust for local timezone
  return (
    <Stack
      height={{ base: "200px", lg: "250px" }}
      paddingY="10"
      align="center"
      justify="center"
      color="white"
    >
      {loading && !error ? ( //loading without any errors
        <Spinner size="xl" thickness="4px" emptyColor="blue.800" />
      ) : !loading && error ? ( //not loading but there is an error
        <Alert status="error">
          <AlertIcon />
          There was an error processing your request.
        </Alert>
      ) : (
        //no error and not loading => display results
        <Stack align="center">
          <Box fontSize={["xl", "xl", "3xl", "5xl"]} fontWeight="700">
            <Reel
              theme={reelStyle}
              text={`${currency.amount} ${currency.from.code} = ${(
                currency.amount * currency.to.rate
              ).toFixed(7)} ${currency.to.code}`}
            />
          </Box>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Stack align="center">
              <Text fontSize={["lg", "lg", "lg", "2xl"]} fontWeight="600">
                {" "}
                {"1 " + currency.from.code} ={" "}
                {currency.to.rate //if there is an error error this will be null
                  ? currency.to.rate.toFixed(7) + " " + currency.to.code
                  : null}
              </Text>
              <Text fontSize={["sm", "md", "lg", "2xl"]} fontWeight="600">
                {" "}
                {"1 " + currency.to.code} ={" "}
                {currency.from.rate //if there is an error error this will be null
                  ? currency.from.rate.toFixed(7) + " " + currency.from.code
                  : null}
              </Text>
              <Text fontSize={["10px", "xs", "sm", "md"]} fontWeight="400">
                Updated: {date.toDateString()}
              </Text>
            </Stack>
          </motion.div>
        </Stack>
      )}
    </Stack>
  );
};

export default CurrencyDisplay;

const reelStyle = {
  reel: {
    height: "1.07em",
    display: "flex",
    alignItems: "flex-end",
    overflowY: "hidden",
    lineHeight: "0.97em",
    justifyContent: "center",
  },
  group: {
    transitionDelay: "0",
    transitionTimingFunction: "ease-in-out",
    transform: "translate(0,0)",
    height: "1.5em",
  },
  number: {
    height: "1em",
  },
};
