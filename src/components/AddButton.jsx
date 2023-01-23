import { VscAdd } from "react-icons/vsc";
import { useColors } from "../store/color-context";

const AddButton = ({ color, btnColor }) => {
  const [store, dispatch] = useColors();
  const insertColorHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "add-color",
      payload: { color: color, screenWidth: e.view.innerWidth },
    });
  };
  return (
    <div className="control-button" style={{ color: btnColor }} onClick={(e) => insertColorHandler(e)}>
      <VscAdd />
    </div>
  );
};

export default AddButton;
