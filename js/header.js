document.addEventListener('DOMContentLoaded', () => {
  const tabItems = document.querySelectorAll('.tab-item');
  const tabContents = document.querySelectorAll('.tab-content');
  const tabNavWrapper = document.querySelector('.tab-nav-wrapper');
  const header = document.querySelector('.site-header');

  const hamburger = document.getElementById('hamburger');
  const spNav = document.getElementById('spNav');
  const overlay = document.getElementById('overlay');
  const navLinks = spNav ? spNav.querySelectorAll('a') : [];

  let currentIndex = 0;

  /* ================================
     ▼ タブ固定＆Z-index設定（スマホ対応）
  ================================ */
  function updateTabTop() {
    if (!tabNavWrapper || !header) return;

    tabNavWrapper.style.position = 'sticky';

    // ヘッダーの高さを取得
    let topOffset = header.offsetHeight;

    // SP画面（768px以下）なら必要に応じて調整
    if (window.innerWidth <= 768) {
      topOffset = header.offsetHeight;
    }

    tabNavWrapper.style.top = topOffset + 'px';
    tabNavWrapper.style.zIndex = 1150;

    header.style.zIndex = 1200;
    if (hamburger) hamburger.style.zIndex = 1175;
    if (spNav) spNav.style.zIndex = 1175;
    if (overlay) overlay.style.zIndex = 1140;
  }

  updateTabTop();
  window.addEventListener('resize', updateTabTop);

  /* ================================
     ▼ タブ切替
  ================================ */
  function activateTab(index, scrollTo = true) {
    currentIndex = index;

    tabItems.forEach((t, i) => t.classList.toggle('active', i === index));
    tabContents.forEach((c, i) => c.classList.toggle('active', i === index));

    if (scrollTo && tabContents[index] && header && tabNavWrapper) {
      const targetContent = tabContents[index];
      const rect = targetContent.getBoundingClientRect();
      const scrollTop =
        window.scrollY + rect.top - (header.offsetHeight + tabNavWrapper.offsetHeight);
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  }

  activateTab(0);
  tabItems.forEach((t, i) => t.addEventListener('click', () => activateTab(i)));

  /* ================================
     ▼ ハンバーガーメニュー（SP）
  ================================ */
  function openMenu() {
    if (!hamburger || !spNav || !overlay) return;
    hamburger.classList.add('active');
    spNav.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // 縦スクロール禁止
    updateTabTop(); // 高さ再計算
  }

  function closeMenu() {
    if (!hamburger || !spNav || !overlay) return;
    hamburger.classList.remove('active');
    spNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // 元に戻す
    updateTabTop(); // 高さ再計算
  }

  if (hamburger)
    hamburger.addEventListener('click', () =>
      hamburger.classList.contains('active') ? closeMenu() : openMenu()
    );
  if (overlay) overlay.addEventListener('click', closeMenu);
  navLinks.forEach((link) => link.addEventListener('click', closeMenu));

  /* ================================
     ▼ アンカーリンクでタブ切替＋スクロール補正
  ================================ */
  const scrollOffset = 20;

  function scrollToElement(targetElement) {
    if (!targetElement) return;

    const parentTab = targetElement.closest('.tab-content');
    if (parentTab) {
      const tabIndex = Array.from(tabContents).indexOf(parentTab);
      if (tabIndex !== -1 && !parentTab.classList.contains('active')) {
        activateTab(tabIndex, false);
      }
    }

    const headerHeight = header ? header.offsetHeight : 0;
    const tabHeight = tabNavWrapper ? tabNavWrapper.offsetHeight : 0;
    const elementPosition =
      targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight - tabHeight - scrollOffset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        scrollToElement(targetElement);
        e.preventDefault();
      }
    });
  });

  if (window.location.hash) {
    const targetElement = document.getElementById(window.location.hash.substring(1));
    scrollToElement(targetElement);
  }
});
