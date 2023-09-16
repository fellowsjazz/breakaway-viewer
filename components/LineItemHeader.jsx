import React from 'react'
import { Flex,Text, } from '@chakra-ui/react'

export default function LineItemHeader() {
  return (
    <Flex
      
      borderRadius={"10px"}
      flexDirection={"column"}
      my={"6px"}
      mx={"5%"}
    >
     

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
        <Text color={"#FFFDF8"} fontSize={"12px"} w={"25%"}>
          Set
        </Text>
        <Text color={"#FFFDF8"} fontSize={"12px"} w={"15%"}>
          Edition
        </Text>

        <Text color={"#FFFDF8"} fontSize={"12px"} w={"10%"}>
          Series
        </Text>

        <Text color={"#FFFDF8"} fontSize={"12px"} w={"10%"}>
          Rarity
        </Text>

        <Flex w={"4%"}>
          

        
        </Flex>
      </Flex>
    </Flex>
  )
}
