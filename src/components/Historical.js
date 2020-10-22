import React from "react";
import { FormControl, FormLabel, Stack, Input } from "@chakra-ui/core";
import SectionContainer from "./SectionContainer";

const Historical = () => {
  return (
    <SectionContainer>
      <Stack>
        <form>
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input backgroundColor="white" />
          </FormControl>
        </form>
      </Stack>
    </SectionContainer>
  );
};

export default Historical;
