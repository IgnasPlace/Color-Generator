import ColorCodeCopy from "./ColorCodeCopy";
import GenerateColor from "./GenerateColor";
import classes from "./ColorContainer.module.css";
import {MdOutlineAdd} from 'react-icons/md'
import { useColors } from "../store/color-context";

const ColorContainer = ({ color }) => {
  const [store, dispatch] = useColors();
  
  const insertColorHandler = (e) => {
    e.preventDefault()
    dispatch({type: 'add-color', payload: color})
  }

  return (
    <div
      draggable={true}
      className={classes.actions}
      style={{ backgroundColor: color }}
    >
      <GenerateColor color={color} />
      <ColorCodeCopy color={color} />
      <div className={classes['add-color']}>
        <div className={classes['add-color__icon']} onClick={(e) => insertColorHandler(e)}>
          <MdOutlineAdd />
        </div>
      </div>
    </div>
  );
};

export default ColorContainer;
