
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

    // 追従ボタン用
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
  }

  // 初期表示
  $(window).on("scroll", checkFadeIn);
  checkFadeIn();


  /* ===== アーチテキスト ===== */
  let arcInstance;
  function setArcText() {
    const width = window.innerWidth;

    // widthが768以上（PC）なら300、それ未満（SP）なら200
    let radius = width >= 768 ? 300 : 200;

    // すでにarctextが適用されている場合
    if (arcInstance) {
      // 前の状態を削除
      arcInstance.destroy();
    }
    // arctextを適用
    arcInstance = $('#js-arch').arctext({
      radius: radius
    });
  }
  setArcText();

  // ウィンドウサイズが変更されたときの処理
  $(window).on('resize', function () {
    setArcText();
  });

});
