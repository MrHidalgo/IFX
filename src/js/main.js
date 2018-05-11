$(document).ready(function () {

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  // BREAKPOINT SETTINGS
  var bp = {
    mobileS: 375,
    mobile: 568,
    tablet: 768,
    desktop: 992,
    wide: 1336,
    hd: 1680
  };

  var easingSwing = [.02, .01, .47, 1]; // default jQuery easing for anime.js

  ////////////
  // READY - triggered when PJAX DONE
  ////////////
  function pageReady() {
    // legacySupport();
    // updateHeaderActiveClass();
    initHeaderScroll();

    // initSliders();
    initScrollMonitor();
    // initMasks();
    // initLazyLoad();

    // development helper
    // _window.on('resize', debounce(setBreakpoint, 200))

    // AVAILABLE in _components folder
    // copy paste in main.js and initialize here

    // initTeleport();
    // parseSvg();
    // revealFooter();
    // _window.on('resize', throttle(revealFooter, 100));
  }

  // this is a master function which should have all functionality
  pageReady();


  // some plugins work best with onload triggers
  _window.on('load resize', function () {
    if(_window.width() < 768) {
      initPopups();
    } else {
      $.magnificPopup.close();
      $('[popup-js]').off('click');
    }
  });


  //////////
  // COMMON
  //////////

  // function legacySupport(){
  //   // svg support for laggy browsers
  //   svg4everybody();
  //
  //   // Viewport units buggyfill
  //   window.viewportUnitsBuggyfill.init({
  //     force: true,
  //     refreshDebounceWait: 150,
  //     appendToBody: true
  //   });
  // }


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
    e.preventDefault();

    $("[menu-js]").removeClass('is-active');
    $(e.target).closest("li").addClass('is-active');
  });
  // ====================



  // function closeMobileMenu(){
  //   $('[js-hamburger]').removeClass('is-active');
  //   $('.mobile-navi').removeClass('is-active');
  // }

  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering when header is inside barba-container
  // function updateHeaderActiveClass(){
  //   $('.header__menu li').each(function(i,val){
  //     if ( $(val).find('a').attr('href') == window.location.pathname.split('/').pop() ){
  //       $(val).addClass('is-active');
  //     } else {
  //       $(val).removeClass('is-active')
  //     }
  //   });
  // }

  //////////
  // SLIDERS
  //////////

  // function initSliders(){
  //   var slickNextArrow = '<div class="slick-prev"><svg class="ico ico-back-arrow"><use xlink:href="img/sprite.svg#ico-back-arrow"></use></svg></div>';
  //   var slickPrevArrow = '<div class="slick-next"><svg class="ico ico-next-arrow"><use xlink:href="img/sprite.svg#ico-next-arrow"></use></svg></div>'
  //
  //   // General purpose sliders
  //   $('[js-slider]').each(function(i, slider){
  //     var self = $(slider);
  //
  //     // set data attributes on slick instance to control
  //     if (self && self !== undefined) {
  //       self.slick({
  //         autoplay: self.data('slick-autoplay') !== undefined ? true : false,
  //         dots: self.data('slick-dots') !== undefined ? true : false,
  //         arrows: self.data('slick-arrows') !== undefined ? true : false,
  //         prevArrow: slickNextArrow,
  //         nextArrow: slickPrevArrow,
  //         infinite: self.data('slick-infinite') !== undefined ? true : true,
  //         speed: 300,
  //         slidesToShow: 1,
  //         accessibility: false,
  //         adaptiveHeight: true,
  //         draggable: self.data('slick-no-controls') !== undefined ? false : true,
  //         swipe: self.data('slick-no-controls') !== undefined ? false : true,
  //         swipeToSlide: self.data('slick-no-controls') !== undefined ? false : true,
  //         touchMove: self.data('slick-no-controls') !== undefined ? false : true
  //       });
  //     }
  //
  //   })
  //
  //   // other individual sliders goes here
  //   $('[js-myCustomSlider]').slick({
  //
  //   })
  //
  // }

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
  // UI
  ////////////

  // textarea autoExpand
  // _document
  //   .one('focus.autoExpand', '.ui-group textarea', function(){
  //       var savedValue = this.value;
  //       this.value = '';
  //       this.baseScrollHeight = this.scrollHeight;
  //       this.value = savedValue;
  //   })
  //   .on('input.autoExpand', '.ui-group textarea', function(){
  //       var minRows = this.getAttribute('data-min-rows')|0, rows;
  //       this.rows = minRows;
  //       rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
  //       this.rows = minRows + rows;
  //   });

  // Masked input
  // function initMasks(){
  //   $("[js-dateMask]").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
  //   $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});
  // }


  ////////////
  // SCROLLMONITOR - WOW LIKE
  ////////////
  function initScrollMonitor(){
    $('.wow').each(function(i, el){

      var elWatcher = scrollMonitor.create( $(el) );

      var delay;

      if ( _window.width() < 768 ){
        delay = 0
      } else {
        delay = $(el).data('animation-delay');
      }

      var animationClass = $(el).data('animation-class') || "wowFadeUp";

      var animationName = $(el).data('animation-name') || "wowFade";

      elWatcher.enterViewport(throttle(function() {
        $(el).addClass(animationClass);
        $(el).css({
          'animation-name': animationName,
          'animation-delay': delay,
          'visibility': 'visible'
        }).addClass("animation-go-js");
      }, 100, {
        'leading': true
      }));
    });
  }


  //////////
  // LAZY LOAD
  //////////
  // function initLazyLoad(){
  //   _document.find('[js-lazy]').Lazy({
  //     threshold: 500,
  //     enableThrottle: true,
  //     throttle: 100,
  //     scrollDirection: 'vertical',
  //     effect: 'fadeIn',
  //     effectTime: 350,
  //     // visibleOnly: true,
  //     // placeholder: "data:image/gif;base64,R0lGODlhEALAPQAPzl5uLr9Nrl8e7...",
  //     onError: function(element) {
  //         console.log('error loading ' + element.data('src'));
  //     },
  //     beforeLoad: function(element){
  //       // element.attr('style', '')
  //     }
  //   });
  // }

  //////////
  // BARBA PJAX
  //////////

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
  //     })
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
  //         triggerBody()
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

  // some plugins get bindings onNewPage only that way
  // function triggerBody(){
  //   $(window).scroll();
  //   $(window).resize();
  // }

  //////////
  // DEVELOPMENT HELPER
  //////////
  // function setBreakpoint(){
  //   var wHost = window.location.host.toLowerCase()
  //   var displayCondition = wHost.indexOf("localhost") >= 0 || wHost.indexOf("surge") >= 0
  //   if (displayCondition){
  //     console.log(displayCondition)
  //     var wWidth = _window.width();
  //
  //     var content = "<div class='dev-bp-debug'>"+wWidth+"</div>";
  //
  //     $('.page').append(content);
  //     setTimeout(function(){
  //       $('.dev-bp-debug').fadeOut();
  //     },1000);
  //     setTimeout(function(){
  //       $('.dev-bp-debug').remove();
  //     },1500)
  //   }
  // }

});
