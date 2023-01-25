import classes from "./FavoriteColorCard.module.css";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineContentCopy } from "react-icons/md";
import { useColors } from "../../store/color-context";
import { useState } from "react";
import { ColorIsDark } from "../../utilities/color-is-dark";
import { copyTextToClipboard } from "../../utilities/copy-text-to-clipboard";

const FavoriteColorCard = ({ favColor }) => {
  const [state, dispatch] = useColors();
  const [copied, setCopied] = useState(false);

  const handleRemoveFavColor = () => {
    dispatch({ type: "remove-favorite-color", payload: favColor });
  };

  const textColor = ColorIsDark(favColor) ? "#EEE" : "#333";

  const handleTextCopy = (e) => {
    copyTextToClipboard(favColor);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      style={{ backgroundColor: favColor, color: textColor }}
      className={classes.favoriteColor}
    >
      {copied ? (
        <p className={classes.copied}>Copied to Clipboard!</p>
      ) : (
        <p className={classes.colorCode}>{favColor}</p>
      )}
      <div className={classes.removeIcon} onClick={handleRemoveFavColor}>
        <RxCross1 />
      </div>
      <div className={classes.copyIcon} onClick={(e) => handleTextCopy(e)}>
        <MdOutlineContentCopy />
      </div>
    </div>
  );
};

export default FavoriteColorCard;
