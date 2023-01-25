import { useReducer, createContext, useContext } from "react";
import { GenerateColor } from "../utilities/generate-color";

const localStorageFavColors = JSON.parse(localStorage.getItem('favoriteColors'));

const defaultColors = {
  colors: ["#34EFA1", "#BD5997", "#FAFAB4", "#EA5963"],
  firstSwapColor: null,
  secondSwapColor: null,
  favoriteColors: localStorageFavColors || [],
};
// const defaultColors = {
//   colors: [GenerateColor(), GenerateColor(), GenerateColor(), GenerateColor()], firstSwapColor: null, secondSwapColor: null
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
      if (action.payload.screenWidth < 1200 && state.colors.length > 4) {
        return {
          ...state,
        };
      }
      if (action.payload.screenWidth < 1600 && state.colors.length > 5) {
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
      if (state.colors.length < 2) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        colors: revemedColorsArray,
      };

    case "swapColors":
      return {
        ...state,
        colors: action.payload,
      };

    case "setFirstSwapColor":
      return {
        ...state,
        firstSwapColor: action.payload,
      };

    case "setSecondSwapColor":
      return {
        ...state,
        secondSwapColor: action.payload,
      };

    case "addToFavorites":
      const idx = state.favoriteColors.findIndex(
        (color) => color === action.payload
      );
      if (idx > -1) {
        return {
          ...state,
        };
      }
      localStorage.setItem('favoriteColors', JSON.stringify([action.payload, ...state.favoriteColors]))
      return {
        ...state,
        favoriteColors: [action.payload, ...state.favoriteColors],
      };

    case "remove-favorite-color":
      const favColorsArray = state.favoriteColors.filter(
        (color) => color !== action.payload
      );
      localStorage.setItem('favoriteColors', JSON.stringify(favColorsArray))
      return {
        ...state,
        favoriteColors: favColorsArray,
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
