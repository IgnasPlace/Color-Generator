import ColorCodeCopy from "./ColorCodeCopy";
import GenerateColor from "./GenerateColor";
import RemoveButton from "./RemoveButton";
import AddButton from "./AddButton";
import LikeButton from "./LikeButton";
import classes from "./ColorContainer.module.css";
import { useColors } from "../store/color-context";
import { useState, useEffect } from "react";
import AddColor from "./AddColor";

const ColorContainer = ({ color }) => {
  const [store, dispatch] = useColors();
  const [btnColor, setBtnColor] = useState("");
  const [addColorVisible, setAddColorVisible] = useState(true);
  const newColorArr = [...store.colors];

  useEffect(() => {
    if (ColorIsDark(color)) {
      setBtnColor("#EEE");
    } else {
      setBtnColor("#333");
    }
  }, [color]);

  const removeColor = () => {
    dispatch({ type: "remove-color", payload: color });
  };

  const handleDragStart = (e) => {
    setAddColorVisible(false);
    if (e.target.textContent.length > 0) {
      dispatch({
        type: "setFirstSwapColor",
        payload: e.target.textContent.slice(0, 7),
      });
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    if (e.target.textContent.length > 0) {
      dispatch({
        type: "setSecondSwapColor",
        payload: e.target.textContent.slice(0, 7),
      });
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const colorOneIdx = newColorArr.findIndex(
      (color) => color === store.firstSwapColor
    );
    const colorTwoIdx = newColorArr.findIndex(
      (color) => color === store.secondSwapColor
    );
    if (colorOneIdx !== colorTwoIdx) {
      if (colorOneIdx < colorTwoIdx) {
        newColorArr[colorOneIdx] = newColorArr[colorTwoIdx];
        newColorArr[colorTwoIdx] = store.firstSwapColor;
        dispatch({ type: "swapColors", payload: newColorArr });
      } else {
        newColorArr[colorTwoIdx] = newColorArr[colorOneIdx];
        newColorArr[colorOneIdx] = store.secondSwapColor;
        dispatch({ type: "swapColors", payload: newColorArr });
      }
    }
    setAddColorVisible(true);
  };

  return (
    <div
      draggable="true"
      onDragStart={(e) => handleDragStart(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e)}
      className={classes.actions}
      style={{ backgroundColor: color }}
    >
      <div
        className={classes.controls}
        draggable="true"
        onDragStart={(e) => e.preventDefault()}
      >
        <GenerateColor color={color} />
        <div className={classes.controlsButtons}>
          <AddButton color={color} btnColor={btnColor} />
          <LikeButton color={btnColor} />
          <RemoveButton color={btnColor} onClick={removeColor} />
        </div>
      </div>

      <div className={classes["invisible-middle-element"]}></div>
      <ColorCodeCopy color={color} />
      {addColorVisible && <AddColor color={color} />}
    </div>
  );
};

export default ColorContainer;

function ColorIsDark(color) {
  const [r, g, b] = hexToRGB(color);
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  return (min + max) / 2 < 128;
}

function hexToRGB(h) {
  let r = 0,
    g = 0,
    b = 0;
  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];
    // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  return [+r, +g, +b];
}
