import { useNavigate } from "react-router-dom";
import "../Style/BackButtonStyle.css";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button className="back-button" onClick={goBack}>
      Back
    </button>
  );
};

export default BackButton;
