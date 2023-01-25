import { useColors } from "../../store/color-context";
import { RxCross1 } from "react-icons/rx";


const RemoveButton = ({ color, btnColor }) => {
  const [store, dispatch] = useColors();

  const removeColor = () => {
    dispatch({ type: "remove-color", payload: color });
  };

  return (
    <div
      onClick={removeColor}
      className="control-button"
      style={{ color: btnColor }}
    >
      <RxCross1 />
    </div>
  );
};

export default RemoveButton;
