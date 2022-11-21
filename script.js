"use strict";

//animated hamburger button
const menuHamburgerBtn = document.querySelector("#toggle");
//console.log("menuHamburgerBtn", menuHamburgerBtn);

const hamburger = document.getElementById("hamburger");
//console.log(hamburger);

const navMenu = document.getElementById("nav-menu");

const menuItems = document.querySelector("#overlay");
//console.log(menuItems);

const toggleMenu = (e) => {
  e.preventDefault();
  menuItems.classList.toggle("open");
  menuHamburgerBtn.classList.toggle("full-menu");
};

menuHamburgerBtn.addEventListener("click", toggleMenu);
document.querySelectorAll(".navigation__link").forEach((lnk) => {
  lnk.addEventListener("click", () => {
    menuHamburgerBtn.classList.remove(".open");
  });
});

//scroll - change hamburger button color

const rootElement = document.documentElement;
let lastKnownScrollPosition = 0;
const darkBgSections = document.querySelectorAll(".dark-bg");
const darkBgSectionsArr = [...darkBgSections];

const handleScrollHamburgerButton = () => {
  lastKnownScrollPosition = Math.ceil(window.scrollY);
  const menuBtn = document.querySelector(".navigation__button");
  const menuBtnScrollHeight =
    Math.ceil(menuBtn.getBoundingClientRect().y) + menuBtn.offsetHeight;

  const foundDarkSection = () => {
    let foundSection = false;
    darkBgSectionsArr.forEach((section) => {
      const sectionTop = Math.abs(section.offsetTop) - menuBtnScrollHeight;
      const sectionBottom =
        Math.abs(section.offsetTop) +
        section.offsetHeight -
        menuBtnScrollHeight;

      if (
        lastKnownScrollPosition >= sectionTop &&
        lastKnownScrollPosition < sectionBottom
      ) {
        foundSection = true;
      }
    });
    return foundSection;
  };
  //console.log(foundDarkSection());
  if (foundDarkSection()) {
    menuBtn.style.color = "red";
    // console.log("if");
  } else {
    menuBtn.style.color = "green";
    // console.log("else");
  }

  //
  // if (
  //   lastKnownScrollPosition >= sectionTop &&
  //   lastKnownScrollPosition < sectionBottom
  //   && !foundSection
  // ) {
  //   foundSection = true;
  //   menuBtn.style.color = "red"
  // } else {
  //   menuBtn.style.color = "green";
  //   // console.log("else");
  // };

  //

  // console.log({ menuBtnScrollHeight });
  // console.log(
  //   "menuBtn.getBoundingClientRect().y",
  //   menuBtn.getBoundingClientRect().y
  // );
  // console.log("menuBtn.offsetHeight", menuBtn.offsetHeight);
  // console.log("menuBtn.offsetTop", menuBtn.offsetTop);
};

window.addEventListener("scroll", (e) => handleScrollHamburgerButton());
window.addEventListener("load", (e) => handleScrollHamburgerButton());

//gallery scroll-up
const appear = document.querySelectorAll(".appear");

const cb = (entries) => {
  entries.forEach((entry) => {
    entry.isIntersecting
      ? entry.target.classList.add("inview")
      : entry.target.classList.remove("inview");
  });
};

const io = new IntersectionObserver(cb);
for (const el of appear) {
  io.observe(el);
}

//back to top button
const scrollToTop = () => {
  const scrollProgress = document.getElementById("progress");

  const progressValue = document.getElementById("progress-value");

  let position = rootElement.scrollTop;
  //console.log("position=", position);

  let calcHeight = rootElement.scrollHeight - rootElement.clientHeight;
  // console.log("calcHeight=", calcHeight);

  let scrollValue = Math.round((position * 100) / calcHeight);

  position > 100
    ? (scrollProgress.style.display = "grid")
    : (scrollProgress.style.display = "none");

  scrollProgress.addEventListener("click", () => {
    rootElement.scrollTop = 0;
  });
  scrollProgress.style.background = `conic-gradient(#ffffff ${scrollValue}%, #929292 ${scrollValue}%)`;
};

window.addEventListener("scroll", (e) => scrollToTop());
window.addEventListener("load", (e) => scrollToTop());

//gallery picture preview modal
const images = document.querySelectorAll(".home-img-dt");
//console.log(images);
let imgArray = [...images];
// console.log(imgArray);

const overlays = document.querySelectorAll(".gallery__overlay");
let overlaysArray = [...overlays];

const handleCreatePicturePriview = (e) => {
  const srcImage = e.target.previousElementSibling.getAttribute("src");
  const galleryContainer = document.querySelector(".gallery__container");
  console.log(galleryContainer);
  console.log(srcImage);

  // console.log(e.target);
  const picturePriviewContent = `
    <div class="picturePriview">
      <button class="arrow-btn arrow-btn--left"">
        <i class="fa-solid fa-left-long arrow picturePriview-prev"></i>
      </button>
      <div class="picturePriview-content">        
      <img
        src="${srcImage}"
        alt=""
        class="picturePriview-image"
      />                  
      </div>
      <button class="arrow-btn arrow-btn--right">
          <i class="fa-solid fa-right-long arrow picturePriview-next"></i>
      </button>
    </div>
    `;

  galleryContainer.insertAdjacentHTML("beforeend", picturePriviewContent);
};

overlaysArray.forEach((item) => {
  console.log(item);
  item.addEventListener("click", handleCreatePicturePriview);
});

let index = 0;

const handleOutPicturePriview = (e) => {
  const lightImage = document.querySelector(".picturePriview-image");
  // console.log(lightImage);
  let imageSrc = "";

  const ChangeLinkImage = (index, lightImage) => {
    const newLink = imgArray[index].getAttribute("src");
    lightImage.setAttribute("src", newLink);
  };

  if (!lightImage) return;

  if (e.target.matches(".picturePriview")) {
    const body = e.target.parentNode;
    body.removeChild(e.target);
  } else if (e.target.matches(".picturePriview-next")) {
    imageSrc = lightImage.getAttribute("src");

    index = imgArray.findIndex((item) => item.getAttribute("src") === imageSrc);

    index = index + 1;

    let firstImage = 0;
    if (index > images.length - 1) {
      index = firstImage;
    }

    ChangeLinkImage(index, lightImage);
  } else if (e.target.matches(".picturePriview-prev")) {
    imageSrc = lightImage.getAttribute("src");

    index = imgArray.findIndex((item) => item.getAttribute("src") === imageSrc);

    index = index - 1;

    let lastImage = images.length - 1;
    if (index < 0) {
      index = lastImage;
    }

    ChangeLinkImage(index, lightImage);
  }
};

window.addEventListener("click", handleOutPicturePriview);

//TESTIMONIAL mobile

const btnLeft = document.querySelector(".arrow-btn--left");
const btnRight = document.querySelector(".arrow-btn--right");
const carouselImgList = document.querySelector(".carousel-mob__list");
const carouselItemName = document.querySelector(".carousel-mob__heading-title");
const carouselItemJob = document.querySelector(".carousel-mob__heading-subtitle");
const carouselItemText = document.querySelector(".carousel-mob__paragraph-text-italic");

//Testimonial Data
const testimonials = [
  {
    name: "Karthik Rao",
    job: "Head of Technology, Eton Institute",
    image:
      "https://www.badinsoft.com/wp-content/themes/badin-soft-theme/assets/badin-photo/testimonials/home/1.png",
    testimonial:
      "Badin and team take complete ownership of the given project or tasks. I would like to mention that the team is very honest and sincere. If a mistake is made, there are no excuses but acceptance and continuing to rectify the situation with the best possible solution and making sure we are satisfied. This comes because of a strong technical presence in the team. We at Eton Institute are happy with the service provided and continue the relationship with BadinSoft in the long run.",
  },
  {
    name: "Dragan Andrejić",
    job: "Software Team Leader, Telekom Srbija",
    image:
      "https://www.badinsoft.com/wp-content/themes/badin-soft-theme/assets/badin-photo/testimonials/home/2.png",
    testimonial:
      "My personal impression after a year and a half of working with the Badin team is that the guys,without having previously encountered the TELCOindustry, easily understood its processes andaccepted to change our in-house solution. The impression is that they work quickly and complement each other perfectly as a team. Their code complies with the requirements. I know that the way requests are received is not the best practice, nor is the frequency and timing of hanges of requests, and that it may bother the guys, but they still remain professionals who try to meet the user requirements as much as they can.",
  },
  {
    name: "Nikola Ristović",
    job: "Head of Satellite Applications Unit, Raiffeisen bank",
    image:
      "https://www.badinsoft.com/wp-content/themes/badin-soft-theme/assets/badin-photo/testimonials/home/3.png",
    testimonial:
      "In our collaboration, we most appreciate your flexibility and ability to quickly adapt to changing customer requirements. We also appreciate the demonstrated competence in all spheres. We would describe the cooperation with you as very motivating and useful for us (hopefully for you too) as we have learned a lot during this project.",
  },
  {
    name: "Geordie Lindsay-Russell",
    job: "Business Analyst Project Management",
    image:
      "https://www.badinsoft.com/wp-content/themes/badin-soft-theme/assets/badin-photo/testimonials/home/4.png",
    testimonial:
      "I have been with Badin since 2017 and had aprivilege to influence our culture, contribute to the career development of my colleagues, and create good systems. The main advantage, and the main reason why I am here is the freedom to create, influence, contribute, and leave my mark.",
  },
  {
    name: "Fangsin Lim",
    job: "COO Tranxactor",
    image:
      "https://www.badinsoft.com/wp-content/themes/badin-soft-theme/assets/badin-photo/testimonials/home/5.png",
    testimonial:
      "Tranxactor has worked with the team behind Badin since the beginning. This highly talented team became the backbone of the software development and support for Tranxactor's product suite as well as the daily technical support for many of our clients around the world. The team works as much a partner as a service provider to Tranxactor, and continues to provide a range of critical services to support Tranxactor and its global clients. We have no hesitation in recommending Badin as a solid and reliable software partner.",
  },
];

let imgList = [];

  testimonials.forEach((el) => {
    const imgEl = el.image;
    return imgList.push(imgEl);
    ` <li
    class="carousel-mob__item activeItem"
    data-id="#carousel-item1"
  >
    <img
      src="https://www.badinsoft.com/wp-content/themes/badin-soft-theme/assets/badin-photo/testimonials/home/1.png"
    />
  </li>`
  });



console.log(imgList);
const lrButtonActive = () => {
  if (carouselImgArr[0].classList.contains("activeItem")) {
    btnLeft.setAttribute("disabled", "disabled");
    btnLeft.firstElementChild.style.color = "#cbcaca";
    return;
  } else {
    btnLeft.removeAttribute("disabled");
    btnLeft.firstElementChild.style.color = "#317ade";
  }

  if (
    carouselImgArr[carouselImgArr.length - 1].classList.contains("activeItem")
  ) {
    btnRight.setAttribute("disabled", "disabled");
    btnRight.firstElementChild.style.color = "#cbcaca";
    return;
  } else {
    btnRight.removeAttribute("disabled");
    btnRight.firstElementChild.style.color = "#317ade";
  }
};
index = 0;
let imgXPosition = 0;
const imgScaleValue = 1.5;

btnLeft.addEventListener("click", () => {
  console.log("left button clicked");
  imgXPosition -= 100;
  carouselImgArr.forEach((ci) => {
    ci.style.transform = `translateX(-${imgXPosition}px)`;
    if (ci.classList.contains("activeItem")) {
      ci.previousElementSibling.classList.add("activeItem");
      ci.style.transform = `translateX(-${imgXPosition}px) scale(1)`;
      ci.previousElementSibling.style.transform = `translateX(-${imgXPosition}px) scale(${imgScaleValue})`;
    }

    carouselText.forEach((ct) => {
      ct.classList.remove("activeItem");
    });

    ci.classList.remove("activeItem");
  });
  lrButtonActive();
});

btnRight.addEventListener("click", () => {
  console.log("right button clicked");
  imgXPosition += 100;
  let carouselImgId;
  carouselImgArr.forEach((ci) => {
    ci.style.transform = `translateX(-${imgXPosition}px)`;
  });
  for (let i = 0; i < carouselImgArr.length - 1; i++) {
    if (carouselImgArr[i].classList.contains("activeItem")) {
      carouselImgArr[i].nextElementSibling.classList.add("activeItem");
      carouselImgArr[
        i
      ].nextElementSibling.style.transform = `translateX(-${imgXPosition}px) scale(${imgScaleValue})`;

      carouselText.forEach((ct) => {});
      carouselImgArr[i].classList.remove("activeItem");
      break;
    }
  }
  lrButtonActive();
});

//TRUSTEDBY animation
const dataTrustedbyAnimation = document.querySelector(
  ".trustedby-dt__image-box-visible"
);
console.log({ dataTrustedbyAnimation });

const dataTrustedbyImg = document.querySelectorAll(".trustedby-dt__image");
console.log({ dataTrustedbyImg });

const dataTrustedbyImgArr = [...dataTrustedbyImg];
console.log({ dataTrustedbyImgArr });

const clonedImgArr = dataTrustedbyImgArr.map((data) => data.cloneNode(true));

const animationInterval = 4000;
const animationTimeout = 1000;

const showClients = () => {
  for (let i = 0; i < 5; i++) {
    if (clonedImgArr.length % 10 !== 0 && clonedImgArr.length % 10 !== 5) {
      clonedImgArr.push(clonedImgArr[i]);
    }
    dataTrustedbyAnimation.appendChild(clonedImgArr[i]);
  }
};

const startFadeAnimation = () => {
  dataTrustedbyAnimation.innerHTML = "";
  showClients();
  setInterval(() => {
    dataTrustedbyAnimation.classList.remove("fade-in");
    dataTrustedbyAnimation.classList.add("fade-out");
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        dataTrustedbyAnimation.removeChild(clonedImgArr[i]);
      }
      for (let i = 0; i < 5; i++) {
        const clients = clonedImgArr.shift();
        clonedImgArr.push(clients);
      }
      for (let i = 0; i < 5; i++) {
        dataTrustedbyAnimation.classList.remove("fade-out");
        dataTrustedbyAnimation.classList.add("fade-in");
        dataTrustedbyAnimation.appendChild(clonedImgArr[i]);
      }
    }, animationTimeout);
  }, animationInterval);
};

window.addEventListener("DOMContentLoaded", startFadeAnimation);
