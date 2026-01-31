document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  function activateTab(tabId) {
    tabs.forEach(t => t.classList.remove("active"));
    document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add("active");

    contents.forEach(c => {
      c.classList.toggle("active", c.id === tabId);
    });

    const targetContent = document.getElementById(tabId);
    const headerHeight = document.querySelector(".header").offsetHeight;
    const tabsHeight = document.querySelector(".tabs").offsetHeight;
    const offsetTop = targetContent.offsetTop - (headerHeight + tabsHeight);

    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      activateTab(tab.dataset.tab);
    });
  });

  const navLinks = document.querySelectorAll(".pc-nav a, .mobile-menu-links a");
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const tabId = link.dataset.tab;
      if (tabId) activateTab(tabId);
    });
  });
});
