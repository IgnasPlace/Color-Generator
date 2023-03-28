import classes from "./Header.module.css";
import { useColors } from "../../store/color-context";
import { useState } from "react";
import { IoIosMenu, IoIosArrowBack } from "react-icons/io";
import FavoriteColorCard from "./FavoriteColorCard";

const Header = ({ windowHeightMinusHeader }) => {
  const [store, dispatch] = useColors();
  const [favoritesVisible, setFavoritesVisible] = useState(false);

  const favoritesClasses = favoritesVisible
    ? `${classes.favorites} ${classes.visible}`
    : `${classes.favorites}`;

  const toggleMenu = () => {
    setFavoritesVisible((prev) => !prev);
  };

  return (
    <>
      <header className={classes.header}>
        <nav className={classes.nav}>
          <menu className={classes.menu}>
            <div onClick={toggleMenu}>
              {favoritesVisible ? <IoIosArrowBack /> : <IoIosMenu />}
            </div>
          </menu>
          {favoritesVisible ? (
            <h3 className={classes.favoriteColorsText}>Favorite Colors</h3>
          ) : (
            <h3 className={classes.favoriteColorsText}>Color Generator</h3>
          )}
        </nav>
        <section
          className={favoritesClasses}
          style={{ minHeight: windowHeightMinusHeader }}
        >
          {store.favoriteColors.length > 0 ? (
            store.favoriteColors.map((favColor) => {
              return <FavoriteColorCard key={favColor} favColor={favColor} />;
            })
          ) : (
            <p className={classes.noFavoriteColors}>
              No favorite colors found.
              <br />
              <br />
              <span>
                Please click the Heart icon if you wish to save the color for
                later.
              </span>
            </p>
          )}
        </section>
      </header>
    </>
  );
};

export default Header;
