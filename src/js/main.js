$(document).ready(function () {

  // Global variables
  // ====================
  var _window = $(window);
  var _document = $(document);
  // ====================


  const popUpLogic = () => {
    if($(window).width() < 768) {
      initPopups();
    } else {
      $.magnificPopup.close();
      $('[popup-js]').off('click');
    }
  };


  // Popup control view
  // ====================
    $(window).on('resize', function () {
      popUpLogic();
    });
  // ====================


  // Pre-loader
  // ====================
    $(window).on('load', function () {
      popUpLogic();

      if($(window).scrollTop() <= 10) {
        $("body").addClass("is-loader");
      } else {
        $("body").removeClass("is-loader");
        $("body, html").removeClass("is-hideScroll");
      }

      setTimeout((e) => {
        $("body").removeClass("is-loader");
      }, 5000);

      setTimeout((e) => {
        $("body, html").removeClass("is-hideScroll");
        // $("body").removeClass("is-loader");
      }, 2250);
    });
  // ====================


  // READY - triggered when PJAX DONE
  // ====================
  function pageReady() {
    svg4everybody();
    initScrollMonitor();
  }
  pageReady();
  // ====================


  // Prevent # behavior
  // ====================
  _document
    .on('click', '[href="#"]', function (e) {
      e.preventDefault();
    });
  // ====================


  // HEADER SCROLL
  // ====================
  function initHeaderScroll() {
    _window.on('scroll load', function(e) {
      let vScroll = _window.scrollTop();
      let header = $('.header').not('.header--static');

      if (vScroll > 15) {
        header.addClass('is-fixed');
      } else {
        header.removeClass('is-fixed');
      }
    });
  }
  initHeaderScroll();

  function initFixedBlock(elemParent, elemChild) {
    _window.on('scroll load', () => {

      let vScroll = _window.scrollTop();
      let yTopElem = $(elemParent).offset().top;
      let xLeftElem = $(elemParent).find(elemChild).offset().left;
      let headerHeight = $('.header')[0].offsetHeight;

      if (vScroll >= (yTopElem - headerHeight)) {
        $(elemParent)
          .addClass("is-fixed")
          .find(elemChild)
          .css(
            {
              "top": headerHeight,
              "left": xLeftElem
            }
          );
      } else {
        $(elemParent)
          .removeClass("is-fixed")
          .find(elemChild)
          .removeAttr("style");
      }
    })
  }
  initFixedBlock("[scroll-container-js]", "[gettingDown-submenu-js]");
  // ====================


  // HAMBURGER TOGGLER
  // ====================
  _document.on('click', '[js-hamburger]', function(e) {
    $(this).toggleClass('is-open');

    $('.header__mobile').toggleClass('is-active fadeIn');
    $("body, html").toggleClass("is-hideScroll");
  });
  // ====================


  // SMOOTH SCROLL
  // ====================
  _document.on("click", "[anchor-js]", function(e) {
    e.preventDefault();

    let linkHref = $(e.currentTarget).attr('href'),
      navHeight = $(".header").outerHeight() || 0,
      topHeightOffset = $(linkHref).offset().top - navHeight;

    $('body, html').animate({
      scrollTop: topHeightOffset
    }, 1000);
  });
  // ====================


  // OBJECT-FIT POLYFILL
  // ====================
  const $someImages = $('[objectFit-js]');
  if($someImages.length) {
    objectFitImages($someImages);
  }
  // ====================


  // Trade sub menu
  // ====================
  _document.on("click", "[trade-data-js]", (e) => {
    e.preventDefault();

    $("[trade-data-js]").removeClass('is-active');
    $(e.target).closest("li").addClass('is-active');
  });
  // ====================


  // Main menu
  // ====================
  _document.on("click", "[menu-js]", (e) => {
    // e.preventDefault();

    $("[menu-js]").removeClass('is-active');
    $(e.target).closest("li").addClass('is-active');
  });
  function closeMobileMenu(){
    $('[js-hamburger]').removeClass('is-active');
    $('.mobile-navi').removeClass('is-active');
  }
  // ====================


  // PARALLAX
  // ====================
  if($("[parallax-js]").length) {
    $(window).stellar({
      positionProperty: 'transform',
      hideDistantElements: false
    });
  }
  // ====================


  // MAIN ABOUT MENU
  // ====================
  _document.on("click", "[mainAbout-js]", (e) => {
    e.preventDefault();

    $("[mainAbout-js]").removeClass('is-active');
    $(e.currentTarget).addClass('is-active');
  });
  // ====================


  // GETTING DOWN BUSINESS MENU
  // ====================
  _document.on("click", ".main__subMenu-link", (e) => {
    e.preventDefault();

    $(".main__subMenu-link").removeClass('is-active');
    $(e.currentTarget).addClass('is-active');
  });
  // ====================


  // MODALS
  // ====================
  function initPopups(){

    let startWindowScroll = 0;

    $('[popup-js]').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'show',
        callbacks: {
          beforeOpen: function(e) {
            startWindowScroll = _window.scrollTop();

            const modal = $("#modal"),
              idx = this.index,
              elem = $(".section__col-" + idx);

            let elemSvg = elem.find(".svg__wrap").html(),
              elemTitle = elem.find("h3").html(),
              elemText = elem.find("p").html();

            modal.find(".modal__svg").html(elemSvg);
            modal.find("h3").text(elemTitle);
            modal.find("p").text(elemText);
          },
          close: function() {
            _window.scrollTop(startWindowScroll);
          }
        }
      });
  }
  // ====================


  // SCROLLMONITOR - WOW LIKE
  // ====================
  function initScrollMonitor(){
    $(".wow").each(function(i, el){

      let elWatcher = scrollMonitor.create( $(el) );

      let delay;

      if ( $(window).width() < 768 ){
        delay = 0
      } else {
        delay = $(el).data('animation-delay');
      }

      let animationClass = $(el).data('animation-class') || "wowFadeUp";
      let animationName = $(el).data('animation-name') || "wowFade";

      elWatcher.enterViewport(function() {
        $(el).addClass(animationClass);
        $(el)
          .css(
            {
              'animation-name': animationName,
              'animation-delay': delay,
              'visibility': 'visible'
            }
          )
          .addClass("animation-go-js");
      });
    });
  }
  // ====================
});
