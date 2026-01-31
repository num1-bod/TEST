document.addEventListener('DOMContentLoaded', function() {
  const backToTop = document.getElementById('back-to-top');

  backToTop.addEventListener('click', function(e) {
    e.preventDefault(); // デフォルトリンクの動作を止める

    // スクロールのみトップへ移動（タブ状態はそのまま）
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
