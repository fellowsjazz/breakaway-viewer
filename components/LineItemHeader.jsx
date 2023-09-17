import React from "react";
import { Flex, Text, useMediaQuery } from "@chakra-ui/react";

export default function LineItemHeader() {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  return (
    <Flex borderRadius={"10px"} flexDirection={"column"} my={"6px"} mx={"5%"}>
      <Flex
        flexDirection={"row"}
        px={"5%"}
        py={"5px"}
        justify={"space-between"}
        borderBottom={"1px"}
      >
        <Text color={"#FFFDF8"} fontSize={"12px"} w={"25%"}>
          Player
        </Text>
        {isLargerThan900 ? (
          <Text color={"#FFFDF8"} fontSize={"12px"} w={"25%"}>
            Set
          </Text>
        ) : null}
        <Text color={"#FFFDF8"} fontSize={"12px"} w={"15%"}>
          Edition
        </Text>

        <Text color={"#FFFDF8"} fontSize={"12px"} w={"10%"}>
          Series
        </Text>

        <Text color={"#FFFDF8"} fontSize={"12px"} w={"10%"}>
          Rarity
        </Text>

        <Flex w={"4%"}></Flex>
      </Flex>
    </Flex>
  );
}
