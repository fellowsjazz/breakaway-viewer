import { Flex } from "@chakra-ui/react";
import HighlightViewer from "../components/HighlightViewer";
import { useEffect, useState } from "react";
import HighlightLineItem from "../components/HighlightLineItem";

export default function DataFetcher() {
  const [queryData, setQueryData] = useState();
  const options = { method: "GET", headers: { accept: "application/json" } };
  const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
  const [ipfsArray, setIpfsArray] = useState();
  const [playerObjectArray, setPlayerObjectArray] = useState([]);

 //THIS DOESN"T WORK AT ALL YET, IMPORTING DIRECTLY INTO TABLE PAGE FOR NOW
  useEffect(() => {
    console.log("api key: ", alchemyKey);
    fetch(
      '/api/nftData',
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setQueryData(response); // Set the response data to state here
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (queryData && queryData.ownedNfts) {
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

  return playerObjectArray;
}
