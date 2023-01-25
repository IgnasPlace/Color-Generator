import { useState } from "react";
import { VscHeart } from "react-icons/vsc";
import { useColors } from "../../store/color-context";
import classes from './LikeButton.module.css';

const LikeButton = ({ color, btnColor }) => {
  const [store, dispatch] = useColors();
  const [btnClicked, setBtnClicked] = useState(false);
  const colorStyles = {
    color: btnColor,
  };

  const handleAddToFavorites = () => {
    if(store.favoriteColors.length > 3) {
      alert('Favorite color limit reached. Please remove some favorite colors to add new ones.');
      return
    }
    dispatch({ type: "addToFavorites", payload: color });
    setBtnClicked(true);
    setTimeout(() => {
      setBtnClicked(false);
    }, 500)
  };

  const btnClasses = `control-button ${btnClicked ? classes.likeButton : ''}`

  return (
    <div
      className={btnClasses}
      style={colorStyles}
      onClick={handleAddToFavorites}
    >
      <VscHeart />
    </div>
  );
};

export default LikeButton;
