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
        <Text color={"#FFFDF8"} fontSize={"12px"} w={"25%"}>
          {player?.toUpperCase()}
        </Text>
        <Text color={"#FFFDF8"} fontSize={"12px"} w={"25%"}>
          {set?.toUpperCase()}
        </Text>
        <Text color={"#FFFDF8"} fontSize={"12px"} w={"15%"}>
          {edition}/{editionSize}
        </Text>

        <Text color={"#FFFDF8"} fontSize={"12px"} w={"10%"}>
          {series?.toUpperCase()}
        </Text>

        <Text color={"#FFFDF8"} fontSize={"12px"} w={"10%"} overflowWrap={"break-word"}>
          {rarity?.toUpperCase()}
        </Text>

        <Flex>
          <Tooltip label={description} bg={"#131313"} borderRadius={"10px"}>
            <Center>
              <span>
                <BsInfoCircle color="white" size={"10px"} />
              </span>
            </Center>
          </Tooltip>

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
