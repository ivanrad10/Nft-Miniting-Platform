import { useNavigate } from "react-router-dom";

import "../Style/MyEventsButtonStyle.css";

function MyEventsButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/my-events-page");
  };

  return (
    <div className="my-events-button-container">
      <button className="my-events-button" onClick={handleClick}>
        Dashboard
      </button>
    </div>
  );
}

export default MyEventsButton;
