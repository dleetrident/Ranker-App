import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.headerSection}>
      <img
        className={classes.headerLogo}
        src={require(`../resources/images/Header.PNG`)}
        alt="VS"
      />
    </header>
  );
};

export default Header;
