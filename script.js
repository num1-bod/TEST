const hamburger = document.getElementById("hamburger");
const sideNav = document.getElementById("sideNav");
const closeBtn = document.getElementById("closeBtn");

// ハンバーガークリックで開閉
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  sideNav.classList.toggle("active");
});

// サイドナビのリンクをクリックしたら閉じる
const navLinks = sideNav.querySelectorAll("a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    sideNav.classList.remove("active");
  });
});

// 閉じるボタンをクリックしたら閉じる
closeBtn.addEventListener("click", () => {
  hamburger.classList.remove("active");
  sideNav.classList.remove("active");
});
