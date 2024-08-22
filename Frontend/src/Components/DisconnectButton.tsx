import { useAccount, useDisconnect, useAccountEffect } from "wagmi";
import { useNavigate } from "react-router-dom";

import "../Style/DisconnectButtonStyle.css";

function DisconnectButton() {
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  const account = useAccount();

  useAccountEffect({
    onDisconnect() {
      navigate("/");
    },
  });

  return (
    <div className="disconnect-button-container">
      {account.status === "connected" && (
        <button
          className="disconnect-button"
          type="button"
          onClick={() => disconnect()}
        >
          Disconnect wallet
        </button>
      )}
    </div>
  );
}

export default DisconnectButton;
