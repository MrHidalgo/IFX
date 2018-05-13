// Popup control view
// ====================
$(window).on('load resize', function () {
  if($(window).width() < 768) {
    initPopups();
  } else {
    $.magnificPopup.close();
    $('[popup-js]').off('click');
  }
});
// ====================


// Pre-loader
// ====================
$(window).on('load', function () {
  if($(window).scrollTop() <= 10) {
    $("body").addClass("is-loader");
  } else {
    $("body").removeClass("is-loader");
  }

  setTimeout((e) => {
    $("body").removeClass("is-loader");
  }, 5000)
});
// ====================


$(document).ready(function () {

  // Global variables
  // ====================
  var _window = $(window);
  var _document = $(document);
  // ====================


  // READY - triggered when PJAX DONE
  // ====================
  function pageReady() {
    initHeaderScroll();
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

      if (vScroll > 75) {
        header.addClass('is-fixed');
      } else {
        header.removeClass('is-fixed');
      }
    });
  }
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

    let linkHref = $(this).attr('href'),
      navHeight = $(".header").outerHeight(),
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
  if($(".parallax-js").length) {
    const rellax = new Rellax('.parallax-js');
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
