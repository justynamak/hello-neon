import { debounce } from "./debounce";

export class SlideIn {
  constructor(selector) {
    this.sliderImages = document.querySelectorAll(selector);
    this.isHalfShown = null;
    this.isNotScrolledPast = null;

    window.addEventListener("scroll", debounce(this.getParameters.bind(this)));
  }
  getParameters() {
    this.sliderImages.forEach(sliderImage => {
      const { height } = sliderImage.getBoundingClientRect();
      const slideInAt = window.scrollY + window.innerHeight - height / 2;
      const imageBottom = sliderImage.offsetTop + height;

      this.isHalfShown = slideInAt > sliderImage.offsetTop;
      this.isNotScrolledPast = window.scrollY < imageBottom;

      this.setEffect(sliderImage);
    });
  }
  setEffect(sliderImage) {
    if (this.isHalfShown && this.isNotScrolledPast) {
      sliderImage.classList.add("active");
    } else {
      sliderImage.classList.remove("active");
    }
  }
}
