import classes from "./GenerateColor.module.css";
import { SlRefresh } from "react-icons/sl";
import { useColors } from "../store/color-context";

const COLOR_CHARACTERS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

const GenerateColor = (props) => {
  const [store, dispatch] = useColors();

  const handleGenerateColor = () => {
    let newColor = "#";
    for (let i = 0; i < 6; i++) {
      let symb = Math.floor(Math.random() * 16);
      newColor += COLOR_CHARACTERS[symb];
    }
    dispatch({
      type: "set-color",
      payload: { newColor: newColor, oldColor: props.color },
    });
  };

  return (
    <button draggable="true" onDragStart={
      (e) => e.preventDefault()} className={classes.btn} onClick={handleGenerateColor}>
      <SlRefresh />
    </button>
  );
};

export default GenerateColor;
