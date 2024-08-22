import { useConnect, useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { client } from "../config";
import myNftAbi from "../myNftAbi.json";
import "../Style/ConnectWalletPageStyle.css";
import { useEffect, useState } from "react";

function ConnectWallet() {
  const { connectors, connect } = useConnect();
  const { address } = useAccount();
  const navigate = useNavigate();

  const [isUserRegistered, setIsUserRegistered] = useState<boolean | null>(
    null
  );
  const [isUserBlackListed, setIsUserBlackListed] = useState<boolean | null>(
    null
  );
  const metaMaskConnector = connectors.find(
    (connector) => connector.name === "MetaMask"
  );

  useEffect(() => {
    if (address) {
      checIsUserBlacklisted();
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      checkIsUserRegistered();
    }
  }, [isUserBlackListed]);

  useEffect(() => {
    if (isUserRegistered === true) {
      navigate("nft-page");
    } else if (isUserRegistered === false) {
      navigate("register-page");
    }
  }, [isUserRegistered]);

  const checIsUserBlacklisted = async () => {
    const isBlackListed = await client.readContract({
      account: address,
      address: "0x097Bfd62302075DcD2fD4Ad364e3d14C2551B055",
      abi: myNftAbi,
      functionName: "isAddressBlackListed",
      args: [address],
    });

    setIsUserBlackListed(isBlackListed as boolean);

    if (isBlackListed) {
      navigate("/blacklisted");
    }
  };

  const checkIsUserRegistered = async () => {
    const isRegistered = await client.readContract({
      account: address,
      address: "0x097Bfd62302075DcD2fD4Ad364e3d14C2551B055",
      abi: myNftAbi,
      functionName: "isRegistered",
      args: [address],
    });

    setIsUserRegistered(isRegistered as boolean);
  };

  return (
    <>
      <div>
        {metaMaskConnector && (
          <button
            className="connect-button"
            key={metaMaskConnector.uid}
            onClick={() => connect({ connector: metaMaskConnector })}
            type="button"
          >
            Connect wallet
          </button>
        )}
      </div>
    </>
  );
}

export default ConnectWallet;
