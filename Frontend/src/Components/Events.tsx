import { useEffect, useState } from "react";
import { EventType } from "../types";
import { useAccount } from "wagmi";
import io from "socket.io-client";
import CID from "cids";

import "../Style/EventsStyle.css";

function Events() {
  const account = useAccount();
  const [events, setEvents] = useState<EventType[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>(events);

  useEffect(() => {
    fetchEvents();
    listenForEvents();
  }, []);

  const listenForEvents = () => {
    const socket = io("http://localhost:3000");
    socket.on("UserBlackListedEvent", (data) => {
      console.log("UserBlackListedEvent detected:", data);
      fetchEvents();
    });
  };

  const fetchEvents = async () => {
    const response = await fetch(`http://localhost:3000/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setEvents(data);
    setFilteredEvents(data);
  };

  const handleSearch = () => {
    const searchValue = searchInput.toLowerCase();
    const filtered = events.filter((event) =>
      event.address.toLowerCase().includes(searchValue)
    );
    setFilteredEvents(filtered);
  };

  const actualTokenUri = (bytes32Tokenuri: string) => {
    const hex = bytes32Tokenuri.slice(2);
    const byteArray = new Uint8Array(hex.length / 2);
    for (let i = 0; i < byteArray.length; i++) {
      byteArray[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return new CID(new Uint8Array([18, 32, ...byteArray])).toString();
  };

  return (
    <div className="centered-container">
      <div className="fixed-container">
        <input
          placeholder="Search by address"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="event-cards">
        {filteredEvents.length > 0 && account ? (
          filteredEvents.map((event, index) => (
            <div key={index} className="event-card">
              <h2>{event.name}</h2>
              {event.name === "NftMinted" && (
                <p>Token URI: {actualTokenUri(event.tokenUri as string)}</p>
              )}
              <p>Address: {event.address}</p>
            </div>
          ))
        ) : (
          <p>No events found for this address.</p>
        )}
      </div>
    </div>
  );
}

export default Events;
