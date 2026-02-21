/*==================================================*/
/*==============Home Page Logic=====================*/
/*==================================================*/


/* ================= IMAGE SLIDER ================= */

const images = ["Photos/garv1.png", "Photos/garv2.jpeg"];
let index = 0;
const mainImg = document.getElementById("mainImg");

setInterval(() => {
  index = (index + 1) % images.length;

  mainImg.style.opacity = 0;

  setTimeout(() => {
    mainImg.src = images[index];
    mainImg.style.opacity = 1;
  }, 750);

}, 10000);


/* ================= SMOOTH SCROLL ================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});


/* ================= CONTACT DROPDOWN ================= */

const toggleBtn = document.getElementById("contactToggleBtn");
const dropdown = document.getElementById("contactDropdown");

toggleBtn.addEventListener("click", function(e) {
  e.stopPropagation();
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

// Close when clicking outside
document.addEventListener("click", function(e) {
  if (!e.target.closest(".contact-wrapper")) {
    dropdown.style.display = "none";
  }
});


/* ================= NETLIFY FORM SUBMIT ================= */

const form = document.getElementById("netlifyContactForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch("/", {
    method: "POST",
    body: formData
  })
  .then(() => {
    const popup = document.getElementById("formSuccessPopup");

    popup.classList.remove("hidden");
    form.reset();

    // Close dropdown after success
    dropdown.style.display = "none";

    setTimeout(() => {
      popup.classList.add("hidden");
    }, 3000);
  })
  .catch(() => alert("Form submission failed"));
});


/* ================= SCROLL TO TOP BUTTON ================= */

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function() {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* ================= INFINITE SLIDER ================= */

const slider = document.querySelector(".upcoming-slider");

if (slider) {

  const cards = [...slider.children];

  // clone for seamless loop
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    slider.appendChild(clone);
  });

  let position = 0;
  let speed = 0.5;
  let paused = false;

  slider.addEventListener("mouseenter", () => paused = true);
  slider.addEventListener("mouseleave", () => paused = false);

  function animate() {
    if (!paused) {
      position -= speed;

      if (Math.abs(position) >= slider.scrollWidth / 2) {
        position = 0;
      }

      slider.style.transform = `translateX(${position}px)`;
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ================= SCROLL REVEAL EFFECT ================= */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){
  reveals.forEach(section => {
    const windowHeight = window.innerHeight;
    const elementTop = section.getBoundingClientRect().top;
    const revealPoint = 100;

    if(elementTop < windowHeight - revealPoint){
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();