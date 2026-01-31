document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const overlay = document.getElementById("overlay");

  const openMenu = () => {
    hamburger.classList.add("active");
    mobileNav.classList.add("active");
    overlay.classList.add("active");
  };
  const closeMenu = () => {
    hamburger.classList.remove("active");
    mobileNav.classList.remove("active");
    overlay.classList.remove("active");
  };

  hamburger.addEventListener("click", e => {
    e.stopPropagation();
    hamburger.classList.contains("active") ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);
  document.addEventListener("click", closeMenu);
  mobileNav.addEventListener("click", e => e.stopPropagation());
});
