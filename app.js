const sidebar = document.querySelector(".sidebar");
const toggleBtn = document.querySelector(".toggle");
const menuText = document.querySelector(".menu");
const date = document.querySelector(".date");

const currentYear = new Date().getFullYear();
date.textContent = currentYear;
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("hide");
  menuText.textContent = sidebar.classList.contains("hide") ? "menu" : "cancel";
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll("section");

sections.forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top center+=100",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
  });
});