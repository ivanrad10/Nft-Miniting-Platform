import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { client, walletClient } from "../config";
import io from "socket.io-client";
import myNftAbi from "../myNftAbi.json";
import { useEffect } from "react";
import DisconnectButton from "../Components/DisconnectButton";

import "../Style/RegisterPageStyle.css";

function Register() {
  const account = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    listenForEvents();
  }, []);

  const listenForEvents = () => {
    const socket = io("http://localhost:3000");
    socket.on("UserRegisteredEvent", (data) => {
      console.log("UserRegisteredEvent detected:", data);
      navigate("/nft-page");
    });
  };

  const register = async () => {
    try {
      const { request } = await client.simulateContract({
        account: account.address,
        address: "0x097Bfd62302075DcD2fD4Ad364e3d14C2551B055",
        abi: myNftAbi,
        functionName: "register",
        args: [account.address],
        value: BigInt((1e14).toString()),
      });

      await walletClient.writeContract(request);
    } catch (error) {
      alert("You do not have enough funds!");
    }
  };

  return (
    <div>
      <div>
        {account.status === "connected" && (
          <div className="register-container">
            <h1>Welcome</h1>
            <h2>{account.address}</h2>
            <h2>Please register in order to view/mint the NFT collection</h2>
            <br />
            <button
              className="register-button"
              type="button"
              onClick={register}
            >
              Register
            </button>
          </div>
        )}
      </div>

      <DisconnectButton />
    </div>
  );
}

export default Register;
