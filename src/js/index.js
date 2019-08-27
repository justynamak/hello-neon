import HamburgerMenu from "./modules/HamburgerMenu";
import TextEffect from "./modules/TextEffect";
import "../sass/main.scss";
import { SlideIn } from "./modules/Slide-in";
import facebook from "../assets/facebook.svg";
import pinterest from "../assets/pinterest.svg";
import twitter from "../assets/twitter.svg";
import house from "../assets/img.jpg";

const hamburgerMenu = new HamburgerMenu(
  ".nav__icon",
  ".nav__link",
  ".nav__list"
);
const heading = new TextEffect(".heading-secondary");

const slideIn = new SlideIn(".slide-in");
