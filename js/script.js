document.addEventListener("DOMContentLoaded", () => {

  /* ハンバーガーメニュー */
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

  /* タブ切り替え + スクロール */
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.tab;
      const targetContent = document.getElementById(targetId);

      // タブのアクティブ切替
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      contents.forEach(c => {
        c.classList.toggle("active", c.id === targetId);
      });

      // ハンバーガーメニューを閉じる
      closeMenu();

      // スクロール：ヘッダー＋タブの高さ分オフセット
      const headerHeight = document.querySelector(".header").offsetHeight;
      const tabsHeight = document.querySelector(".tabs").offsetHeight;
      const offsetTop = targetContent.offsetTop - (headerHeight + tabsHeight);

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    });
  });
});
