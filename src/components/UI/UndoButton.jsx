import { IoReturnUpBack } from "react-icons/io5";

const UndoButton = ({ color, btnColor }) => {

  return (
    <div
      className="control-button"
      style={{ color: btnColor }}
    >
      <IoReturnUpBack />
    </div>
  );
};

export default UndoButton;
