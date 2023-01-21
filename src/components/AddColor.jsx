import classes from "./AddColor.module.css";
import { MdOutlineAdd } from "react-icons/md";
import { useColors } from "../store/color-context";

const AddColor = ({ color }) => {
  const [store, dispatch] = useColors();
  const insertColorHandler = (e) => {
    e.preventDefault();
    dispatch({ type: "add-color", payload: {color: color, screenWidth: e.view.innerWidth} });
  };

  return (
    <aside className={classes["add-color"]}>
      <div
        className={classes["add-color__icon"]}
        onClick={(e) => insertColorHandler(e)}
      >
      <MdOutlineAdd />
      </div>
    </aside>
  );
};

export default AddColor;
