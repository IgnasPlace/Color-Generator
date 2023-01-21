import { useReducer, createContext, useContext } from "react";
import { GenerateColor } from "../utilities/generate-color";

const defaultColors = { colors: ["#34EFA1", "#BD5997", "#FAFAB4", "#EA5963"] };
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
        newColorArray.findIndex((color) => color === action.payload.color) + 1;
      const newColor = GenerateColor();
      newColorArray.splice(targetIndex, 0, newColor);
      if (
        action.payload.screenWidth < 1600 &&
        state.colors.length > 5
      ) {
        return {
          ...state,
        };
      }
      if (state.colors.length > 7) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        colors: newColorArray,
      };
    case "remove-color":
      const revemedColorsArray = state.colors.filter(
        (color) => color !== action.payload
      );
      if (state.colors.length < 3) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        colors: revemedColorsArray,
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