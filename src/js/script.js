
jQuery(function ($) {

  /* ===== ページトップボタン ===== */
  var topBtn = $('.js-pagetop');
  topBtn.hide();

  // ページトップボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 70) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // ページトップボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 300, 'swing');
    return false;
  });


  /* ===== スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動。ヘッダーの高さ考慮。) ===== */
  $(document).on('click', 'a[href*="#"]', function () {
    let time = 400;
    let header = $('header').innerHeight();
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $('html,body').animate({ scrollTop: targetY }, time, 'swing');
    return false;
  });


  /* ===== ハンバーガーメニュー ===== */
  $('.js-hamburger').on('click', function (e) {
    e.stopPropagation();
    $(this).toggleClass('is-active');
    $("body").toggleClass("active");
    $('.js-drawer').fadeToggle();

    checkFadeIn();
  });

  // ハンバーガーメニュー内リンク
  let isSp = window.matchMedia('(max-width: 767px)').matches;

  $('.p-header-nav-item__link[href], .p-header-dropmenu__link').on('click', function () {
    // pc時は処理をしせず終了
    if (!isSp) return;

    $('.js-hamburger').toggleClass('is-active');
    $('body').toggleClass('active');
    $('.js-drawer').fadeToggle();

    checkFadeIn();
  });

  // リサイズした際に、isSpを更新する
  window.addEventListener('resize', function () {
    isSp = window.matchMedia('(max-width: 767px)').matches;
  });


  /* ===== アコーディオンメニュー ===== */
  document.querySelectorAll(".p-faq-item__question").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".p-faq-item");
      item.classList.toggle("is-open");
    });
  });


  /* ===== フェードイン ===== */
  function checkFadeIn() {
    const wHeight = $(window).height();
    const wScroll = $(window).scrollTop();

    // 通常フェードイン
    const targets = [
      ".js-mainvisual__textbox",
      ".js-mainvisual__title",
      ".js-image",
      ".js-subtitle",
      ".js-title"
    ].join(", ");
    $(targets).each(function () {
      const bPosition = $(this).offset().top;

      if (wScroll > bPosition - wHeight + 200) {
        if ($(this).hasClass("js-mainvisual__title")) {
          $(this).addClass("u-fadeIn--title");
        } else {
          $(this).addClass("u-fadeIn");
        }
      }
    });

    /* ===== 追従ボタン ===== */
    const fixedBtn = $(".js-fixed");
    const footer = $(".js-footer");

    if (!footer.length) return;
    const footerTop = footer.offset().top;
    const fixedBtnHeight = fixedBtn.outerHeight();
    const windowBottom = wScroll + wHeight;

    // 表示条件
    if ($("body").hasClass("active")) {
      fixedBtn.addClass("is-show");
    } else {
      if (wScroll > 100 && windowBottom < footerTop + fixedBtnHeight) {
        fixedBtn.addClass("is-show");
      } else {
        fixedBtn.removeClass("is-show");
      }
    }

    /* ===== マーカーアニメーション ===== */
    $('.js-marker').each(function (i) {
      const bPosition = $(this).offset().top;

      if (wScroll > bPosition - wHeight + 150) {
        setTimeout(() => {
          $(this).addClass('is-active');
        }, i * 150);
      }
    });

    /* ===== フローカード ===== */
    $('.p-flow-card').each(function (i) {
      const bPosition = $(this).offset().top;

      if (wScroll > bPosition - wHeight + 150) {
        setTimeout(() => {
          $(this).addClass('is-active');
        }, i * 200);
      }
    });
  }

  // 初期表示
  $(window).on("scroll", checkFadeIn);
  checkFadeIn();


  /* ===== アーチテキスト ===== */
  function setArcText() {
    const width = window.innerWidth;

    // widthが600以上なら300、それ未満なら200
    let radius = width >= 600 ? 300 : 200;
    const $target = $('#js-arch');

    // 既に適用されている場合は一度リセット
    if ($target.data('arctext')) {
      $target.arctext('destroy');
    }

    // arctextを適用
    $target.arctext({
      radius: radius
    });
  }

  // 初回実行
  setArcText();

  // ウィンドウサイズが変更されたときの処理
  $(window).on('resize', function () {
    setArcText();
  });


  /* ===== テーブル ===== */
  const scrollArea = document.querySelector('.js-table-scroll');
  const scrollbar = document.querySelector('.p-difference__scrollbar');
  const thumb = document.querySelector('.p-difference__scrollbar-thumb');

  // 要素がない場合は処理しない（エラー防止）
  if (!scrollArea || !scrollbar || !thumb) return;

  function updateScrollbar() {

    // PCのときは強制的に非表示
    if (window.innerWidth >= 768) {
      scrollbar.style.display = 'none';
      return;
    }

    const scrollWidth = scrollArea.scrollWidth;
    const clientWidth = scrollArea.clientWidth;
    const scrollable = scrollWidth - clientWidth;

    // スクロール不要なら非表示
    if (scrollable <= 0) {
      scrollbar.style.display = 'none';
      return;
    }

    scrollbar.style.display = 'block';

    // サムネ幅
    const thumbWidth = Math.max(
      (clientWidth / scrollWidth) * scrollbar.clientWidth,
      40
    );
    thumb.style.width = thumbWidth + 'px';

    // スクロール位置
    const scrollRatio = scrollArea.scrollLeft / scrollable;
    const moveX = (scrollbar.clientWidth - thumbWidth) * scrollRatio;

    thumb.style.transform = `translateX(${moveX}px)`;
  }

  // 初期
  updateScrollbar();

  // スクロール時
  scrollArea.addEventListener('scroll', updateScrollbar);

  // リサイズ時
  window.addEventListener('resize', updateScrollbar);

});
