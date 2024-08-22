import { useEffect, useState } from "react";
import { NftType } from "../types";
import { client, walletClient } from "../config";
import { useAccount } from "wagmi";
import io from "socket.io-client";
import myNftAbi from "../myNftAbi.json";
import CID from "cids";

import "../Style/NftGridStyle.css";

function NftGrid() {
  const account = useAccount();
  const [nfts, setNfts] = useState<NftType[]>([]);

  useEffect(() => {
    fetchNfts();
    listenForEvents();
  }, []);

  const listenForEvents = () => {
    const socket = io("http://localhost:3000");
    socket.on("NftMintedEvent", (data) => {
      console.log("NftMintedEvent detected:", data);
      fetchNfts();
    });
  };

  const fetchNfts = async () => {
    const response = await fetch(`http://localhost:3000/nfts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setNfts(data);
  };

  const mintNft = async (tokenUri: string) => {
    const uint8ArrayHashedTokenUri = new CID(tokenUri)
      .toV0()
      .multihash.subarray(2);

    const bytes32HashedTokenUri =
      "0x" +
      Array.from(uint8ArrayHashedTokenUri)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    //reverse operation
    // const hex = bytes32HashedTokenUri.slice(2);
    // const byteArray = new Uint8Array(hex.length / 2);
    // for (let i = 0; i < byteArray.length; i++) {
    //   byteArray[i] = parseInt(hex.substr(i * 2, 2), 16);
    // }
    // const tokenURI = new CID(new Uint8Array([18, 32, ...byteArray])).toString();

    try {
      const { request } = await client.simulateContract({
        account: account.address,
        address: "0x097Bfd62302075DcD2fD4Ad364e3d14C2551B055",
        abi: myNftAbi,
        functionName: "mintNft",
        args: [account.address, bytes32HashedTokenUri],
        value: BigInt((1e14).toString()),
      });

      await walletClient.writeContract(request);
    } catch (error) {
      alert("You do not have enough funds!");
    }
  };

  const formatAddress = (address: string) => {
    if (address && address.length > 0) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return "";
  };

  return (
    <div className="nft-grid-container">
      <div className="nft-grid">
        {nfts.map((nft, index) => (
          <div key={index} className="nft-card">
            <img src={"https://ipfs.io/ipfs/" + nft.imageUrl} alt={nft.name} />
            {nft.owner === "" ? (
              <button
                className="mint-button"
                onClick={() => mintNft(nft.tokenUri)}
              >
                Mint
              </button>
            ) : (
              <div className="nft-owner-container">
                <p className="nft-owner-label">Owned by</p>
                <a
                  href={`https://sepolia.etherscan.io/address/${nft.owner}`}
                  className="nft-owner-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {formatAddress(nft.owner)}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NftGrid;
