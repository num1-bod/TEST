document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header"); // ヘッダーを取得
  const scrollOffset = 70; // リンク位置より上にスクロールさせたい分（px単位）

  // ヘッダーの高さを取得する関数
  const getHeaderHeight = () => header ? header.offsetHeight : 0;

  // ページ内リンク全てに処理を追加
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault(); // デフォルトスクロールを止める

        const headerHeight = getHeaderHeight();
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - scrollOffset; // オフセット追加

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // ページロード時にアンカーがある場合も対応
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      const headerHeight = getHeaderHeight();
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - scrollOffset;

      window.scrollTo({
        top: offsetPosition
      });
    }
  }
});
