// Swiper js
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  // grabCursor: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Nav open close
const body = document.querySelector("body"),
  navMenu = body.querySelector(".menu-content"),
  navOpenBtn = body.querySelector(".navOpen-btn"),
  navCloseBtn = navMenu.querySelector(".navClose-btn");

if (navMenu && navOpenBtn) {
  navOpenBtn.addEventListener("click", () => {
    navMenu.classList.add("open");
    body.style.overflowY = "hidden";
  });
}

if (navMenu && navCloseBtn) {
  navCloseBtn.addEventListener("click", () => {
    navMenu.classList.remove("open");
    body.style.overflowY = "scroll";
  });
}

// Change header bg color
window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  if (scrollY > 5) {
    document.querySelector("header").classList.add("header-active");
  } else {
    document.querySelector("header").classList.remove("header-active");
  }

  // Scroll up button
  const scrollUpBtn = document.querySelector(".scrollUp-btn");

  if (scrollY > 250) {
    scrollUpBtn.classList.add("scrollUpBtn-active");
  } else {
    scrollUpBtn.classList.remove("scrollUpBtn-active");
  }

  // Nav link indicator

  const sections = document.querySelectorAll("section[id]");
  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight,
      sectionTop = section.offsetTop - 100;

    let navId = document.querySelector(
      `.menu-content a[href='#${section.id}']`
    );
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navId.classList.add("active-navlink");
    } else {
      navId.classList.remove("active-navlink");
    }

    navId.addEventListener("click", () => {
      navMenu.classList.remove("open");
      body.style.overflowY = "scroll";
    });
  });
});

function toggleForms() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  } else {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  }
}
function subscribe() {
  const email = document.getElementById("newsletter-email").value;

  fetch("/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Subscribed successfully!");
      } else {
        alert("Subscription failed.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Subscription failed.");
    });
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Perform your login logic here (e.g., send data to server)
  console.log("Logging in:", { email, password });
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  // Perform your registration logic here (e.g., send data to server)
  console.log("Registering:", { name, email, password });
}
// Scroll Reveal Animation
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});

sr.reveal(
  `.section-title, .section-subtitle, .section-description, .brand-image, .tesitmonial, .newsletter 
.logo-content, .newsletter-inputBox, .newsletter-mediaIcon, .footer-content, .footer-links`,
  { interval: 100 }
);

sr.reveal(`.about-imageContent, .menu-items`, { origin: "left" });
sr.reveal(`.about-details, .time-table`, { origin: "right" });
