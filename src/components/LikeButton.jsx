import { VscHeart } from "react-icons/vsc";

const LikeButton = ({ color }) => {
  const colorStyles = {
    color: color,
  }

  return (
    <div className="control-button" style={colorStyles}>
      <VscHeart />
    </div>
  );
};

export default LikeButton;
