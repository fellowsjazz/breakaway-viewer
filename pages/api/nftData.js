export default async function handler(req, res) {
    const options = { method: "GET", headers: { accept: "application/json" } };
    try {
      const alchemyKey = process.env.ALCHEMY_KEY;
      const userAddress = req.query.userAddress
  
      const response = await fetch(
        `https://polygon-mainnet.g.alchemy.com/nft/v2/${alchemyKey}/getNFTs?owner=${userAddress}&contractAddresses[]=0x890dd4f5243f030af3416d4d6d3c593ecb172017&contractAddresses[]=0x61422343b6d168074bbcba7b4695fd92a31146a0&contractAddresses[]=0xca28251acf27e55fdbfbf997397a28db122e70b2&contractAddresses[]=0x17eb13ba9b94b42e1a10b92ff1b77036c79ccb8a&withMetadata=true&pageSize=100`,
        options
      );
  
      const data = await response.json();
      console.log("Data:", data);
  
      res.status(200).json(({data}));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }