import DisconnectButton from "../Components/DisconnectButton";
import "../Style/BlacklistedPageStyle.css";

function Blacklisted() {
  return (
    <div>
      <h1 className="blacklisted-header">
        You have been blacklisted from this NFT collection!
      </h1>
      <DisconnectButton />
    </div>
  );
}

export default Blacklisted;
