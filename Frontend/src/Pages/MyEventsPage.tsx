import Events from "../Components/Events";
import DisconnectButton from "../Components/DisconnectButton";
import BackButton from "../Components/BackButton";
import BlackListButton from "../Components/BlackListButton";

function MyEvents() {
  return (
    <div>
      <Events />
      <DisconnectButton />
      <BackButton />
      <BlackListButton />
    </div>
  );
}

export default MyEvents;
