import { ReactComponentElement, useEffect, useState } from "react";
import { Flex, Image, AspectRatio, Text, Tooltip } from "@chakra-ui/react";
import { axios } from "axios";
import { BsInfoCircle } from "react-icons/bs";

export default function HighlightViewer(props) {
  const [data, setData] = useState();
  const [highlightVideo, setHighlightVideo] = useState();
  const [player, setPlayer] = useState();
  const [edition, setEdition] = useState();
  const [rarity, setRarity] = useState();
  const [editionSize, setEditionSize] = useState();
  const [series, setSeries] = useState();
  const [set, setSet] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();

  const playerObject = props.playerObject;

  

  useEffect(() => {
    setHighlightVideo(playerObject?.video);
    setDate(playerObject?.date);
    setPlayer(playerObject?.playerName);
    setSet(playerObject?.set);
    setEdition(playerObject?.edition);
    setEditionSize(playerObject?.editionSize);
    setSeries(playerObject?.series);
    setRarity(playerObject?.rarity);
    setDescription(playerObject?.description);
  }, [playerObject]);

  const rarityColors = {
    Core: "rgba(128, 127, 128, 0.3)",
    Limited: "rgba(196, 197, 202, .6)",
    Rare: "rgba(4, 33, 218, 0.3)",
    Epic: "rgba(90, 3, 187, 0.8)",
  };

  return (
    <Flex
      boxShadow={`4px 4px 12px 0px ${rarityColors[rarity]};`}
      borderRadius={"10px"}
      flexDirection={"column"}
      m={"0px"}
    >
      <Flex flexDirection={"column"} justify={"space-between"}>
        <Flex>
          <video
            src={highlightVideo}
            controls
            style={{ borderRadius: "10px", overflow: "hidden" }}
          />
        </Flex>
        <Flex justify={"space-between"} px={"12px"} pt={"12px"} >
          <Text color={"#FFFDF8"} fontSize={"12px"}>
            #{edition}/{editionSize}
          </Text>
          <Text color={"#FFFDF8"} fontSize={"12px"}>
            {player?.toUpperCase()}
          </Text>
        </Flex>
        <Flex justify={"right"} px={"12px"}>
          <Text color={"#FFFDF8"} fontSize={"10px"}>
            {series?.toUpperCase()}
          </Text>
        </Flex>
      </Flex>
      <Flex justify={"space-between"} align={"flex-end"} h={"100%"} p={"12px"}>
        <Tooltip label={description}>
          <span>
            <BsInfoCircle color="white" size={"10px"} />
          </span>
        </Tooltip>

        <Text color={"#FFFDF8"} fontSize={"10px"}>
          {set?.toUpperCase()}
        </Text>
      </Flex>
    </Flex>
  );
}
