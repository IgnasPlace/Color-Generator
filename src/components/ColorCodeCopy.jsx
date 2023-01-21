import { useState } from "react";
import classes from "./ColorCodeCopy.module.css";
import { MdOutlineContentCopy } from "react-icons/md";

async function copyTextToClipboard(text) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}

const ColorCodeCopy = ({ color }) => {
  const [copiedVerify, setCopyVerifiy] = useState(false)

  const handleCopy = async () => {
    copyTextToClipboard(color);
    showCopiedMessage();
  };

  const showCopiedMessage = () => {
    setCopyVerifiy(true);
    setTimeout(() => {
      setCopyVerifiy(false)
    }, 2000)
  }

  const copiedClasses = copiedVerify ? `${classes['copied-info-message']} ${classes.visible}` : `${classes['copied-info-message']}`

  return (
    <div className={classes.copy}>
      <h1>{color}</h1>
      <button className={classes['copy-btn']} onClick={handleCopy}>
        <MdOutlineContentCopy />
      </button>
      <p className={copiedClasses}>Copied to clipboard!</p>
    </div>
  );
};

export default ColorCodeCopy;
