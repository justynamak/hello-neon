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

const hamburgerMenu = new HamburgerMenu(
  ".nav__icon",
  ".nav__link",
  ".nav__list"
);

class TextEffect {
  constructor(selector) {
    this.elements;
    this.selector = selector;
    this.elementActive = null;
    this.indexTyping = false;
    this.getElements();
    this.clearText();
    this.checkPosition();
    this.scrollHandler = this.checkPosition.bind(this);
    this.debouncedScrollListener = this.debounce(this.scrollHandler);
    window.addEventListener("scroll", this.debouncedScrollListener);
  }
  getElements() {
    const elems = [...document.querySelectorAll(`${this.selector}`)];
    this.elements = elems.map(elem => {
      const element = {
        selector: document.querySelector(`#${elem.id}`),
        text: document.querySelector(`#${elem.id}`).textContent.trim(),
        currentText: "",
        clearText: false,
        active: false,
        offsetTop: elem.offsetTop,
        offsetHeight: elem.offsetHeight
      };
      return element;
    });
  }

  clearText() {
    this.elements.forEach(elem => {
      if (!elem.active) {
        elem.selector.textContent = "";
        elem.clearText = true;
      }
    });
  }
  removeElement(index) {
    this.elements.splice(index, 1);
  }
  checkPosition() {
    let elements = [...this.elements];

    if (elements.length === 0) {
      window.removeEventListener("scroll", this.debouncedScrollListener);
      clearInterval(this.indexTyping);
      return;
    }
    elements = elements.map(element => {
      let slideInAt = scrollY + window.innerHeight - element.offsetHeight / 2;
      let headingBottom = element.offsetTop + element.offsetHeight;
      let isHalfShown = slideInAt > element.offsetTop;
      let isNotScrolledPast = window.scrollY < headingBottom;

      if (isHalfShown && isNotScrolledPast) {
        element.active = true;
      }
      return element;
    });

    this.elements = elements;
    if (this.checkIsActive() && !this.indexTyping) {
      this.indexTyping = setInterval(this.addLetter.bind(this), 300);
    } else {
      return;
    }
  }
  checkIsActive() {
    const prevActive = this.elements.filter(elem => elem.active);
    this.elementActive = prevActive;
    if (prevActive.length) {
      return true;
    } else {
      return false;
    }
  }

  addLetter() {
    const active = this.elements.forEach((elem, index) => {
      if (elem.active && elem.currentText.length < elem.text.length) {
        elem.currentText += elem.text[elem.currentText.length];
        elem.selector.textContent = elem.currentText;

        if (elem.currentText.length >= elem.text.length) {
          clearInterval(this.indexTyping);
          this.indexTyping = false;

          this.removeElement(index);
        }
      }
    });
  }

  debounce(func, wait = 20, immediate = true) {
    var timeout;
    return () => {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}
const heading = new TextEffect(".heading-secondary");
