"use strict";

const navBar = document.querySelector(".nav_bar");
const navLinks = document.querySelector(".nav_links");
const header = document.querySelector(".header_title");

//NavBar funcionality
document.querySelector(".nav_bar").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav_link")) {
    const adress = e.target.getAttribute("href");
    const destiny = document.querySelector(adress);

    console.log(adress);

    const navHeight = navBar.offsetHeight;
    let offsetY =
      destiny.getBoundingClientRect().top + window.pageYOffset - navHeight;

    //Verification to complement the "TranslateY" used in CSS
    if (
      destiny.classList.contains("section--hidden") &&
      destiny.id != "section--1"
    ) {
      offsetY -= 96;
    } else if (
      destiny.classList.contains("section--hidden") &&
      destiny.id === "section--1"
    ) {
      offsetY -= 160;
    }

    window.scrollTo({ top: offsetY, behavior: "smooth" });
  } else if (e.target.closest(".title_logo")) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

//See more funcionality

document.querySelector(".see_more").addEventListener("click", function (e) {
  e.preventDefault();

  const adress = this.getAttribute("href");
  const destiny = document.querySelector(adress);

  const navHeight = navBar.offsetHeight;
  let offsetY =
    destiny.getBoundingClientRect().top + window.pageYOffset - navHeight;

  //Verification to complement the "TranslateY" used in CSS
  if (
    destiny.classList.contains("section--hidden") &&
    destiny.id === "section--1"
  ) {
    offsetY -= 160;
  } else {
    offsetY -= 56;
  }
  window.scrollTo({ top: offsetY, behavior: "smooth" });
});

const observador = new IntersectionObserver(
  function (entries) {
    const entry = entries[0];

    if (!entry.isIntersecting) {
      navBar.classList.add("sticky");
    } else {
      navBar.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-100px",
  }
);

observador.observe(header);

//slider

const track = document.querySelector(".slider_track");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".btn--left");
const btnRight = document.querySelector(".btn--right");

let currentSlide = 0;
const maxSlide = slides.length;

const goToSlide = (slideIndex) => {
  track.style.transform = `translateX(-${slideIndex * 100}%)`;
  activateDot(slideIndex);
};

btnLeft.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + maxSlide) % maxSlide;

  goToSlide(currentSlide);
});

btnRight.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % maxSlide;
  goToSlide(currentSlide);
});

//slider Dots
const dotsContainer = document.querySelector(".dots");

const createDots = () => {
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    dot.setAttribute("data-slide", i);
    dotsContainer.appendChild(dot);
  });
};

const activateDot = (slideIndex) => {
  document
    .querySelectorAll(".dot")
    .forEach((dot) => dot.classList.remove("dot--active"));

  document
    .querySelector(`.dot[data-slide="${slideIndex}"]`)
    .classList.add("dot--active");
};

dotsContainer.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("dot")) {
    const { slide } = e.target.dataset;
    currentSlide = Number(slide);
    goToSlide(currentSlide);
  }
});

createDots();
goToSlide(0);

//Revealing Sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (observedSections, observer) {
  observedSections.forEach((section) => {
    if (!section.isIntersecting) return;

    section.target.classList.remove("section--hidden");

    observer.unobserve(section.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//Revealing Service_Section

const allServicos = document.querySelectorAll(".servicos");

const revealServiceSections = function (observedServices, observer) {
  observedServices.forEach((service) => {
    if (!service.isIntersecting) return;

    const targetService = service.target;

    const classMap = {
      vertically: "serv--hidden--vertically",
      horizontally1: "serv--hidden--horizontally1",
      horizontally2: "serv--hidden--horizontally2",
    };

    for (const key in classMap) {
      if (targetService.id.includes(key)) {
        targetService.classList.remove(classMap[key]);
        break;
      }
    }

    observer.unobserve(service.target);
  });
};

const serviceObserver = new IntersectionObserver(revealServiceSections, {
  root: null,
  threshold: 0.1,
});

allServicos.forEach(function (service) {
  serviceObserver.observe(service);

  const classMap = {
    vertically: "serv--hidden--vertically",
    horizontally1: "serv--hidden--horizontally1",
    horizontally2: "serv--hidden--horizontally2",
  };

  for (const key in classMap) {
    if (service.id.includes(key)) {
      service.classList.add(classMap[key]);
      break;
    }
  }
});
