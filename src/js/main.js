;(function($) {
  "use strict";

  /*
   * Global Variables
   */

  var search = $('.input-search');
  var searchResult = $('.search-result');
  var loadIcon = $('.load-icon');
  var datepickerInput = $('.search-group .datepicker-input');
  var datepickerInputLanding = $('.booking-table .datepicker-input');
  var input = $('.input-number');

  /*
   * Custom Functions
   */

  $.fn.rate = function() {
    return this.each(

      function(i, e) {
        var data = $(e).data('rate');
        var rate = (Math.round(data * 2) / 2).toFixed(1);
        var src = './images/icons/rate/' + rate + '.svg';
        $(e).html($('<img class="rate-image" src="' + src + '"/>'));
      }

    );
  };

  $.fn.stars = function() {
    return this.each(

      function(i, e) {
        var data = $(e).data('stars');
        var rate = (Math.round(data * 2) / 2).toFixed(1);

        if ( !isNaN(rate) && rate.toString().indexOf('.5') != -1 ) {
          for (i = 0; i < rate - 1; i++) {
            $(this).children('li').eq(i).removeClass('hidden');
          }
          $(this).children('li:last-child').removeClass('hidden');
        } else {
          for (i = 0; i < parseInt(rate); i++) {
            $(this).children('li').eq(i).removeClass('hidden');
          }
        }
      }

    );
  };

  /*
   * Main Functions
   */

  function reinitMap() {
    if ( $('#map').length ) {
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center);
    }
  }

  function hideMobileNav() {
    $('.navbar').removeClass('open-menu');
    $('body').removeClass('opened-menu');
    $('.black-bg-search').fadeOut(200).removeAttr('style')
  }

  function hideMobileFilter() {
    $('.navbar-header').removeClass('open-filter');
    $('body').removeClass('opened-filter');
    $('.black-bg-search').fadeOut(200).removeAttr('style')
  }

  function hideMapItemBlock() {
    $('.map-item-block').hide("slide", { direction: "right" }, 200);
  }

  function sidebarPosition() {
    if ( $(window).width() < 768 ) {
      $('.sidebar-filter').appendTo('#filter_mobile');
    } else {
      $('.sidebar-filter').insertBefore($('.main-wrapper'));
    }
  }

  function listView() {
    $('.list-btn').addClass('active');
    $('.grid-btn').removeClass('active');
    $('.grid').addClass('list-view');
    AOS.refresh();
  }

  function gridView() {
    $('.grid-btn').addClass('active');
    $('.list-btn').removeClass('active');
    $('.grid').removeClass('list-view');
    AOS.refresh();
  }

  function initAOS() {
    if ( $(window).width() > 1199 ) {
      AOS.init();
    }
  }

  function setMapWrapperHeight() {
    var mainWrapperHeight = $('.main-wrapper').height();
    $('.sidebar-filter').height(mainWrapperHeight);
    if ( $(window).width() > 991 ) {
      $('.map-wrapper').height(mainWrapperHeight);
    } else {
      $('.map-wrapper').height( $('.sidebar-filter').height()/3.5 );
    }
  }

  function scrolledElement(scrollPos, target, targetLine, targetSpace, targetEnd) {
    var width = $('.grid').width();
    var left;
    if ( $('.sidebar-filter').hasClass('to-left') ) {
      left = $('.grid').offset().left;
    } else {
      left = $('.sidebar-filter').offset().left + $('.sidebar-filter').width() + 15; // +15 — move left on half of padding
    }
    if ( !$('.myonoffswitch').prop('checked') ) {
      if ( scrollPos.scrollTop() >= targetLine && !$(target).hasClass('closed') && scrollPos.scrollTop() <= targetEnd ) {
        $(targetSpace).height(113);
        $(target).addClass('scrolled').css({
          left: left,
          width: width
        });
        console.log('scroll position > target position');
      } else if ( scrollPos.scrollTop() < targetLine || scrollPos.scrollTop() > targetEnd ) {
        $(target).removeClass('scrolled closed').css({
          left: 'initial',
          width: '100%'
        });
        $(targetSpace).height('initial');
        console.log('scroll position < target position');
      }
    }
  }

  function destroyScrolledElement(target, targetSpace) {
    $(target).removeClass('scrolled closed').css({
      left: 'initial',
      width: '100%'
    });
    $(targetSpace).height('initial');
  }

  function toggleFocus(e) {
    if ( e.type == 'keyup' ) {
      searchResult.fadeIn(200);
      $('.black-bg-search').fadeIn(200);
    }
    else {
      searchResult.fadeOut(200);
      $('.black-bg-search').fadeOut(200);
    }
    if(e.which == 13) {
      searchResult.fadeOut(200);
      $('.black-bg-search').fadeOut(200);
    }
  }
  
  function likesCounter(bool) {
    var negative = $('.likes-counter .negative');
    var positive = $('.likes-counter .positive');
    if ( bool ) {
      $(positive).html(function(i, val) {
        return +val + 1
      });
      $(positive).addClass('pulse');
      setTimeout(function() {
        $(positive).removeClass('pulse');
      }, 3000);
    } else {
      $(negative).html(function(i, val) {
        return +val + 1
      });
      $(negative).addClass('pulse');
      setTimeout(function() {
        $(negative).removeClass('pulse');
      }, 3000);
    }
  }

  // photoswipe
  var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
      var thumbElements = el.childNodes,
        numNodes = thumbElements.length,
        items = [],
        figureEl,
        linkEl,
        size,
        item;

      for(var i = 0; i < numNodes; i++) {

        figureEl = thumbElements[i]; // <figure> element

        // include only element nodes
        if(figureEl.nodeType !== 1) {
          continue;
        }

        linkEl = figureEl.children[0]; // <a> element

        size = linkEl.getAttribute('data-size').split('x');

        // create slide object
        item = {
          src: linkEl.getAttribute('href'),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10)
        };



        if(figureEl.children.length > 1) {
          // <figcaption> content
          item.title = figureEl.children[1].innerHTML;
        }

        if(linkEl.children.length > 0) {
          // <img> thumbnail element, retrieving thumbnail url
          item.msrc = linkEl.children[0].getAttribute('src');
        }

        item.el = figureEl; // save link to element for getThumbBoundsFn
        items.push(item);
      }

      return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
      return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;

      var eTarget = e.target || e.srcElement;

      // find root element of slide
      var clickedListItem = closest(eTarget, function(el) {
        return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
      });

      if(!clickedListItem) {
        return;
      }

      // find index of clicked item by looping through all child nodes
      // alternatively, you may define index via data- attribute
      var clickedGallery = clickedListItem.parentNode,
        childNodes = clickedListItem.parentNode.childNodes,
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;

      for (var i = 0; i < numChildNodes; i++) {
        if(childNodes[i].nodeType !== 1) {
          continue;
        }

        if(childNodes[i] === clickedListItem) {
          index = nodeIndex;
          break;
        }
        nodeIndex++;
      }



      if(index >= 0) {
        // open PhotoSwipe if valid index found
        openPhotoSwipe( index, clickedGallery );
      }
      return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
      var hash = window.location.hash.substring(1),
        params = {};

      if(hash.length < 5) {
        return params;
      }

      var vars = hash.split('&');
      for (var i = 0; i < vars.length; i++) {
        if(!vars[i]) {
          continue;
        }
        var pair = vars[i].split('=');
        if(pair.length < 2) {
          continue;
        }
        params[pair[0]] = pair[1];
      }

      if(params.gid) {
        params.gid = parseInt(params.gid, 10);
      }

      return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
      var pswpElement = document.querySelectorAll('.pswp')[0],
        gallery,
        options,
        items;

      items = parseThumbnailElements(galleryElement);

      // define options (if needed)
      options = {

        // define gallery index (for URL)
        galleryUID: galleryElement.getAttribute('data-pswp-uid'),

        getThumbBoundsFn: function(index) {
          // See Options -> getThumbBoundsFn section of documentation for more info
          var thumbnail = items[index].el.getElementsByTagName('img')[0] || items[index].el.getElementsByClassName('image')[0], // find thumbnail
            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect();
          return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
        }

      };

      // PhotoSwipe opened from URL
      if(fromURL) {
        if(options.galleryPIDs) {
          // parse real index when custom PIDs are used
          // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
          for(var j = 0; j < items.length; j++) {
            if(items[j].pid == index) {
              options.index = j;
              break;
            }
          }
        } else {
          // in URL indexes start from 1
          options.index = parseInt(index, 10) - 1;
        }
      } else {
        options.index = parseInt(index, 10);
      }

      // exit if index not found
      if( isNaN(options.index) ) {
        return;
      }

      if(disableAnimation) {
        options.showAnimationDuration = 0;
      }

      // Pass data to PhotoSwipe and initialize it
      gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i+1);
      galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
      openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
  };

  /*
   * Click Functions
   */

  $('.btn-number').click(function(e) {
    e.preventDefault();

    var fieldName = $(this).attr('data-field');
    var type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if ( !isNaN(currentVal) ) {
      if ( type == 'minus' ) {

        if ( currentVal > input.attr('min') ) {
          input.val(currentVal - 1).change();
        }
        if ( parseInt(input.val()) == input.attr('min') ) {
          $(this).attr('disabled', true);
        }

      } else if ( type == 'plus' ) {

        if ( currentVal < input.attr('max') ) {
          input.val(currentVal + 1).change();
        }
        if ( parseInt(input.val()) == input.attr('max') ) {
          $(this).attr('disabled', true);
        }

      }
    } else {
      input.val(0);
    }
  });

  $('.dropdown-menu').click(function(event) {
    event.stopPropagation();
  });

  $('.grid-btn').click(function() {
    gridView();
  });

  $('.list-btn').click(function() {
    listView();
  });

  $('.datepicker-output').on('click', function() {
    $('.datepicker-input').click();
  });

  $('.hide-filter').click(function() {
    if ( $(this).hasClass('hidden-filter') ) {
      $(this).removeClass('hidden-filter');
      $(this).children('.menu-icon').addClass('active');
      $('.sidebar-filter').removeClass('to-left');
      $('.main-wrapper.hidden-sidebar-filter').removeClass('hidden-sidebar-filter');
      $('.search-group.hidden-sidebar-filter').removeClass('hidden-sidebar-filter');
      if ( !$('.map-wrapper').hasClass('full-width') ) {
        $('.black-bg-map').removeClass('no-filter');
        $('.black-bg-search').removeClass('no-filter');
      }
    } else {
      $(this).addClass('hidden-filter');
      $(this).children('.menu-icon').removeClass('active');
      $('.sidebar-filter').addClass('to-left');
      $('.main-wrapper').addClass('hidden-sidebar-filter');
      $('.search-group').addClass('hidden-sidebar-filter');
      if ( !$('.map-wrapper').hasClass('full-width') ) {
        $('.black-bg-map').addClass('no-filter');
        $('.black-bg-search').addClass('no-filter');
      }
    }
    reinitMap();
  });

  $('.btn-go-app').click(function() {
    $('html, body').animate(
      {
        scrollTop : 0
      }, 800);
    return false;
  });

  $('#filter-done').click(function() {
    hideMobileFilter();
  });

  $('#menu-button').click(function() {
    if ( $(this).closest('.navbar').hasClass('open-menu') ) {
      hideMobileNav();
    } else {
      $(this).closest('.navbar').addClass('open-menu');
      $('body').addClass('opened-menu');
      $('.black-bg-search').fadeIn(200).css({
        'position': 'fixed',
        'z-index': '100'
      });
    }
  });

  $('#nav_mobile .nav li.back a').click(function() {
    if ( $('.navbar').hasClass('open-menu') ) {
      hideMobileNav();
    }
  });

  $('.filter-icon').click(function() {
    if ( $(this).parent('.navbar-header').hasClass('open-filter') ) {
      hideMobileFilter();
    } else {
      $(this).parent('.navbar-header').addClass('open-filter');
      $('body').addClass('opened-filter');
      $('.black-bg-search').fadeIn(200).css({
        'position': 'fixed',
        'z-index': '100'
      });
    }
  });

  $('.black-bg-search').click(function() {
    if ( $('.navbar').hasClass('open-menu') ) {
      hideMobileNav();
    } else if ( $('.navbar-header').hasClass('open-filter') ) {
      hideMobileFilter();
    }
    $(this).fadeOut(200);
  });

  $('.datepicker-input').click(function() {
    hideMapItemBlock();
  });

  $('.datepicker-output').click(function() {
    hideMapItemBlock();
  });

  $('.languages-menu .languages a').click(function() {
    $('#dropdownMenuLink2').html('');
    $(this).clone().appendTo($('#dropdownMenuLink2'));
    $('#dropdownMenuLink2').append('<span class="bs-caret"><span class="caret"></span></span>');
  });

  $('.people-count .book-menu .btn-number').click(function() {
    var value = $(this).parent().siblings('.input-number').val();
    var el = $(this).parent().siblings('.input-number').data('id');
    $('#' + el).html(value);
  });

  $('.people-count #peopleCount').click(function() {
    if ( $(window).width() > 767 ) {
      $('.black-bg-search').fadeIn(200);
    }
    $(this).closest('.people-count').addClass('active');
  });

  $('.search-group .close-search').click(function() {
    $('.input-group.search-group').removeClass('scrolled');
    $('#search-space').height('initial');
    $('.input-group.search-group').addClass('closed');
  });

  $('#peopleCount').click(function() {
    $(window).disablescroll();
  });

  $('.popup .popup_close').click(function() {
    $(this).closest('.popup').fadeOut();
  });

  $('.review-block_rating-like .review-block_rating-like-up,' +
    '.review-block_rating-like .review-block_rating-like-down').click(function() {
    if ( $(this).hasClass('review-block_rating-like-up') ) {
      likesCounter(true);
    } else {
      likesCounter(false);
    }
    var $this = $(this);
    var $thisLike = $(this).find('.like');
    var $thisSibling = $(this).siblings('.review-block_rating-like-down, .review-block_rating-like-up');
    $this.css('pointer-events', 'none');
    $thisLike.fadeIn(200);
    $thisSibling.css('pointer-events', 'none');
    setTimeout(function() {
      $this.css('pointer-events', 'initial');
      $thisLike.fadeOut(200);
      $thisSibling.css('pointer-events', 'initial');
    }, 2000)
  });

  $('.map-item-block .open-map-item,' +
    '.features .open-map-item').click(function() {
    $('.black-bg-map').fadeIn(200);
    $('.map-item-block').show("slide", { direction: "right" }, 300);
    $(window).disablescroll();
  });

  $('.search-result .result-item').click(function() {
    var title = $(this).find('h4').text();
    var icon = $(this).find('.result-icon').attr('class');
    var location = $(this).find('.location');
    $('.search-group .input-search').val(title);
    $('.search-group .input-search')
      .removeAttr('class')
      .attr('class', 'form-control input-search')
      .addClass(icon + ' icon');
    if ( $('.search-group > .location').length ) {
      if ( location.text() !== $('.search-group > .location').text() ) {
        $('.search-group > .location').remove();
        location.clone().appendTo('.search-group');
      }
    } else {
      location.clone().appendTo('.search-group');
    }
  });

  $('.input-search').keyup(function() {
    if ( $(this).val() == '' ) {
      $('.search-group > .location').remove();
      $('.search-group .input-search')
        .removeAttr('class')
        .attr('class', 'form-control input-search');
    }
  });

  var hotelButton = $('.booking-table .room-type_info-open-btn .hotel-button');
  hotelButton.click(function() {
    $(this)
      .toggleClass('opened closed')
      .closest('.row-info')
      .toggleClass('opened closed');
  });

  /*
   * Initialization
   */

  initPhotoSwipeFromDOM('.photoswipe-block');

  initPhotoSwipeFromDOM('.photoswipe-block');

  if ( datepickerInput.length ) {
    datepickerInput.dateRangePicker({
      startOfWeek: 'sunday',
      separator: ' ~ ',
      singleMonth: false,
      showTopbar: false,
      format: 'MMM Do dddd',
      autoClose: false,
      time: {
        enabled: true
      },
      defaultTime: moment().startOf('day').toDate(),
      defaultEndTime: moment().endOf('day').toDate(),
      language: 'en',
      applyBtnClass: 'save-time',
      customOpenAnimation: function(cb) {
        $(this).fadeIn(300, cb);
      },
      customCloseAnimation: function(cb) {
        $(this).fadeOut(300, cb);
      }
    });
  }

  if ( datepickerInputLanding.length ) {
    datepickerInputLanding.dateRangePicker({
      startOfWeek: 'sunday',
      separator: ' ~ ',
      singleMonth: false,
      showTopbar: false,
      format: 'MMM Do dddd',
      autoClose: false,
      time: {
        enabled: true
      },
      extraClass: 'booking-datepicker',
      defaultTime: moment().startOf('day').toDate(),
      defaultEndTime: moment().endOf('day').toDate(),
      language: 'en',
      applyBtnClass: 'save-time',
      customOpenAnimation: function(cb) {
        $(this).fadeIn(300, cb);
      },
      customCloseAnimation: function(cb) {
        $(this).fadeOut(300, cb);
      }
    });
  }

  $('.selectpicker').selectpicker();

  $("#slider-range").slider({
    range: true,
    min: 0,
    max: 500,
    values: [75, 300],
    slide: function(event, ui) {
      $("#amount1").val("$" + ui.values[0]);
      $("#amount2").val("$" + ui.values[1]);
    }
  });

  $('.owl-carousel.short').owlCarousel({
    loop: true,
    items: 1,
    nav: true,
    lazyLoad: true,
    singleItem: true,
    navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
  });
  $('.owl-carousel.full').owlCarousel({
    loop: true,
    items: 1,
    nav: true,
    dots: false,
    lazyLoad: true,
    singleItem: true,
    navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
    thumbs: true,
    thumbImage: false,
    thumbsPrerendered: true,
    thumbContainerClass: 'owl-thumbs',
    thumbItemClass: 'owl-thumb-item'
  });

  $('.same-height').matchHeight();
  $('.same-height-map').matchHeight();

  /*
   * Events
   */

  $("#amount1").val("$" + $("#slider-range").slider("values", 0));

  $("#amount2").val("$" + $("#slider-range").slider("values", 1));

  $("#amount1").on('change', function() {
    if ( $("#amount1").val().indexOf("$") >= 0 ) {
      $("#slider-range").slider("values", 0, $("#amount1").val().slice(1));
    } else {
      $("#slider-range").slider("values", 0, $("#amount1").val());
    }
  });

  $("#amount2").on('change', function() {
    if ( $("#amount2").val().indexOf("$") >= 0 ) {
      $("#slider-range").slider("values", 1, $("#amount2").val().slice(1));
    } else {
      $("#slider-range").slider("values", 1, $("#amount2").val());
    }
  });

  $('.onoffswitch').change(function() {
    if ( $('.onoffswitch .myonoffswitch').prop('checked') ) {
      $('.map-wrapper').addClass('full-width');
      $('.black-bg-map').addClass('no-filter');
      $('.black-bg-search').addClass('no-filter');
      $('.main-wrapper').addClass('hidden-sidebar-filter');
      $('.search-group').addClass('hidden-sidebar-filter');
      $('.content-wrapper').fadeOut(200);
      $('.sidebar-filter').addClass('to-left');
      $('.search-filter .menu-icon').removeClass('active').parent('.hide-filter').addClass('hidden-filter');
      $('.sidebar-filter').addClass('show-on-map');
      $('.filter-top .display, .filter-top .bootstrap-select, .filter-top .avail')
        .css({
          'opacity': 1,
          'pointer-events': 'none'
        })
        .animate({
          'opacity': 0
        }, 200);
    } else {
      $('.map-wrapper').removeClass('full-width');
      $('.black-bg-map').removeClass('no-filter');
      $('.black-bg-search').removeClass('no-filter');
      $('.search-filter .menu-icon').addClass('active').parent('.hide-filter').removeClass('hidden-filter');
      if ( $('.hide-filter').hasClass('hidden-filter') ) {
        $('.content-wrapper').fadeIn(200);
      } else {
        if ( $(window).width() > 767 ) {
          $('.content-wrapper').fadeIn(200);
          $('.sidebar-filter').removeClass('to-left');
        } else {
          $('.content-wrapper').fadeIn(200);
        }
        $('.main-wrapper').removeClass('hidden-sidebar-filter');
        $('.search-group').removeClass('hidden-sidebar-filter');
      }
      $('.sidebar-filter').removeClass('show-on-map');
      $('.filter-top .display, .filter-top .bootstrap-select, .filter-top .avail')
        .css({
          'opacity': 0,
          'pointer-events': 'initial'
        })
        .animate({
          'opacity': 1
        }, 200);
    }
    reinitMap();
    if ( $(window).width() > 1199 ) {
      if ( $('.input-group.search-group').length ) {
        scrolledElement($(this), '.input-group.search-group', $('.noplaceholder .grid-item').eq(2).offset().top, '#search-space', $('.noplaceholder .grid-item').last().prev('.grid-item').andSelf().offset().top);
      }
    } else {
      destroyScrolledElement('.input-group.search-group', '#search-space');
    }
  });

  $('.onoffswitch-gallery').change(function() {
    if ( $('.onoffswitch-gallery .myonoffswitch').prop('checked') ) {
      $(this).parent().addClass('checked');
      $('.gallery-map-wrapper #map').removeClass('hidden');
      $('.information-block .slider-block,' +
        '.information-block .sidebar-block').addClass('hidden');
    } else {
      $(this).parent().removeClass('checked');
      $('.gallery-map-wrapper #map').addClass('hidden');
      $('.information-block .slider-block,' +
        '.information-block .sidebar-block').removeClass('hidden');
    }
    reinitMap();
  });

  $('.onoffswitch-hotel-info').change(function() {
    if ( $('.onoffswitch-hotel-info .myonoffswitch').prop('checked') ) {
      $('.hotel-information_block-tabs').removeClass('full-width');
      $('.hotel-information_block-map').removeClass('no-width').fadeIn(200);
    } else {
      $('.hotel-information_block-tabs').addClass('full-width');
      $('.hotel-information_block-map').addClass('no-width').fadeOut(200);
    }
    reinitMap();
  });

  $('.collapse').on('shown.bs.collapse', function() {
    $(this).prev().find('.fa').removeClass("fa-caret-down").addClass("fa-caret-up");
  }).on('hidden.bs.collapse', function() {
    $(this).prev().find('.fa').removeClass("fa-caret-up").addClass("fa-caret-down");
  });

  search.on('keyup blur', toggleFocus);

  search.on('keyup', function() {
    if ( !loadIcon.hasClass('writing') ) {
      loadIcon.addClass('writing');
      setTimeout(function() {
        loadIcon.removeClass('writing');
      }, 3000);
    }
  });

  input.focusin(function() {
    $(this).data('oldValue', $(this).val());
  });

  input.change(function() {

    var minValue = parseInt($(this).attr('min'));
    var maxValue = parseInt($(this).attr('max'));
    var valueCurrent = parseInt($(this).val());

    var name = $(this).attr('name');
    if ( valueCurrent >= minValue ) {
      $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
      alert('Sorry, the minimum value was reached');
      $(this).val($(this).data('oldValue'));
    }
    if ( valueCurrent <= maxValue ) {
      $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
      alert('Sorry, the maximum value was reached');
      $(this).val($(this).data('oldValue'));
    }


  });

  input.keydown(function(e) {
    // backspace, delete, tab, escape, enter and .
    if ( $.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
      // Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39) ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ( (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) ) {

    }
  });

  $(window).resize(function() {
    initAOS();
    if ( $(window).width() < 992 ) {
      gridView();
    }
    if ( !$('#map-item-block').is(':visible') ) {
      sidebarPosition();
    }
    if ( $(window).width() > 767 ) {
      if ( $('.sidebar-filter').css('left') == 0 ) {
        hideMobileFilter();
      }
    }
    if ( $(window).width() > 1199 ) {
      if ( $('.input-group.search-group').length ) {
        scrolledElement($(this), '.input-group.search-group', $('.noplaceholder .grid-item').eq(2).offset().top, '#search-space', $('.noplaceholder .grid-item').last().prev('.grid-item').andSelf().offset().top);
        $(window).scroll(function() {
          scrolledElement($(this), '.input-group.search-group', $('.noplaceholder .grid-item').eq(2).offset().top, '#search-space', $('.noplaceholder .grid-item').last().prev('.grid-item').andSelf().offset().top);
        });
      }
    } else {
      destroyScrolledElement('.input-group.search-group', '#search-space');
      $(window).scroll(function() {
        destroyScrolledElement('.input-group.search-group', '#search-space');
      });
    }
  });

  $(document).ready(function() {
    $('.sticky').Stickyfill();
    initAOS();
    $('.gallery-map-wrapper #map').height($('.information-block').height());
    $('.loading-search-cover').fadeOut(200);
    if ( !$('#map-item-block').is(':visible') ) {
      sidebarPosition();
    }
    if ( $(window).width() < 992 ) {
      gridView();
    }
    if (/MSIE 10/i.test(navigator.userAgent)) {
      // This is internet explorer 10
      $('html').addClass('ie-style');
    }

    if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
      // This is internet explorer 9 or 11
      $('html').addClass('ie-style');
    }

    if (/Edge\/\d./i.test(navigator.userAgent)){
      // This is Microsoft Edge
      $('html').addClass('ie-style');
    }

    setMapWrapperHeight();

  });

  window.addEventListener('load', function() {
    setTimeout(function() {
      $('body').removeClass('placeholder');
      $('.placeholder-sidebar,' +
        '.placeholder-grid,' +
        '.placeholder-map'
      ).hide();
      $('.placeholder-show').removeClass('placeholder-show');
      $('.loading-title-cover').fadeOut(200);


      // window loaded functions
      reinitMap();
      setMapWrapperHeight();
      $('.stars-hotel').stars();
      $('.rate').rate();
      $('.map-item-block--wrapper').mCustomScrollbar({
        autoHideScrollbar: true
      });

      $('.owl-carousel.full + .owl-thumbs').mCustomScrollbar({
        scrollbarPosition: "outside"
      });

      $('.attractions_gallery').mCustomScrollbar({
        scrollbarPosition: "outside"
      });

      $('.ui.sticky').sticky({
        context: '#sticky-wrap',
        silent: true
      });
      if ( $(window).width() > 1199 ) {
        if ( $('.input-group.search-group').length ) {
          $(window).scroll(function() {
            scrolledElement($(this), '.input-group.search-group', $('.noplaceholder .grid-item').eq(2).offset().top, '#search-space', $('.noplaceholder .grid-item').last().prev('.grid-item').andSelf().offset().top);
          });
        }
      } else {
        destroyScrolledElement('.input-group.search-group', '#search-space');
      }
    }, 1500);
    // remove all placeholders
    setTimeout(function() {
      $('.placeholder-sidebar,' +
        '.placeholder-grid,' +
        '.placeholder-map'
      ).remove();
    }, 1501);
  });

})(jQuery);