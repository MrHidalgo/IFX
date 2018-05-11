$(document).ready(function () {

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);


  ////////////
  // READY - triggered when PJAX DONE
  ////////////
  function pageReady() {
    legacySupport();
    initHeaderScroll();
    initScrollMonitor();
  }

  pageReady();


  // Popup control view
  // ====================
  _window.on('load resize', function () {
    if(_window.width() < 768) {
      initPopups();
    } else {
      $.magnificPopup.close();
      $('[popup-js]').off('click');
    }
  });
  // ====================

  // Pre-loader
  // ====================
  _window.on('load', function () {

    if(_window.scrollTop() === 0) {
      $("body").addClass("is-loader");
    } else {
      $("body").removeClass("is-loader");
    }

    setTimeout((e) => {
      $("body").removeClass("is-loader");
    }, 5000)
  });
  // ====================


  //////////
  // COMMON
  //////////

  function legacySupport(){
    // svg support for laggy browsers
    svg4everybody();

    // Viewport units buggyfill
    window.viewportUnitsBuggyfill.init({
      force: true,
      refreshDebounceWait: 150,
      appendToBody: true
    });
  }


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
    _window.on('scroll load', throttle(function(e) {
      let vScroll = _window.scrollTop();
      let header = $('.header').not('.header--static');

      if (vScroll > 75) {
        header.addClass('is-fixed');
      } else {
        header.removeClass('is-fixed');
      }
    }, 10));
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


  // LOGO: return to homepage
  // ====================
  _document.on('click', "[logo-js]", (e) => {
    $('body, html').animate({
      scrollTop: 0
    }, 1000);
  });
  // ====================


  // SMOOTH SCROLL
  // ====================
  _document.on("click", "[anchor-js]", function(e) {
    e.preventDefault();

    let linkHref = $(this).attr('href'),
      navHeight = $(".header").outerHeight(),
      topHeightOffset = $(linkHref).offset().top;

    $('body, html').animate({
      scrollTop: topHeightOffset
    }, 1000);
  });
  // ====================


  // OBJECT-FIT POLYFILL
  // ====================
  const $someImages = $('[objectFit-js]');
  objectFitImages($someImages);
  // ====================


  // Trade menu
  // ====================
  // _document.on("click", "[trade-menu-js]", (e) => {
  //   e.preventDefault();
  //
  //   $("[trade-menu-js]").removeClass('is-active');
  //   $(e.target).closest("li").addClass('is-active');
  // });
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
  const rellax = new Rellax('.parallax-js', {
    callback: function(positions) {
      console.log(positions);
    }
  });
  // ====================






  //////////
  // MODALS
  //////////
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

  ////////////
  // SCROLLMONITOR - WOW LIKE
  ////////////
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

      elWatcher.enterViewport(throttle(function() {
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
      },
        100,
        {
          'leading': true
        }
      ));
    });
  }

  //////////
  // BARBA PJAX
  //////////
  //
  // Barba.Pjax.Dom.containerClass = "page";
  //
  // var FadeTransition = Barba.BaseTransition.extend({
  //   start: function() {
  //     Promise
  //       .all([this.newContainerLoading, this.fadeOut()])
  //       .then(this.fadeIn.bind(this));
  //   },
  //
  //   fadeOut: function() {
  //     var deferred = Barba.Utils.deferred();
  //
  //     anime({
  //       targets: this.oldContainer,
  //       opacity : .5,
  //       easing: easingSwing, // swing
  //       duration: 300,
  //       complete: function(anim){
  //         deferred.resolve();
  //       }
  //     });
  //
  //     return deferred.promise
  //   },
  //
  //   fadeIn: function() {
  //     var _this = this;
  //     var $el = $(this.newContainer);
  //
  //     $(this.oldContainer).hide();
  //
  //     $el.css({
  //       visibility : 'visible',
  //       opacity : .5
  //     });
  //
  //     anime({
  //       targets: "html, body",
  //       scrollTop: 0,
  //       easing: easingSwing, // swing
  //       duration: 150
  //     });
  //
  //     anime({
  //       targets: this.newContainer,
  //       opacity: 1,
  //       easing: easingSwing, // swing
  //       duration: 300,
  //       complete: function(anim) {
  //         triggerBody();
  //         _this.done();
  //       }
  //     });
  //   }
  // });
  //
  // // set barba transition
  // Barba.Pjax.getTransition = function() {
  //   return FadeTransition;
  // };
  //
  // Barba.Prefetch.init();
  // Barba.Pjax.start();
  //
  // Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {
  //
  //   pageReady();
  //   closeMobileMenu();
  //
  // });
  //
  // // some plugins get bindings onNewPage only that way
  // function triggerBody(){
  //   $(window).scroll();
  //   $(window).resize();
  // }
});
