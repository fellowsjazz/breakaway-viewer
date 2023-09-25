import {
  Button,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Input,
  Image,
  Spinner,
  Center,
  useMediaQuery,
} from "@chakra-ui/react";
import HighlightViewer from "../components/HighlightViewer";
import { useEffect, useState } from "react";
import HighlightLineItem from "../components/HighlightLineItem";
import DataFetcher from "../components/DataFetcher";
import LineItemHeader from "../components/LineItemHeader";
import { BsFillPencilFill } from "react-icons/bs";
import { useRouter } from "next/router";

export default function Home() {
  const [queryData, setQueryData] = useState();
  const [ipfsArray, setIpfsArray] = useState();
  const [playerObjectArray, setPlayerObjectArray] = useState([]);
  const [userAddress, setUserAddress] = useState("0x64376dbf55c08378192C81Aa5792769cE16CabF1");
  //address of CEO of sweet 0xA1Ab6c3fBcA8cDCBAD677840406137FDe1e3fc5e
  //my address 0x64376dbf55c08378192C81Aa5792769cE16CabF1
  const [addressInput, setAddressInput] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const router = useRouter();

  //isloading checker
  useEffect(() => {
    console.log("isloading: ", isLoading);
    setUserAddress(router.query.userAddress);
    console.log('router address: ', router.query.userAddress)
  }, [isLoading]);

  //getting the
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(`/api/nftData?userAddress=${userAddress}`);
      const data = await response.json();
      console.log("response received: ", data.data);
      setQueryData(data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [userAddress]);

  useEffect(() => {
    console.log("second useEffect triggered");
    if (queryData && queryData.ownedNfts) {
      console.log("query data triggered ipfs array uesEffect");
      const gatewayValues = queryData.ownedNfts.map(
        (item) => item.tokenUri.gateway
      );

      // Do something with gatewayValues, e.g., store it in state or use it as needed
      setIpfsArray(gatewayValues);
    }
  }, [queryData]);

  //now we restructure the IPFS gateway values , so that we can create an array of player objects
  //we have to do the fetching in the index file, not in the component, then pass the fetched data instead of the ipfs gateway
  useEffect(() => {
    setPlayerObjectArray([]);

    if (ipfsArray) {
      ipfsArray.map((item) => {
        fetch(item)
          .then((res) => res.json())
          .then((data) => {
            const {
              animation_url,
              attributes,
              description,
              extended_metadata: {
                image: {
                  altloc: { ipfs },
                },
              },
            } = data;

            const playerObject = {
              playerName: attributes[4].value,
              set: attributes[7].value,
              edition: attributes[2].value,
              editionSize: attributes[9].value,
              series: attributes[6].value,
              rarity: attributes[5].value,
              date: attributes[1].value,
              team: attributes[8].value,
              video: animation_url.replace("ipfs://", "https://ipfs.io/ipfs/"),
              description: description,
              image: ipfs.replace("ipfs://", "https://ipfs.io/ipfs/"),
            };
            setPlayerObjectArray((prevArray) => [...prevArray, playerObject]);
          });
      });
    }
  }, [ipfsArray]);

  //okay, now we have all the fetched IPFS metadata in an array of objects. I'm gonna try to destructure them
  //in the useEffect above to be more developer friendly
  //DONE! looks so much better in the console, atleast
  //now we need to refactor the other components to take playerObjects, instead of an IPFS gateway link to the metadata

  useEffect(() => {
    console.log("playerObjectArray: ", playerObjectArray);
  }, [playerObjectArray]);

  function handleRaritySort() {
    const sortingOrder = ["Epic", "Rare", "Limited", "Core"];
    const sortedArray = [...playerObjectArray].sort((a, b) => {
      const rarityA = sortingOrder.indexOf(a.rarity);
      const rarityB = sortingOrder.indexOf(b.rarity);
      return rarityA - rarityB;
    });
    setPlayerObjectArray(sortedArray);
  }

  function handleEditionSort() {
    const sortedArray = [...playerObjectArray].sort((a, b) => {
      const editionA = a.edition;
      const editionB = b.edition;
      return editionA - editionB;
    });
    setPlayerObjectArray(sortedArray);
  }

  function handleAlphabeticalSort() {
    const sortedArray = [...playerObjectArray].sort((a, b) => {
      const nameA = a.playerName.toLowerCase(); // Convert names to lowercase for case-insensitive sorting
      const nameB = b.playerName.toLowerCase();

      if (nameA < nameB) {
        return -1; // Name A should come before Name B
      }
      if (nameA > nameB) {
        return 1; // Name B should come before Name A
      }
      return 0; // Names are equal
    });

    setPlayerObjectArray(sortedArray);
  }

  //testing out a sort function for the playerObjectArray
  useEffect(() => {}, [playerObjectArray]);
  //it works!! now I can create a sort button that updates based on any of these details

  function handleAddressSubmit(e) {
    setUserAddress(addressInput);
    router.push(`/?userAddress=${addressInput}`);
    console.log("user address changed to: ", addressInput);
  }

  useEffect(() => {
    console.log("new user address: ", userAddress);
  }, [userAddress]);

  return (
    <Flex
      w={"100vw"}
      h={"100vh"}
      minH={"100vh"}
      backgroundColor={"#131313"}
      direction={"column"}
      overflowX={"clip"}
    >
      <Flex
        justify={"space-between"}
        mx={"5%"}
        mt={isLargerThan900 ? "1%" : "5%"}
      >
        <Flex>
          <Input
            h={"24px"}
            placeholder={userAddress}
            value={addressInput}
            fontSize={"12px"}
            color={"white"}
            _placeholder={{ color: "white", fontSize: "12px" }}
            onChange={(e) => setAddressInput(e.target.value)}
          />
          <Button
            variant={"outline"}
            color={"white"}
            size={"xs"}
            mx={"3px"}
            onClick={handleAddressSubmit}
            w={"70px"}
          >
            Search
          </Button>
          <Button
            as={"a"}
            href={`https://polygonscan.com/address/${userAddress}#tokentxnsErc721`}
            target="_blank"
            variant={"outline"}
            color={"white"}
            size={"xs"}
            _hover={"color: #FFFFFF00"}
            mr={"3px"}
          >
            <Image src="polygon-matic-logo.png" h={"12px"} w={"20px"} />
          </Button>
        </Flex>
        <Flex>
          <Button
            onClick={handleRaritySort}
            variant={"outline"}
            color={"white"}
            size={"xs"}
          >
            Rarity
          </Button>
          <Button
            onClick={handleEditionSort}
            variant={"outline"}
            color={"white"}
            size={"xs"}
          >
            Edition
          </Button>
          <Button
            onClick={handleAlphabeticalSort}
            variant={"outline"}
            color={"white"}
            size={"xs"}
          >
            Alpha
          </Button>
        </Flex>
      </Flex>

      <Flex borderBottom={"1px"} mt={isLargerThan900 ? "1%" : "5%"} />

      <Flex
        direction={"column"}
        overflowY={"auto"}
        h={"90vh"}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none", // Hide the scrollbar
          },
        }}
      >
        {isLoading ? (
          <Center>
            <Spinner size={"sm"} color="white" />
          </Center>
        ) : null}
        {playerObjectArray &&
          playerObjectArray.map((item, index) => (
            <HighlightLineItem key={index} playerObject={item} />
          ))}
      </Flex>
    </Flex>
  );
}

//RUSS NEXT STEP IS MAKING THE QUERY EDITABLE IN THE UI TO CHANGE OWNER WALLET ADDRESS
