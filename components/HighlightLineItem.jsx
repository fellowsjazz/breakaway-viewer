import { ReactComponentElement, useEffect, useState } from "react";
import {
  Flex,
  Image,
  AspectRatio,
  Text,
  Tooltip,
  Center,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { axios } from "axios";
import { BsInfoCircle, BsFillPlayFill } from "react-icons/bs";
import HighlightViewer from "./HighlightViewer";

export default function HighlightLineItem(props) {
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

  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    CoreFade: "rgba(128, 127, 128, 0.3)",
    LimitedFade: "rgba(196, 197, 202, .6)",
    RareFade: "rgba(4, 33, 218, 0.8)",
    EpicFade: "rgba(128, 3, 187, 0.8)",
  };

  return (
    <Flex
      boxShadow={`4px 4px 12px 0px ${rarityColors[rarity]};`}
      borderRadius={"10px"}
      flexDirection={"column"}
      my={"6px"}
      mx={"5%"}
    >
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent backgroundColor={"#131313"} p={"0px"}>
          <Flex>
            <HighlightViewer playerObject={playerObject} />
          </Flex>
        </ModalContent>
      </Modal>

      <Flex
        flexDirection={"row"}
        px={"5%"}
        py={"3px"}
        justify={"space-between"}
      >
        <Text
          color={"#FFFDF8"}
          fontSize={"12px"}
          w={"25%"}
          whiteSpace={"nowrap"} // Set white-space to nowrap
        >
          {isLargerThan900
            ? player?.toUpperCase()
            : player?.split(" ")[0].toUpperCase().charAt(0) +
              "." +
              player?.split(" ")[1].toUpperCase()}
        </Text>

        {isLargerThan900 ? (
          <Text color={"#FFFDF8"} fontSize={"12px"} w={"25%"}>
            {set?.toUpperCase()}
          </Text>
        ) : null}

        <Text
          color={"#FFFDF8"}
          fontSize={"12px"}
          minW={isLargerThan900 ? "15%" : "10%"}
        >
          {isLargerThan900 ? `${edition} / ${editionSize}` : `#${edition}`}
        </Text>

        <Text
          color={"#FFFDF8"}
          fontSize={"12px"}
          minW={isLargerThan900 ? "10%" : "5%"}
        >
          {isLargerThan900
            ? series?.toUpperCase()
            : series?.substring(0, 1) + series?.substring(7)}
        </Text>

        <Text
          color={rarityColors[rarity + "Fade"]}
          fontSize={"12px"}
          w={isLargerThan900 ? "10%" : "15%"}
          overflowWrap={"break-word"}
        >
          {rarity?.toUpperCase()}
        </Text>

        <Flex>
          {isLargerThan900 ? (
            <Tooltip label={description} bg={"#131313"} borderRadius={"10px"}>
              <Center>
                <span>
                  <BsInfoCircle color="white" size={"10px"} />
                </span>
              </Center>
            </Tooltip>
          ) : null}

          <IconButton
            icon={<BsFillPlayFill />}
            variant={"unstyled"}
            color="white"
            h={"8px"}
            mt={"1px"}
            mx={"5px"}
            onClick={openModal}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
