import React from "react";
import { Box, Tabs, TabList, TabPanels, TabPanel, Tab } from "@chakra-ui/core";

import Latest from "../components/Latest";
import Historical from "../components/Historical";

const selectedStyle = {
  backgroundColor: "blue.600",
  color: "white",
};

const Main = () => {
  return (
    <Box paddingX={{ base: 0, lg: 10, xl: 40 }} paddingY={[0, 0, 10, 10]}>
      <Box h="80vh" w="100%">
        <Tabs isFitted colorScheme="blue" variant="enclosed-colored">
          <TabList>
            <Tab
              color="blue.600"
              _selected={selectedStyle}
              fontWeight="600"
              fontSize="2.5rem"
            >
              Latest
            </Tab>
            <Tab
              color="blue.600"
              _selected={selectedStyle}
              fontWeight="600"
              fontSize="2.5rem"
            >
              Historical
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel backgroundColor="blue.600">
              <Latest
                initialQuery={{
                  amount: 1,
                  from: "CAD",
                  to: "USD",
                }}
              />
            </TabPanel>
            <TabPanel backgroundColor="blue.600">
              <Historical
                initialQuery={{
                  amount: 1,
                  from: "CAD",
                  to: "USD",
                  date: "1999-01-01",
                }}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Main;
