import ColorCodeCopy from "./ColorCodeCopy";
import GenerateColor from "./GenerateColor";
import RemoveButton from "./RemoveButton";
import AddButton from "./AddButton";
import LikeButton from "./LikeButton";
import classes from "./ColorContainer.module.css";
import { useColors } from "../store/color-context";
import AddColor from "./AddColor";

const ColorContainer = ({ color }) => {
  const [store, dispatch] = useColors();

  const removeColor = () => {
    dispatch({ type: "remove-color", payload: color });
  };

  return (
    <div
      draggable={true}
      className={classes.actions}
      style={{ backgroundColor: color }}
    >
      <div className={classes.controls}>
        <GenerateColor color={color} />
        <div className={classes.controlsButtons}>
          <AddButton color={color} />
          <LikeButton />
          <RemoveButton onClick={removeColor} />
        </div>
      </div>

      <div className={classes["invisible-middle-element"]}></div>
      <ColorCodeCopy color={color} />
      <AddColor color={color} />
    </div>
  );
};

export default ColorContainer;
