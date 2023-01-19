import { useReducer, createContext, useContext } from "react";
import { GenerateColor } from "../utilities/generate-color";

const defaultColors = {colors: ["#34efa1", "#bd5997", "#fafab4", "#ea5963"]};
// const defaultColors = {
//   colors: [GenerateColor(), GenerateColor(), GenerateColor(), GenerateColor()],
// };

const colorReducer = (state, action) => {
  switch (action.type) {
    case "set-color":
      const newColors = state.colors.map((color) => {
        return color === action.payload.oldColor
          ? action.payload.newColor
          : color;
      });
      return {
        ...state,
        colors: newColors,
      };
    case "add-color":
      const newColorArray = [...state.colors];
      const targetIndex =
        newColorArray.findIndex((color) => color === action.payload) + 1;
      const newColor = GenerateColor();
      newColorArray.splice(targetIndex, 0, newColor);
      if (state.colors.length > 7) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        colors: newColorArray,
      };
    default:
      return {
        ...state,
      };
  }
};

export const ColorContext = createContext(defaultColors);

const Color = ({ children }) => {
  const [state, dispatch] = useReducer(colorReducer, defaultColors);

  return (
    <ColorContext.Provider value={[state, dispatch]}>
      {children}
    </ColorContext.Provider>
  );
};

export default Color;

export const useColors = () => {
  const [store, dispatch] = useContext(ColorContext);
  return [store, dispatch];
};
