import HamburgerMenu from "./modules/HamburgerMenu";
import TextEffect from "./modules/TextEffect";
import "./sass/main.scss";
import facebook from "./assets/facebook.svg";
import pinterest from "./assets/pinterest.svg";
import twitter from "./assets/twitter.svg";
import house from "./assets/img.jpg";
// import html from "./index.html";

const hamburgerMenu = new HamburgerMenu(
  ".nav__icon",
  ".nav__link",
  ".nav__list"
);
const heading = new TextEffect(".heading-secondary");
