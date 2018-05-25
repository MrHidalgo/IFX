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
  if($("#economicCalendarWidget").length > 0) {
    new economicCalendar({ width: "100%", height: "100%", mode: 2 });
  }
  // ====================

  // Popup control view
  // ====================
    _window.on('resize', function () {
      popUpLogic();
    });
  // ====================


  // Pre-loader
  // ====================
    _window.on('load', function () {
      const _body = $("body");

      let offsetTopValue = _window.scrollTop();

      popUpLogic();

      if(offsetTopValue <= 10) {
        _body.removeClass("is-hidden").addClass("is-loader");
      } else {
        _body.removeClass("is-loader is-hidden");
        _body.addClass("is-visible");
        $("body, html").removeClass("is-hideScroll");
      }

      // animation runtime
      setTimeout((e) => {
        _body.removeClass("is-loader is-hidden").addClass("is-visible");
      }, 5000);

      // animation runtime
      setTimeout((e) => {
        $("body, html").removeClass("is-hideScroll");
        _body.removeClass("is-hidden").addClass("is-visible");
      }, 1500);
    });
  // ====================


  // READY - triggered when PJAX DONE
  // ====================
  function pageReady() {
    svg4everybody();
    initScrollMonitor();
    initModals();
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

      console.log("initFixedBlock");

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
  $("[js-hamburger]").on('click', function(e) {
    $(e.currentTarget).toggleClass('is-open');

    $('.header__mobile').toggleClass('is-active fadeIn');
    $("body, html").toggleClass("is-hideScroll");

    $("[menu-js]").removeClass("is-show-drop");
    $(".menu__dropdown").slideUp().removeClass("is-active-drop");
  });
  // ====================


  // SMOOTH SCROLL
  // ====================
  $("[anchor-js]").on("click", function(e) {
    let linkHref = $(e.currentTarget).attr('href'),
      navHeight = $(".header").outerHeight() || 0,
      topHeightOffset = $(linkHref).offset().top - navHeight;

    $('body, html').animate({
      scrollTop: topHeightOffset
    }, 1000);
  });
  $("[dropdown-btn-js]").on("click", (e) => {
    const currentParent = $(e.target).attr("data-parent"),
      currentHrefVal = $(e.target).attr("href"),
      mainParent = $(e.target).closest("body").attr("data-body");

    let linkHref = $(e.currentTarget).attr('href'),
      navHeight = $(".header").outerHeight() || 0,
      topHeightOffset = $(linkHref).offset().top - navHeight;

    const currentBtn = $(e.target);

    if(currentParent === mainParent) {
      $('body, html').animate({
        scrollTop: topHeightOffset
      }, 1000);
    } else {
      window.location.href = currentParent + ".html" + currentHrefVal;
    }


    $("[js-hamburger]").removeClass('is-open');
    $('.header__mobile').removeClass('is-active fadeIn');


    if(_window.width() <= 1365){
      $("[menu-js]").removeClass("is-show-drop");
      $(".menu__dropdown").slideUp().removeClass("is-active-drop");
    }
  });
  _window.on("load", (e) => {
    const winHref = window.location.href,
      hrefPosition = winHref.indexOf("#"),
      hrefAnchor = winHref.substring(hrefPosition);

    if (hrefPosition !== -1) {
      console.log("hrefPosition: ", hrefPosition);
      let linkHref = $(hrefAnchor),
        navHeight = $(".header").outerHeight() || 0,
        topHeightOffset = $(linkHref).offset().top - navHeight;

      $('body, html').animate({
        scrollTop: topHeightOffset
      }, 1000);
    }
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
  _document.on("click", "[menu-js] > a.menu__link", (e) => {
    const elem = $(e.target);

    if(_window.width() <= 1365){
      elem.closest("[menu-js]").toggleClass("is-show-drop");
      elem.siblings(".menu__dropdown").slideToggle().toggleClass("is-active-drop");
      return false;
    }
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


  // SCROLL SPY
  // ====================
  {

    let lastID;
    let elemID;

    _window.on("load scroll", function () {
      let y = $(this).scrollTop() + 59;

      $('.scrollSpy').each(function () {

        let yElem = $(this).offset().top;

        if (y >= yElem) {
          elemID = $(this).attr('id');

          if (elemID !== lastID) {
            lastID = elemID;

            $(".main__subMenu-link").removeClass("is-active");
            $('[gettingDown-submenu-js] a[href="#' + elemID + '"]').addClass("is-active");
          }
        }
      });
    });

  }
  // ====================


  // DROPDOWN MENU
  // ====================
  $('.menu [menu-js]').hover(function() {
    if(_window.width() >= 1366) {
      $(this).find('.menu__dropdown').stop(true, false).delay(0).fadeIn(250);
    }
  }, function() {
    if(_window.width() >= 1366) {
      $(this).find('.menu__dropdown').stop(true, false).delay(0).fadeOut(250);
    }
  });
  // ====================


  // ACCORDION
  // ====================
  $("[accordion-js]").on("click", (e) => {
    let curElem = $(e.target);

    curElem.closest(".main__accordion-wrap").toggleClass("is-active");
    curElem.closest(".main__accordion-header").siblings(".main__accordion-body").slideToggle();
  });
  // ====================


  // COLLAPSE
  // ====================
  $("[collapse-js]").on("click", (e) => {
    let curElem = $(e.target);

    curElem.closest(".info__collapse").toggleClass("is-active");
    curElem.closest(".info__collapse-header").siblings(".info__collapse-body").slideToggle();
  });
  // ====================


  // INPUT FORM - label animation
  // ====================
  const inputElem = $("[input-js]");
  inputElem.on("focus", (e) => {
    let curElem = $(e.target);

    curElem.closest(".form__field").addClass("is-focus");
  });
  inputElem.on("blur", (e) => {
    let curElem = $(e.target),
      curElemVal = curElem.val().trim();

    if(curElemVal === "") {
      curElem.closest(".form__field").removeClass("is-focus");
    }
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
      removalDelay: 400,
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

          this.st.mainClass = this.st.el.attr('data-effect');
        },
        close: function() {
          _window.scrollTop(startWindowScroll);
        }
      }
    });
  }

  function initModals(){

    let startWindowScroll = 0;

    $('[thoughts-modal-js]').magnificPopup({
      type: 'inline',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 400,
      mainClass: 'show',
      callbacks: {
        beforeOpen: function(e) {
          startWindowScroll = _window.scrollTop();

          console.log("beforeOpen");

          this.st.mainClass = this.st.el.attr('data-effect');
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
