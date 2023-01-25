import classes from "./App.module.css";
import ColorContainer from "./components/ColorContainer";
import { useColors } from "./store/color-context";
import { useState, useEffect } from "react";
import Header from "./components/UI/Header";

function App() {
  const [store, dispatch] = useColors();
  const [windowHeight, setWindowHeight] = useState("");

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleResize = () => {
    const headerHeight = getComputedStyle(document.querySelector(':root')).getPropertyValue('--header-height');
    setWindowHeight(`calc(${window.innerHeight}px - ${headerHeight})`);
  };

  return (
    <>
      <Header />
      <div className={classes.App} style={{ height: windowHeight }}>
        {store.colors.map((color) => {
          return <ColorContainer key={color} color={color} />;
        })}
      </div>
    </>
  );
}

// style={{ height: windowHeight }}  <<< on App

export default App;
