import ColorCodeCopy from "./ColorCodeCopy";
import GenerateColor from "./GenerateColor";
import RemoveButton from "./UI/RemoveButton";
import AddButton from "./UI/AddButton";
import LikeButton from "./UI/LikeButton";
import classes from "./ColorContainer.module.css";
import { useColors } from "../store/color-context";
import { useState } from "react";
import AddColor from "./AddColor";
import {ColorIsDark} from '../utilities/color-is-dark';

const ColorContainer = ({ color }) => {
  const [store, dispatch] = useColors();
  const [addColorVisible, setAddColorVisible] = useState(true);
  const newColorArr = [...store.colors];
  const btnColor = ColorIsDark(color) ? "#EEE" : "#333";

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
      draggable={true}
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
          <LikeButton color={color} btnColor={btnColor} />
          <AddButton color={color} btnColor={btnColor} />
          <RemoveButton color={color} btnColor={btnColor} />
        </div>
      </div>

      <div className={classes["invisible-middle-element"]}></div>
      <ColorCodeCopy color={color} />
      {addColorVisible && <AddColor color={color} />}
    </div>
  );
};

export default ColorContainer;