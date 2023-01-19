import classes from "./App.module.css";
import ColorContainer from "./components/ColorContainer";
import { useColors } from "./store/color-context";

function App() {
  const [store, dispatch] = useColors();

  return (
    <div className={classes.App}>
      {store.colors.map((color) => {
        return <ColorContainer key={color} color={color} />
      })}
    </div>
  );
}

export default App;
