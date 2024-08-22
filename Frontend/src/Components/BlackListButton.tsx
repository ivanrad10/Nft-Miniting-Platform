import { useAccount } from "wagmi";
import { useState } from "react";
import { walletClient, client } from "../config";

import myNftAbi from "../myNftAbi.json";
import "../Style/BlackListButtonStyle.css";

const BlackListButton = () => {
  const account = useAccount();
  const [address, setAddress] = useState("");
  const CONTRACT_OWNER = "0x704f37cE0a2D11587aa02a6408F41E76fA488C5a";
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;

  const blacklist = async () => {
    if (!addressRegex.test(address.trim())) {
      alert("Invalid address format.");
      return;
    }

    const signature = await walletClient.signMessage({
      account: account.address as `0x${string}`,
      message: "Are you the owner of the contract?",
    });

    console.log(signature);

    await fetch(`http://localhost:3000/nfts/blacklist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signature: signature,
        message: "Are you the owner of the contract?",
      }),
    });
    try {
      const { request } = await client.simulateContract({
        account: account.address,
        address: "0x097Bfd62302075DcD2fD4Ad364e3d14C2551B055",
        abi: myNftAbi,
        functionName: "blacklist",
        args: [address],
      });
      await walletClient.writeContract(request);
    } catch (error) {
      alert("Unauthorized! Only the owner can blacklist users!");
    }
  };

  return (
    <div>
      {account.address === CONTRACT_OWNER && (
        <div className="container">
          <button
            className="blacklist-button"
            type="button"
            onClick={blacklist}
            disabled={address.trim() === ""}
          >
            Blacklist user
          </button>
          <input
            className="address-input"
            type="text"
            placeholder="Enter address to blacklist"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default BlackListButton;
