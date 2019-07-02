class HamburgerMenu {
  constructor(button, items, navList) {
    this.button = document.querySelector(button);
    this.items = document.querySelectorAll(items);
    this.navList = document.querySelector(navList);
    this.btnStyle = window.getComputedStyle(this.button, null);
    this.waiting = false;
    this.endResizeHandle;
    this.button.addEventListener("click", this.toggleNav.bind(this));
    this.items.forEach(item =>
      item.addEventListener("click", this.closeNavAfterClickLink.bind(this))
    );
    window.addEventListener(
      "resize",
      this.closeNavAfterResizeWindow.bind(this)
    );
  }
  toggleHamburger() {
    if (this.navList.classList.contains("nav__list--show")) {
      this.button.classList.add("nav__icon--active");
    } else {
      this.button.classList.remove("nav__icon--active");
    }
  }
  hamburgerIsVisible() {
    return this.btnStyle.getPropertyValue("display") == "block";
  }
  toggleNav() {
    this.navList.classList.toggle("nav__list--show");
    this.toggleHamburger();
  }
  closeNavAfterClickLink() {
    if (this.hamburgerIsVisible()) {
      this.navList.classList.remove("nav__list--show");
      this.button.classList.remove("nav__icon--active");
    }
  }
  closeNavAfterResizeWindow() {
    if (!this.hamburgerIsVisible()) {
      //optymalizacja zdarzenia resize
      if (this.waiting) {
        return;
      }
      this.waiting = true;
      clearTimeout(this.endResizeHandle);

      setTimeout(() => {
        this.waiting = false;
      }, 100);

      this.endResizeHandle = setTimeout(() => {
        this.navList.classList.remove("nav__list--show");
        this.button.classList.remove("nav__icon--active");
      }, 200);
    }
  }
}
export default HamburgerMenu;
