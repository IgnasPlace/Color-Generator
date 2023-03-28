import { useState, useRef } from "react";
import classes from "./ColorCodeCopy.module.css";
import { MdOutlineContentCopy } from "react-icons/md";
import { ChromePicker } from "react-color";
import { useColors } from "../store/color-context";
import { copyTextToClipboard } from "../utilities/copy-text-to-clipboard";

const ColorCodeCopy = ({ color }) => {
  const [store, dispatch] = useColors();
  const [currentColor, setCurrentColor] = useState(color);
  const [copiedVerify, setCopyVerifiy] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const colorPickerRef = useRef();

  const handleCopy = async () => {
    copyTextToClipboard(color);
    showCopiedMessage();
  };

  const showCopiedMessage = () => {
    setCopyVerifiy(true);
    setTimeout(() => {
      setCopyVerifiy(false);
    }, 2000);
  };

  const copiedClasses = copiedVerify
    ? `${classes["copied-info-message"]} ${classes.visible}`
    : `${classes["copied-info-message"]}`;

  const openColorPickerHandler = () => {
    setColorPickerVisible(true);
  };

  const handleColorPickerClose = (e) => {
    if (colorPickerRef.current === e.target) {
      setColorPickerVisible(false);
      dispatch({
        type: "set-color",
        payload: { newColor: currentColor, oldColor: color },
      });
    }
  };

  const handleColorChange = (e) => {
    // setCurrentColor(e.target.value);
    setCurrentColor(e.hex.toUpperCase());
  };

  return (
    <div
      className={classes.copy}
      draggable="true"
      onDragStart={(e) => e.preventDefault()}
    >
      <h1 onClick={openColorPickerHandler}>{currentColor}</h1>
      <button
        className={classes["copy-btn"]}
        onClick={handleCopy}
        aria-label="copy-color-code"
      >
        <MdOutlineContentCopy />
      </button>
      <p className={copiedClasses}>Copied to clipboard!</p>
      {colorPickerVisible && (
        <div
          ref={colorPickerRef}
          onClick={(e) => handleColorPickerClose(e)}
          className={classes.colorPicker}
        >
          <ChromePicker
            color={currentColor}
            disableAlpha={true}
            onChange={(e) => handleColorChange(e)}
          />
          {/* <input type="color" defaultValue={currentColor} onChange={(e) => handleColorChange(e)}/> */}
        </div>
      )}
    </div>
  );
};

export default ColorCodeCopy;
