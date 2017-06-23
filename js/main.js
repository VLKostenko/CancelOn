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
  var hotelButton = $('.booking-table .room-type_info-open-btn .hotel-button');

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

  $.fn.extend({
    animateCss: function (animationName, destroy) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
      });
    }
  });

  /*
   * Main Functions
   */

  function reinitMap() {
    if ( $('#map').length && !$('#map1').length ) {
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center);
    } else if ( $('#map').length && $('#map1').length ) {
      var center0 = map.getCenter();
      var center1 = map1.getCenter();
      google.maps.event.trigger(map, "resize");
      google.maps.event.trigger(map1, "resize");
      map.setCenter(center0);
      map1.setCenter(center1);
    } else if ( !$('#map').length && $('#map1').length ) {
      var center = map1.getCenter();
      google.maps.event.trigger(map1, "resize");
      map1.setCenter(center);
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
      } else if ( scrollPos.scrollTop() < targetLine || scrollPos.scrollTop() > targetEnd ) {
        $(target).removeClass('scrolled closed').css({
          left: 'initial',
          width: '100%'
        });
        $(targetSpace).height('initial');
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

  function buildBookingTable() {
    $('.booking-table').addClass('for-tablet');
    $('[data-table="thead-item"]')
      .wrap("<tr class='thead-mobile'><td><table><tbody></tbody></table></td></tr>");
    var theadMobile = $('.thead-mobile');

    $('.room-type_info').wrap("<td class='room-type_info-mobile-wrapper'></td>").wrap("<table></table>").wrap("<tbody></tbody>").wrap("<tr class='room-type_info-mobile'></tr>");
    $('.right-part_info').wrap("<tr></tr>").each(function() {
      $(this).parent().appendTo($(this).parent().siblings('.room-type_info-mobile-wrapper').find('tbody'));
    });
    $('.room-type_info-mobile').after(theadMobile);
  }

  function unbuildBookingTable() {
    $('.booking-table').removeClass('for-tablet');
    $('[data-table="thead-item"]').eq(0).appendTo('.room-last_th table tbody');
    $('.room-type_info-mobile-wrapper .thead-mobile').remove();
    $('.room-type_info-mobile .room-type_info').each(function() {
      $(this).appendTo($(this).closest('.row-info'));
    });
    $('.right-part_info').each(function() {
       $(this).appendTo($(this).closest('.row-info'));
    });
    $('.room-type_info-mobile-wrapper').remove();
  }

  /*
   * Click Functions
   */

  // $('a[href="#analytics"]').click(function() {
  //   $('.pie-statistic .setsize').each(function() {
  //     $(this).height($(this).width());
  //   });
  // });

  function checkMobileFilter(first, second) {
    if ( $(window).width() < 768 ) {
      $(first).change(function() {
        if ( $(this).prop('checked') ) {
          $(second).prop('checked', false);
          $('.gallery-map-wrapper #map').addClass('hidden');
          $('.slider-block').removeClass('hidden');
        } else {
          $(second).prop('checked', true);
          $('.gallery-map-wrapper #map').removeClass('hidden');
          $('.slider-block').addClass('hidden');
        }
        reinitMap();
      });
      $(second).change(function() {
        if ( $(this).prop('checked') ) {
          $(first).prop('checked', false);

          $('.gallery-map-wrapper #map').removeClass('hidden');
          $('.slider-block').addClass('hidden');
        } else {
          $(first).prop('checked', true);
          $('.gallery-map-wrapper #map').addClass('hidden');
          $('.slider-block').removeClass('hidden');
        }
        reinitMap();
      });
    }
  }

  if ( $(window).width() < 768 ) {
    $('.attractions_gallery-item a').click(function() {
      if ( $(this).parent().hasClass('active') ) {
        $(this).parent().removeClass('active');
        $('.attractions_gallery-item a').parent().removeClass('active');
      } else {
        $('.attractions_gallery-item a').parent().removeClass('active');
        $(this).parent().addClass('active');
      }
    });
  } else {
    $('.attractions_gallery-item a').parent().removeClass('active');
  }

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
  // TODO fix map width/left on hide-filter click
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
      // $('#map').parent()
      // $('#map').parent().css('left', $('#map').parent().offset().left - $('#map').parent().width() + '!important');
    }
    // $('#map').parent().width($('#map').parent().parent().width());
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

  $('.date-group, .people-count').click(function() {
    hideMapItemBlock();
    $('.black-bg-map').fadeOut(200);
  });

  $('.search-group .close-search').click(function() {
    $('.input-group.search-group').removeClass('scrolled');
    $('#search-space').height('initial');
    $('.input-group.search-group').addClass('closed');
  });

  $('#peopleCount').click(function() {
    if ( $(window).width() > 992 ) {
      $(window).disablescroll();
    }
  });

  $('.popup .popup_close').click(function() {
    $(this).closest('.popup').fadeOut();
  });

  $(document).on('click', '.show-popup', function() {
    $('.black-bg-map').fadeIn(200);
    $('.map-item-block').show().animateCss('bounceIn');
    if ( $(window).width() > 992 ) {
      $(window).disablescroll();
    }
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
    if ( $(window).width() > 992 ) {
      $(window).disablescroll();
    }
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
  $(document).on('click', '.booking-table .room-type_info-open-btn .hotel-button', function() {
  if ( $(window).width() > 991 ) {
    $(this)
      .toggleClass('opened closed')
      .closest('.row-info')
      .toggleClass('opened closed');
  } else if ( $(window).width() > 767 && $(window).width() < 992 ) {
    $(this)
      .toggleClass('opened closed')
      .closest('.row-info')
      .toggleClass('opened closed');
    if ( $(this).closest('.row-info').hasClass('opened') ) {
      $(this).closest('.room-type_info')
        .appendTo($(this).closest('.room-type_info-mobile-wrapper').find('.room-type_info-mobile'));
    } else {
      $(this).closest('.room-type_info')
        .prependTo($(this)
          .closest('.room-type_info-mobile-wrapper')
          .find('.right-part_info .variant1'));
    }
  } else {
    $(this)
      .toggleClass('opened closed')
      .closest('.row-info')
      .toggleClass('opened closed');
    // if ( $(this).closest('.row-info').hasClass('opened') ) {
    //   if ( !$(this).closest('.row-info').find('.room-type_info .room-type_info-price span').length ) {
    //     console.log('if')
    //     $(this).closest('.row-info').find('.room-type_info .room-type_info-price span')
    //       .appendTo($(this).closest('.row-info').find('.right-part_info .variant1 .more-info-wrapper .total-price_price'));
    //   }
    // } else {
    //   if ( !$(this).closest('.row-info').find('.right-part_info .variant1 .more-info-wrapper .total-price_price span').length ) {
    //     console.log('else')
    //     $(this).closest('.row-info').find('.right-part_info .variant1 .more-info-wrapper .total-price_price span')
    //       .appendTo($(this)
    //         .closest('.row-info')
    //         .find('.room-type_info .room-type_info-price'));
    //   }
    // }
  }
});

  $(document).on('click', '.booking-table .right-part_info .variant .conditions-open-close-btn a', function() {
    $(this).closest('.variant').toggleClass('opened closed');
  });

  /*
   * Initialization
   */

  // jquery ui draggable

  $(".draggable").draggable({
    axis: 'x', // only horizontally
    drag: function(e, ui) {
      var $element = ui.helper;
      // calculate
      var w = $element.width();
      var pw = $element.parent().width();
      var maxPosLeft = 0;
      if ( w > pw ) {
        maxPosLeft = -(w - pw);
      }
      var h = $element.height();
      var ph = $element.parent().height();
      var maxPosTop = 0;
      if ( h > ph ) {
        maxPosTop = h - ph;
      }
      // horizontal
      if ( ui.position.left > 0 ) {
        ui.position.left = 0;
      } else if ( ui.position.left < maxPosLeft ) {
        ui.position.left = maxPosLeft;
      }
      // vertical
      if ( ui.position.top > 0 ) {
        ui.position.top = 0;
      } else if ( ui.position.top < maxPosTop ) {
        ui.position.top = maxPosTop;
      }
    }
  });

  // jquery draggable also on touch devices
  // http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices

  function touchHandler(e) {
    var touch = e.originalEvent.changedTouches[0];
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
      }[e.type], true, true, window, 1,
      touch.screenX, touch.screenY,
      touch.clientX, touch.clientY, false,
      false, false, false, 0, null);
    touch.target.dispatchEvent(simulatedEvent);
  }

  function preventPageScroll(e) {
    e.preventDefault();
  }

  function initTouchHandler($element) {
    $element.on("touchstart touchmove touchend touchcancel", touchHandler);
    $element.on("touchmove", preventPageScroll);
  }

  initTouchHandler($(".draggable"));

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
      extraClass: 'search-datepicker',
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

  var owlCarouselFull = $('.owl-carousel-full');
  owlCarouselFull.owlCarousel({
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


  var owlCarouselTableSlider = $('.owl-carousel-table-slider');

  owlCarouselTableSlider.on('initialized.owl.carousel', function(event) {
    event.relatedTarget.$element.context.nextElementSibling.innerHTML = "1/" + event.item.count;
  });

  // this carousel must have .counter in html right after .owl-carousel (sibling)
  owlCarouselTableSlider.owlCarousel({
    loop: false,
    items: 1,
    nav: true,
    dots: false,
    // lazyLoad: true,
    singleItem: true
  });

  owlCarouselTableSlider.on('changed.owl.carousel', function(event) {
    // this code now return current slide for looped carousel
    // it is the fix of default owl method that returns wrong value
    var current = (event.item.index + 1) - event.relatedTarget._clones.length / 2;
    var allItems = event.item.count;
    if (current > allItems || current == 0) {
      current = allItems - (current % allItems);
    }
    event.relatedTarget.$element.context.nextElementSibling.innerHTML = current + "/" + event.item.count;
  });

  var owlCarouselShort = $('.owl-carousel-short');
  owlCarouselShort.owlCarousel({
    loop: true,
    items: 1,
    nav: true,
    lazyLoad: true,
    singleItem: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
  });

  $('.same-height').matchHeight();

  if ( $(window).width() > 767 ) {
    $('.same-height-map').matchHeight();
  }

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

      $('#map').parent('.ui').removeClass('sticky').removeAttr('style');
      $('.map-wrapper.full-width').height(1690);

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

      $('#map').parent('.ui').addClass('sticky').width($('#map').parent().width()).height('auto');
      $('.map-wrapper').height($('.sidebar-filter').height());

      $('.filter-top .display, .filter-top .bootstrap-select, .filter-top .avail')
        .css({
          'opacity': 0,
          'pointer-events': 'initial'
        })
        .animate({
          'opacity': 1
        }, 200);
    }
    if ( $(window).width() > 1199 ) {
      if ( $('.input-group.search-group').length && $('.noplaceholder .grid-item').length ) {
        scrolledElement($(this), '.input-group.search-group', $('.noplaceholder .grid-item').eq(2).offset().top, '#search-space', $('.noplaceholder .grid-item').last().prev('.grid-item').andSelf().offset().top);
      }
    } else {
      destroyScrolledElement('.input-group.search-group', '#search-space');
    }
    reinitMap();
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
    if ( $(window).width() > 1199 ) {
      $('.owl-carousel-full.photoswipe-block + .owl-thumbs').mCustomScrollbar('destroy');
      $('.owl-carousel-full.photoswipe-block + .owl-thumbs').mCustomScrollbar({
        scrollbarPosition: "outside"
      });
    } else {
      $('.owl-carousel-full.photoswipe-block + .owl-thumbs').mCustomScrollbar('destroy');
      $('.owl-carousel-full.photoswipe-block + .owl-thumbs').mCustomScrollbar({
        scrollbarPosition: "outside",
        axis: "x",
        advanced: { autoExpandHorizontalScroll: true }
      });
    }

    if ( $(window).width() < 1200 ) {
      if ( $('.onoffswitch-hotel-info .myonoffswitch').prop('checked') ) {
        $('.onoffswitch-hotel-info .myonoffswitch').prop('checked', false);
        $('.hotel-information_block-tabs').addClass('full-width');
        $('.hotel-information_block-map').addClass('no-width').hide();
        window.mainChart.height = 173;
      }
    } else {
      if ( !$('.onoffswitch-hotel-info .myonoffswitch').prop('checked') ) {
        $('.onoffswitch-hotel-info .myonoffswitch').prop('checked', true);
        $('.hotel-information_block-tabs').removeClass('full-width');
        $('.hotel-information_block-map').removeClass('no-width').show();
        $('.same-height-map').matchHeight();
        reinitMap();
      }
    }
    // } else {
    //   if ( !$('.onoffswitch-hotel-info .myonoffswitch').prop('checked') ) {
    //     console.log(1);
    //     $('.onoffswitch-hotel-info .myonoffswitch').prop('checked', false);
    //     $('.hotel-information_block-tabs').removeClass('full-width');
    //     $('.hotel-information_block-map').removeClass('no-width').show();
    //   }
    // }
    // booking table response
    // if ( $(window).width() > 767 && $(window).width() < 992 ) {
    //   if ( !$('.booking-table').hasClass('for-tablet') ) {
    //     // buildBookingTable();
    //     clearTimeout(id);
    //     id = setTimeout(buildBookingTable, 500);
    //   }
    // } else if ( $(window).width() < 768 ) {
    //   if ( !$('.booking-table').hasClass('for-mobile') ) {
    //     // buildBookingTable();
    //     clearTimeout(id);
    //     id = setTimeout(buildBookingTable, 500);
    //   }
    // } else {
    //   if ( $('.booking-table').hasClass('for-tablet') ) {
    //     unbuildBookingTable();
    //   }
    // }
    // clearTimeout(id);
    // id = setTimeout(hotelButtonRebuild, 500);
    // function hotelButtonRebuild() {
    //   console.log('resize');
    //   $('.booking-table .room-type_info-open-btn .hotel-button').each(function() {
    //     console.log('jopa')
    //     if ( $(window).width() < 992 && $(window).width() > 767 ) {
    //       if ( !$('.booking-table').hasClass('for-tablet') ) {
    //         buildBookingTable();
    //       }
    //       if ( $(this).closest('.row-info').hasClass('opened') ) {
    //         $(this).closest('.room-type_info')
    //           .appendTo($(this).closest('.room-type_info-mobile-wrapper').find('.room-type_info-mobile'));
    //       } else {
    //         $(this).closest('.room-type_info')
    //           .prependTo($(this)
    //             .closest('.room-type_info-mobile-wrapper')
    //             .find('.right-part_info .variant1'));
    //       }
    //     } else if ( $(window).width() < 768 ) {
    //       $(this).parent().appendTo($(this).closest('.room-type_info').siblings('.total-price'));
    //       console.log('hellow')
    //     } else {
    //       if ( $(this).closest('.row-info').hasClass('closed') ) {
    //         $(this).closest('.room-type_info')
    //           .prependTo($(this).closest('.row-info'));
    //       }
    //     }
    //   });
    // }
    //
    // if ( $(window).width() < 992 && $(window).width() > 767 ) {
    //   $('.booking-table .room-type_info-open-btn .hotel-button').each(function() {
    //     if ( !$('.booking-table').hasClass('for-tablet') ) {
    //       buildBookingTable();
    //     }
    //     if ( $(this).closest('.row-info').hasClass('opened') ) {
    //       $(this).closest('.room-type_info')
    //         .appendTo($(this).closest('.room-type_info-mobile-wrapper').find('.room-type_info-mobile'));
    //     } else {
    //       $(this).closest('.room-type_info')
    //         .prependTo($(this)
    //           .closest('.room-type_info-mobile-wrapper')
    //           .find('.right-part_info .variant1'));
    //     }
    //   });
    // } else if ( $(window).width() < 768 ) {
    //   $('.booking-table .room-type_info-open-btn .hotel-button').each(function() {
    //     $(this).parent().appendTo($(this).closest('.room-type_info').siblings('.total-price'));
    //   });
    // } else {
    //   $('.booking-table .room-type_info-open-btn .hotel-button').each(function() {
    //     if ( $(this).closest('.row-info').hasClass('closed') ) {
    //       $(this).closest('.room-type_info')
    //         .prependTo($(this).closest('.row-info'));
    //     }
    //   });
    // }

    if ( $('.people-count .book-menu').is(':visible') ) {
      if ( $(window).width() > 767 ) {
        $('.black-bg-search').fadeIn(200);
      } else {
        $('.black-bg-search').fadeOut(200);
      }
    }

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
      if ( $('.input-group.search-group').length && $('.noplaceholder .grid-item').length ) {
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

    // $('.sticky').Stickyfill();
    initAOS();
    $('.gallery-map-wrapper #map').height($('.information-block').height());
    $('.loading-search-cover').fadeOut(200).removeClass('showing');
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

    if ( $('#map1').length ) {
      if ( $(window).width() < 1200 ) {
        if ( $('.onoffswitch-hotel-info .myonoffswitch').prop('checked') ) {
          $('.onoffswitch-hotel-info .myonoffswitch').prop('checked', false);
          $('.hotel-information_block-tabs').addClass('full-width');
          $('.hotel-information_block-map').addClass('no-width').hide();
          window.mainChart.height = 173;
        }
      } else {
        if ( $('.onoffswitch-hotel-info .myonoffswitch').prop('checked') ) {
          $('.onoffswitch-hotel-info .myonoffswitch').prop('checked', true);
          $('.hotel-information_block-tabs').removeClass('full-width');
          $('.hotel-information_block-map').removeClass('no-width').show();
        }
      }
    }

    // booking table response
    // if ( $(window).width() > 767 && $(window).width() < 992 ) {
    //   if ( !$('.booking-table').hasClass('for-tablet') ) {
    //     buildBookingTable();
    //   }
    // } else {
    //   if ( $('.booking-table').hasClass('for-tablet') ) {
    //     unbuildBookingTable();
    //   }
    // }

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

      checkMobileFilter('#myonoffswitch-mobile-gallery', '#myonoffswitch-mobile-map');

      reinitMap();
      setMapWrapperHeight();
      $('.stars-hotel').stars();
      $('.rate').rate();
      $('.main-wrapper .map-item-block--wrapper').mCustomScrollbar({
        autoHideScrollbar: true
      });

      $('.landing-popup .map-item-block--wrapper').mCustomScrollbar({
        scrollbarPosition: "outside"
      });

      if ( $(window).width() > 1199 ) {
        $('.owl-carousel-full.photoswipe-block + .owl-thumbs').mCustomScrollbar({
          scrollbarPosition: "outside"
        });
      } else {
        $('.owl-carousel-full.photoswipe-block + .owl-thumbs').mCustomScrollbar({
          scrollbarPosition: "outside",
          axis: "x",
          advanced: { autoExpandHorizontalScroll: true }
        });
      }

      $('.attractions_gallery').mCustomScrollbar({
        scrollbarPosition: "outside"
      });

      $('.ui.sticky').sticky({
        context: '#sticky-wrap',
        silent: true
      });
      if ( $(window).width() > 1199 ) {
        if ( $('.input-group.search-group').length && $('.noplaceholder .grid-item').length ) {
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
          '.placeholder-map,' +
          '.placeholder-slider,' +
          '.placeholder-thumbs,' +
          '.placeholder-logo,' +
          '.placeholder-info,' +
          '.placeholder-facilities'
      ).remove();
    }, 1501);
  });

})(jQuery);