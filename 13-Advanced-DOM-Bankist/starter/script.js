"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const navBar = document.querySelector(".nav");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

function removeLazyInit() {
  const observer = new IntersectionObserver(remove, {
    root: null,
    threshold: 0,
    rootMargin: "200px",
  });

  function remove(entries) {
    const [entry] = entries;
    console.log(entry);

    if (!entry.isIntersecting) {
      return;
    }

    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });

    observer.unobserve(entry.target);
  }

  document.querySelectorAll(".lazy-img").forEach((i) => observer.observe(i));
}
removeLazyInit();

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const clicked = document.querySelector(e.target.getAttribute("href"));

    clicked.scrollIntoView({ behavior: "smooth" });
  }
});

document
  .querySelector(".operations__tab-container")
  .addEventListener("click", function (e) {
    const buttons = document.querySelectorAll(".operations__tab");
    const tabs = document.querySelectorAll(".operations__content");
    const targetElement = e.target.closest(".operations__tab");

    if (!targetElement) {
      return;
    }

    buttons.forEach((b) => b.classList.remove("operations__tab--active"));
    targetElement.classList.add("operations__tab--active");

    tabs.forEach((t) => t.classList.remove("operations__content--active"));
    document
      .querySelector(`.operations__content--${targetElement.dataset.tab}`)
      .classList.add("operations__content--active");
  });

btnScrollTo.addEventListener("click", function () {
  document.querySelector("#section--1").scrollIntoView({ behavior: "smooth" });
});

const observer = new IntersectionObserver(addNavBar, {
  root: null,
  threshold: 0,
  rootMargin: `-${navBar.getBoundingClientRect().height}px`,
});

function addNavBar(entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navBar.classList.add("sticky");
  } else {
    navBar.classList.remove("sticky");
  }
}

observer.observe(document.querySelector(".header"));

function buildSliderComponent() {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  let currentSlide = 0;

  function createDots() {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }
  createDots();

  dotContainer.addEventListener("click", function (e) {
    e.preventDefault();
    const slideNumber = e.target.dataset.slide;

    if (!e.target.classList.contains("dots__dot")) {
      return;
    }
    changeSlide(slideNumber);
  });

  slides.forEach((s, i) => (s.style.transform = `translateX(${i * 100}%)`));

  btnRight.addEventListener("click", function (e) {
    e.preventDefault();

    currentSlide++;
    slidesValidation();
    changeSlide(currentSlide);
  });

  btnLeft.addEventListener("click", function (e) {
    e.preventDefault();

    currentSlide--;
    slidesValidation();
    changeSlide(currentSlide);
  });

  function slidesValidation() {
    currentSlide = currentSlide > slides.length - 1 ? 0 : currentSlide;
    currentSlide = currentSlide < 0 ? slides.length - 1 : currentSlide;
  }

  function changeSlide(curSlide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - curSlide) * 100}%)`)
    );
    activateDot(curSlide);
  }

  function activateDot(curSlide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((d) => d.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${curSlide}"]`)
      .classList.add("dots__dot--active");
  }
  activateDot(0);

  window.addEventListener("keydown", function (e) {
    e.preventDefault();

    if (e.key === "ArrowRight") {
      currentSlide++;
    } else if (e.key === "ArrowLeft") {
      currentSlide--;
    }
    slidesValidation();
    changeSlide(currentSlide);
  });
}
buildSliderComponent();

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// const coords = document.querySelector("#section--1").getBoundingClientRect();
// window.scrollTo({
//   left: coords.left + window.pageXOffset,
//   top: coords.top + window.pageYOffset,
//   behavior: "smooth",
// });

// btnScrollTo.onclick = function () {
//   document.querySelector("#section--1").scrollIntoView({ behavior: "smooth" });
// };

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   console.log(e.target, e.currentTarget);
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   console.log(e.target, e.currentTarget);
// });

// document.querySelector(".nav").addEventListener("click", function (e) {
//   console.log(e.target, e.currentTarget);
// });
