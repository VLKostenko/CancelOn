;(function($) {
  "use strict";

  // localStorage plugin - https://github.com/artberri/jquery-html5storage/

  /**
   * ------------------------------------------------------------------------------------------------------
   * Global Variables
   * ------------------------------------------------------------------------------------------------------
   **/

  var
    search = $('.input-search'),
    searchResult = $('.search-result'),
    loadIcon = $('.load-icon'),
    datepickerInput = $('.search-group .datepicker-input'),
    datepickerInputLanding = $('.booking-table .datepicker-input'),
    datepickerInputChangeDate = $('.change-dates-block .datepicker-input'),
    input = $('.input-number'),
    owlCarouselFull = $('.owl-carousel-full'),
    owlCarouselTableSlider = $('.owl-carousel-table-slider'),
    owlCarouselShort = $('.owl-carousel-short'),
    owlCarouselInfoPayment = $('.owl-carousel-info-payment'),
    owlCarouselGallery = $('.owl-carousel-gallery'),
    delayResize = 100,
    throttledResize = false,
    callsResize = 0,
    delayScroll = 100,
    throttledScroll = false,
    callsScroll = 0;

  /**
   * ------------------------------------------------------------------------------------------------------
   * Custom Functions
   * ------------------------------------------------------------------------------------------------------
   **/

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

  $.fn.shuffle = function() {

    var allElems = this.get(),
      getRandom = function(max) {
        return Math.floor(Math.random() * max);
      },
      shuffled = $.map(allElems, function(){
        var random = getRandom(allElems.length),
          randEl = $(allElems[random]).clone(true)[0];
        allElems.splice(random, 1);
        return randEl;
      });

    this.each(function(i){
      $(this).replaceWith($(shuffled[i]));
    });

    return $(shuffled);

  };

  $.fn.extend({
    animateCss: function (animationName, destroy) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
      });
    }
  });

  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if ( o[this.name] !== undefined ) {
        if ( !o[this.name].push ) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

  var directBorder = function() {
    var menu = $('.navbar-header').find('ul.menu'),
      items = menu.find('>li'),
      dummy = function() {};
    if ( menu.length === 0 ) {
      return;
    }
    var borderBox = $('<span class="border-box"></span>'),
      curr = items.eq(0).get(0);
    menu.find('.border-box').remove();
    menu.append(borderBox);
    setCurr(curr);

    function move(e) {
      borderBox.dequeue();
      borderBox.animate({
        width: e.offsetWidth - 20,
        left: e.offsetLeft + 10
      }, 300, 'easeInOutQuint');
    }

    function setCurr(e) {
      borderBox.css({
        'left': e.offsetLeft + 10 + 'px',
        'width': e.offsetWidth - 20 + 'px'
      });
      curr = e;
    }

    items.each(function() {
      var e = this;
      $(this).hover(function() {
        move(e);
      }, dummy);
    });
  };

  /**
   * ------------------------------------------------------------------------------------------------------
   * Main Functions
   * ------------------------------------------------------------------------------------------------------
   **/

  function reinitMap() {
    if ( $('#map').length && !$('#map1').length && !$('#map2').length ) {
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center);
    } else if ( $('#map').length && $('#map1').length && !$('#map2').length ) {
      var center0 = map.getCenter();
      var center1 = map1.getCenter();
      google.maps.event.trigger(map, "resize");
      google.maps.event.trigger(map1, "resize");
      map.setCenter(center0);
      map1.setCenter(center1);
    } else if ( !$('#map').length && $('#map1').length && !$('#map2').length ) {
      var center = map1.getCenter();
      google.maps.event.trigger(map1, "resize");
      map1.setCenter(center);
    } else if ( $('#map').length && !$('#map1').length && $('#map2').length ) {
      var center0 = map.getCenter();
      var center2 = map2.getCenter();
      google.maps.event.trigger(map, "resize");
      google.maps.event.trigger(map2, "resize");
      map.setCenter(center0);
      map2.setCenter(center2);
    } else if ( !$('#map').length && $('#map1').length && $('#map2').length ) {
      var center1 = map.getCenter();
      var center2 = map2.getCenter();
      google.maps.event.trigger(map1, "resize");
      google.maps.event.trigger(map2, "resize");
      map1.setCenter(center1);
      map2.setCenter(center2);
    } else if ( !$('#map').length && !$('#map1').length && $('#map2').length ) {
      var center2 = map.getCenter();
      google.maps.event.trigger(map2, "resize");
      map2.setCenter(center2);
    } else if ( $('#map').length && $('#map1').length && $('#map2').length ) {
      var center0 = map.getCenter();
      var center1 = map1.getCenter();
      var center2 = map2.getCenter();
      google.maps.event.trigger(map, "resize");
      google.maps.event.trigger(map1, "resize");
      google.maps.event.trigger(map2, "resize");
      map.setCenter(center0);
      map1.setCenter(center1);
      map2.setCenter(center2);
    }
  }

  function hideMobileNav() {
    $('.navbar').removeClass('open-menu');
    $('body').removeClass('opened-menu');
    $('.black-bg-search').fadeOut(200).removeAttr('style');
    $('.sign-in-mobile-menu').removeClass('opened');
    $('.currencies-mobile').removeClass('opened');
  }

  function showMobileNav() {
    $('.navbar').addClass('open-menu');
    $('body').addClass('opened-menu');
    $('.black-bg-search').fadeIn(200).css({
      'position': 'fixed',
      'z-index': '100'
    });
  }

  function hideMobileFilter() {
    $('.navbar-header').removeClass('open-filter');
    $('body').removeClass('opened-filter');
    $('.black-bg-search').removeClass('white').fadeOut(200).removeAttr('style')
  }

  function showMobileFilter() {
    $('.navbar-header').addClass('open-filter');
    $('body').addClass('opened-filter');
    $('.black-bg-search').addClass('white').fadeIn(200).css({
      'position': 'fixed',
      'z-index': '100'
    });
  }

  function hideMapItemBlock() {
    $('.map-item-block').fadeOut(750).animateCss('bounceOut');
    setTimeout(function() {
      $('.map-item-block').removeClass('animated bounceOut');
    }, 750);
    $(window).disablescroll('undo');
  }

  function sidebarPosition() {
    if ( $(window).width() < 768 ) {
      $('.sidebar-filter').removeClass('to-left').appendTo('#filter_mobile');
    } else {
      $('.sidebar-filter').addClass('to-left').insertBefore($('.main-wrapper'));
    }
  }

  function listView() {
    $('.list-btn').addClass('active');
    $('.grid-btn').removeClass('active');
    $('.map-btn').removeClass('active').children('#myonoffswitch1').prop('checked', false);
    $('.grid').addClass('list-view').removeClass('grid-view');
    gridViewChecker();
    $.localStorage.setItem('items-view', 'list');
    fullWidthSearch();
    AOS.refresh();
  }

  function gridView() {
    $('.grid-btn').addClass('active');
    $('.list-btn').removeClass('active');
    $('.map-btn').removeClass('active').children('#myonoffswitch1').prop('checked', false);
    $('.grid').removeClass('list-view').addClass('grid-view');
    gridViewChecker();
    $.localStorage.setItem('items-view', 'grid');
    fullWidthSearch();
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
      // $('.black-bg-search').fadeIn(200);
    }
    else {
      searchResult.fadeOut(200);
      // $('.black-bg-search').fadeOut(200);
    }
    if(e.which == 13) {
      searchResult.fadeOut(200);
      // $('.black-bg-search').fadeOut(200);
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

  // window.resize callback function
  function getDimensionsResize() {
    callsResize += 1;
  }

  // window.scroll callback function
  function getDimensionsScroll() {
    callsScroll += 1;
  }

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

  function setCountryLocation() {
    $.getJSON("http://freegeoip.net/json/", function(data) {
      var country = data.country_name;
      $('.list-of-countries').val(country);
      $('.list-of-countries').selectpicker('refresh');
    });
    var selected = $('.list-of-countries').find("option:selected").val();
    if ( selected === 'United States' ) {
      $('.states-usa').addClass('hidden');
    } else {
      $('.states-usa').removeClass('hidden');
    }
  }

  // popularity of price range that counts height in percentage for 20 bars
  function histogram() {
    var histogramData = [0, 1, 0, 3, 13, 25, 70, 103,
      130, 120, 135, 139, 122, 119, 67, 77, 58, 46, 37, 39];
    var maxValue = Math.max.apply(Math, histogramData);

    for ( var i = 0; i < 20; i++ ) {
      $('.histogram-wrapper').append(
        '<div class="histogram-bar" style="height: ' + 100 / maxValue * histogramData[i] + '%;">' +
          '<div class="histogram-tooltip">' +
          '41.0% of users bought rooms in this price range.' +
          '</div>' +
        '</div>'
      );
    }
    $('.histogram-wrapper').append(

    );
  }

  function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  }
  
  function sortTypeItem() {
    if ( $('#best-price-guaranted').prop('checked') && !$('#top-deal').prop('checked') ) {
      $('.grid .grid-item').addClass('hidden');
      $('.grid .grid-item[data-filter="best-price"]').removeClass('hidden');
    } else if ( !$('#best-price-guaranted').prop('checked') && $('#top-deal').prop('checked') ) {
      $('.grid .grid-item').addClass('hidden');
      $('.grid .grid-item[data-filter="top-deal"]').removeClass('hidden');
    } else if ( $('#best-price-guaranted').prop('checked') && $('#top-deal').prop('checked') ) {
      $('.grid .grid-item').addClass('hidden');
      $('.grid .grid-item[data-filter="best-price"]').removeClass('hidden');
      $('.grid .grid-item[data-filter="top-deal"]').removeClass('hidden');
    } else {
      $('.grid .grid-item').removeClass('hidden');
    }
    gridViewChecker();
    AOS.refresh();
  }
  sortTypeItem();

  $('#best-price-guaranted, #top-deal').change(function() {
    sortTypeItem();
  });

  // .grid-item Sorting Function

  // 'type' is data-sort value on clicking button that should have class .low-high or .high-low at start
  // data-sort must be the same as data-'sort-name'
  // for example if data-sort='example_sort' then data name must be data-example_sort='...'
  // 'option' is type of sorting that must be 'low-high' or 'high-low'
  // price is sorting by price
  // guest rating is sorting by rating near smile icon
  // recommended is sorting by tripadvisor rating
  // all ratings sets as data values at .grid-item
  function sortItemsByType(type, option) {
    $('.grid .grid-item').sort(function(a, b) {
      var first = a.getAttribute('data-' + type);
      var second = b.getAttribute('data-' + type);

      if ( option === 'low-high' ) {
        if ( first + type < second + type ) {
          return -1;
        } else {
          return 1;
        }
      } else if ( option === 'high-low' ) {
        if ( first + type > second + type ) {
          return -1;
        } else {
          return 1;
        }
      }
    }).each(function() {
      $(this).appendTo('.grid');
    });
    gridViewChecker();
    AOS.refresh();
  }

  $('a[data-sort]').on('click', function(e) {
    e.preventDefault();
    var sortType = $(this).data('sort');
    console.log(sortType);
    if ( $(this).hasClass('low-high') ) {
      $(this).removeClass('low-high').addClass('high-low');
      $(this).children('i').addClass('fa-sort-amount-asc').removeClass('fa-sort-amount-desc');
      sortItemsByType(sortType, 'low-high');
    } else if ( $(this).hasClass('high-low') ) {
      $(this).addClass('low-high').removeClass('high-low');
      $(this).children('i').removeClass('fa-sort-amount-asc').addClass('fa-sort-amount-desc');
      sortItemsByType(sortType, 'high-low');
    }
  });

  // Check if grid looks good
  function gridViewChecker() {
    var item = $('.grid .grid-item');
    item.removeClass('ml-15');
    if ( $('.grid').hasClass('grid-view') ) {
      item.not('.hidden').each(function(index) {
        if ( index % 2 !== 0 ) {
          $(this).addClass('ml-15');
        }
      });
    }
    AOS.refresh();
  }
  gridViewChecker();
  
  function checkLocalStorageConditions() {
    // grid
    var gridView = $.localStorage.getItem('items-view');
    if ( !$('.grid').hasClass(gridView + '-view') && gridView !== null ) {
      $('.grid').removeClass('list-view grid-view').addClass(gridView + '-view');
      $('.searching-result .view-icons .list-btn, .searching-result .view-icons .grid-btn').removeClass('active');
      $('.searching-result .view-icons .btn.' + gridView + '-btn').addClass('active');
    } else {
      $('.grid').removeClass('list-view grid-view').addClass('list-view');
      $('.searching-result .view-icons .list-btn, .searching-result .view-icons .list-btn').removeClass('active');
      $('.searching-result .view-icons .btn.list-btn').addClass('active');
    }
    gridViewChecker();
    // end grid
  }
  checkLocalStorageConditions();

  // function filterBy(type) {
  //   // var
  //   // input = document.getElementById('myInput'),
  //   // filter = input.value.toUpperCase(),
  //   // ul = document.getElementById("myUL"),
  //   // li = ul.getElementsByTagName('li');
  //   //
  //   // for (i = 0; i < li.length; i++) {
  //   //   a = li[i].getElementsByTagName("a")[0];
  //   //   if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
  //   //     li[i].style.display = "";
  //   //   } else {
  //   //     li[i].style.display = "none";
  //   //   }
  //   // }
  //
  // }
  // filterBy();

  function detectswipe(el, func) {
    var swipe_det = new Object();
    swipe_det.sX = 0;
    swipe_det.sY = 0;
    swipe_det.eX = 0;
    swipe_det.eY = 0;
    var min_x = 15; //min x swipe for horizontal swipe
    var max_x = 15; //max x difference for vertical swipe
    var min_y = 50; //min y swipe for vertical swipe
    var max_y = 50; //max y difference for horizontal swipe
    var direction = "";
    var ele = document.getElementById(el);
    ele.addEventListener('touchstart', function(e) {
      var t = e.touches[0];
      swipe_det.sX = t.screenX;
      swipe_det.sY = t.screenY;
    }, false);
    ele.addEventListener('touchmove', function(e) {
      // e.preventDefault();
      var t = e.touches[0];
      swipe_det.eX = t.screenX;
      swipe_det.eY = t.screenY;
    }, false);
    ele.addEventListener('touchend', function(e) {
      //horizontal detection
      if ( (((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0))) ) {
        if ( swipe_det.eX > swipe_det.sX ) direction = "right";
        else direction = "left";
      }
      //vertical detection
      else if ( (((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0))) ) {
        if ( swipe_det.eY > swipe_det.sY ) direction = "down";
        else direction = "up";
      }

      if ( direction !== "" ) {
        if ( typeof func === 'function' ) func(el, direction);
      }
      direction = "";
      swipe_det.sX = 0;
      swipe_det.sY = 0;
      swipe_det.eX = 0;
      swipe_det.eY = 0;
    }, false);
  }

  function swipeActions(el, dir) {
    var body = $('body');
    switch(dir) {
      case 'right':
        if ( body.hasClass('opened-menu') ) {
          hideMobileNav();
        } else {
          if ( $(window).width() < 768 ) {
            showMobileFilter();
          }
        }
        break;
      case 'left':
        if ( body.hasClass('opened-filter') ) {
          hideMobileFilter();
        } else {
          showMobileNav();
        }
        break;
    }
  }

  detectswipe('body', swipeActions);

  /**
   * ------------------------------------------------------------------------------------------------------
   * Click Functions
   * ------------------------------------------------------------------------------------------------------
   **/

  $('[data-filter="stars"]').click(function() {
    var value = $(this).val();
    if ( $(this).val() === 'all' ) {
      $('.grid-item').each(function() {
        $(this).removeClass('hidden');
      });
      gridViewChecker();
    } else {
      $('.grid-item').each(function() {
        var starsRating = $(this).find('.stars-hotel').data('stars');

        $(this).removeClass('hidden');
        if ( Math.round(starsRating) < parseInt(value) ) {
          $(this).addClass('hidden');
        }
      });
      $('.grid-item').not('.hidden').each(function() {
        var tripRating = $(this).find('.rating-line .rate').data('rate');

        if ( $.localStorage.getItem('rating-sort') !== null ) {
          if ( Math.round(tripRating) < parseInt($.localStorage.getItem('rating-sort')) ) {
            $(this).addClass('hidden');
            console.log($(this).data('stars_rating'));
          }
        }
      });
      gridViewChecker();

      var rating = $(this).parent('.dropdown-menu').children('input:checked').val();
      $.localStorage.setItem('stars-sort', rating);
      $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').html(
        '<input id="stars-rating-show" type="radio" name="stars-rating" value="' + rating +'">' +
        '<label class="five" for="stars-rating-show"></label>' +
        '<span class="text">' + rating + '+</span>' +
        '<span class="caret ml-10"></span>'
      );
    }
  });

    $('[data-filter="rating"]').click(function() {
      var value = $(this).val();
      if ( $(this).val() === 'all' ) {
        $('.grid-item').each(function() {
          $(this).removeClass('hidden');
        });
        gridViewChecker();
      } else {
        $('.grid-item').each(function() {
          var tripRating = $(this).find('.rating-line .rate').data('rate');

          $(this).removeClass('hidden');
          if ( Math.round(tripRating) < parseInt(value) ) {
            $(this).addClass('hidden');
          }
        });
        $('.grid-item').not('.hidden').each(function() {
          var starsRating = $(this).find('.stars-hotel').data('stars');

          if ( $.localStorage.getItem('stars-sort') !== null ) {
            if ( Math.round(starsRating) < parseInt($.localStorage.getItem('stars-sort')) ) {
              $(this).addClass('hidden');
            }
          }
        });
        gridViewChecker();

        var rating = $(this).parent('.dropdown-menu').children('input:checked').val();
        $.localStorage.setItem('rating-sort', rating);
        $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').html(
          'Rating<span class="text"> ' + rating + '+</span>' +
          '<span class="caret ml-10"></span>'
        );
      }
      // $('.map-wrapper .ui.sticky').sticky('destroy');
      // $('.map-wrapper .ui.sticky').sticky({
      //   context: '#sticky-wrap',
      //   silent: true,
      //   observeChanges: true
      // });
      // reinitMap();
    });

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
        countBookedVals();
      } else if ( type == 'plus' ) {
        if ( currentVal < input.attr('max') ) {
          input.val(currentVal + 1).change();
        }
        if ( parseInt(input.val()) == input.attr('max') ) {
          $(this).attr('disabled', true);
        }
        countBookedVals('add');
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
    $('.map-wrapper .ui.sticky').width($('.map-wrapper').width());
    $('.map-wrapper .ui.sticky').css('left', $('.map-wrapper').offset().left);
    reinitMap();
    setTimeout(function() {
      $('.sidebar-filter .ui.sticky').sticky('refresh');
    }, 250);
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
      hideMobileFilter();
      showMobileNav();
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
      hideMobileNav();
      showMobileFilter();
    }
  });

  // $('.black-bg-search').click(function() {
  //   if ( $('.navbar').hasClass('open-menu') ) {
  //     hideMobileNav();
  //   } else if ( $('.navbar-header').hasClass('open-filter') ) {
  //     hideMobileFilter();
  //   }
  //   $(this).fadeOut(200);
  // });

  $('.datepicker-input').click(function() {
    hideMapItemBlock();
  });

  $('.datepicker-output').click(function() {
    hideMapItemBlock();
  });

  $('.languages-menu .languages a').click(function() {
    $('.languages-menu .languages a').removeClass('active');
    $(this).addClass('active');
    var lang = $(this).data('lang');
    $('#dropdownMenuLink2 .language').text(lang);
  });

  $('.languages-menu .choose-currency li a').click(function() {
    $('.languages-menu .choose-currency li').removeClass('active');
    $(this).parent('li').addClass('active');
    var currency = $(this).find('.currency').text();
    $('#dropdownMenuLink2 .currency').text(currency);
  });

  // $('.people-count .book-menu .btn-number').click(function() {
  //   var value = $(this).parent().siblings('.input-number').val();
  //   var el = $(this).parent().siblings('.input-number').data('id');
  //   $('#' + el).html(value);
  // });

  $('.people-count #peopleCount').click(function(e) {
    $(this).closest('.people-count').addClass('active');
    var calentimStart = $("#datepicker-start").data("calentim");
    // var calentimEnd = $("#datepicker-end").data("calentim");
    calentimStart.hideDropdown(e);
    // calentimEnd.hideDropdown(e);
    $('.date-group').removeClass('active');
  });

  $('.date-group, .people-count').click(function() {
    hideMapItemBlock();
    $('.black-bg-map').fadeOut(200);
  });

  $('.map-item-block .close-btn').click(function() {
    hideMapItemBlock();
    $('.black-bg-map').fadeOut(200);
  });

  $('.black-bg-map').click(function() {
    hideMapItemBlock();
    $('.black-bg-map').fadeOut(200);
  });

  $('.search-group .close-search').click(function() {
    $('.input-group.search-group').removeClass('scrolled');
    $('#search-space').height('initial');
    $('.input-group.search-group').addClass('closed');
  });

  $('.popup .popup_close').click(function() {
    $(this).closest('.popup').fadeOut();
  });

  $('.hotel-information_block-tabs .nav-tabs li a').click(function() {
    setTimeout(function() {
      reinitMap();
    }, 50);
  });

  $(document).on('click', '.show-popup', function() {
    $('.black-bg-map').fadeIn(200);
    $('.map-item-block').show().animateCss('bounceIn');
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
    $('.map-item-block').show().animateCss('bounceIn');
    // if ( $(window).width() > 992 ) {
    //   $(window).disablescroll();
    // }
  });

  $('.search-result .result-item').click(function() {
    var title = $(this).find('h4').text();
    var location = $(this).find('.location').text();
    $('.search-group .input-search').val(title + ', ' + location );
    var icon = $(this).find('.result-icon').attr('class');
    $('.search-group .input-search')
      .removeAttr('class')
      .attr('class', 'form-control input-search')
      .addClass(icon + ' icon');
    // if ( $('.search-group > .location').length ) {
    //   if ( location.text() !== $('.search-group > .location').text() ) {
    //     $('.search-group > .location').remove();
    //     location.clone().appendTo('.search-group');
    //   }
    // } else {
    //   location.clone().appendTo('.search-group');
    // }
  });

  search.keyup(function() {
    if ( $(this).val() == '' ) {
      $('.search-group > .location').remove();
      $('.search-group .input-search')
        .removeAttr('class')
        .attr('class', 'form-control input-search');
    }
  });

  if ( $('.card-number-input').length ) {
    $('.card-number-input .card-input').keyup(function () {
      if ( $(this).val().length <= 0 || $(this).val().length < 19 ) {
        $("#inputCardNumber").closest('.card-number-input').removeClass('succeed');
      } else {
        $("#inputCardNumber").closest('.card-number-input').addClass('succeed');
      }
    });
  }

  function validateCreditCard() {
    var $card = $("#inputCardNumber");
    $card.validateCreditCard(function (result) {
      $(this).removeAttr('class');
      // $(this).removeClass('visa_electron');
      // $(this).removeClass('mastercard');
      // $(this).removeClass('maestro');
      // $(this).removeClass('discover');
      // $(this).removeClass('valid');

      if ( result.card_type === null ) {
        $('.vertical.maestro').slideUp({
          duration: 200
        }).animate({
          opacity: 0
        }, {
          queue: false,
          duration: 200
        });
        return;
      }
      $(this).addClass(result.card_type.name);
      $(this).attr('data-cardtype-field', result.card_type.name);
      if ( result.card_type.name === 'maestro' ) {
        $('.vertical.maestro').slideDown({
          duration: 200
        }).animate({
          opacity: 1
        }, {
          queue: false
        });
      } else {
        $('.vertical.maestro').slideUp({
          duration: 200
        }).animate({
          opacity: 0
        }, {
          queue: false,
          duration: 200
        });
      }
      if ( result.valid ) {
        console.log(result, 'valid');
        return $(this).addClass('validcard');
      } else {
        console.log(result, 'not valid');
        return $(this).removeClass('validcard');
      }
    }, {
      accept: ['visa', 'visa_electron', 'mastercard', 'maestro', 'discover']
    });
  }
  if ( $("#inputCardNumber").length ) {
    validateCreditCard();
  }

  $('#inputCardCVC').on('focus', function (e) {
    e.preventDefault();
    $(this).blur();
  });

  $(document).on('click', '.booking-table .row-info', function(e) {
    e.preventDefault();
    if ( e.target.tagName.toLowerCase() !== 'a' ) {
      console.log(e.target.tagName.toLowerCase(), 'good');
      if ( $(window).width() > 991 ) {
        $(this).toggleClass('opened closed');
      } else if ( $(window).width() > 767 && $(window).width() < 992 ) {
        $(this).toggleClass('opened closed');
        if ( $(this).hasClass('opened') ) {
          $(this).find('.room-type_info')
            .appendTo($(this).find('.room-type_info-mobile-wrapper').find('.room-type_info-mobile'));
        } else {
          $(this).find('.room-type_info')
            .prependTo($(this)
              .find('.room-type_info-mobile-wrapper')
              .find('.right-part_info .variant1'));
        }
      } else {
        $(this).toggleClass('opened closed');
      }
    }
  });

  $(document).on('click', '.booking-table .right-part_info .variant .conditions-open-close-btn a', function() {
    $(this).closest('.variant').toggleClass('opened closed');
  });

  $('.sidebar-filter .panel-title a').click(function() {
    setTimeout(function() {
      $('.sidebar-filter .ui.sticky').sticky('refresh');
    }, 250);
  });

  $('.find-my-location').click(function() {
    setCountryLocation();
  });

  $('#inputCardCVC').click(function() {
    $(this).prop('type', 'password');
    $(this).siblings('.cvv-input').fadeIn(200);
    return false;
  });

  if ( $('#inputCardCVC').length ) {
    $(document).mouseup(function(e) {
      var container = $('.cvv-input');
      if ( container.is(':visible') ) {
        if ( !container.is(e.target) && container.has(e.target).length === 0 ) {
          container.fadeOut(200);
        }
      }
    });
  }
  var cvvValue;
  $('.cvv-input .number a').click(function() {
    cvvValue = $('#inputCardCVC').val();
    if ( (cvvValue.length + 1) < 4 ) {
      $('#inputCardCVC').val(cvvValue + Number($(this).html()));
    }
  });

  $('.cvv-input .delete-button a').click(function() {
    $('#inputCardCVC').val(function(index, value){
      return value.substr(0, value.length - 1);
    });
  });

  $('.cvv-input .enter-button a').click(function() {
    $('.cvv-input').fadeOut(200);
  });

  $('.payment-block form').validator().submit(function (e) {
    if ( !e.isDefaultPrevented() ) {
      $('.info-step').show();
      $('.loading-submit-form-cover').fadeIn(200);
      if ( $(window).width() > 991 ) {
        $('.payment-details .ui.sticky').sticky('refresh');
      }
      $('.details-item-info .ui.sticky').sticky('refresh');
      $('html, body').animate({
        scrollTop : $('.info-step').offset().top
      }, 800);
      // var userInfo = JSON.stringify($(this).serializeObject()); // output in JSON string
      var userInfo = $(this).serializeObject();
      console.log(userInfo);
      e.preventDefault();
    }
  });

  $('#testValidation').click(function() {
    $('#inputFirstName').val('Test Name');
    $('#inputLastName').val('Test Surname');
    $('#inputEmail').val('test@gmail.com');
    $('#inputEmailConfirm').val('test@gmail.com');
    $('#inputPhone').val('123456789');
    $('#inputCardFirstName').val('Test Card Name');
    $('#inputCardLastName').val('Test Card Surname');
    // $('#inputCardNumber').val('1234 5678 9876 5432');
    $('#inputCardCVC').val('123');
    $('#inputCardPostal').val('987654');
  });

  $('.change-dates-button a.change').click(function() {
    $('.dates-bg-block').fadeIn(200);
    $('.change-dates-block').show().animateCss('bounceIn');
    // if ( $(window).width() > 992 ) {
    //   $(window).disablescroll();
    // }
  });

  $('.dates-bg-block, .change-dates-block .close-btn').click(function() {
    $('.dates-bg-block').fadeOut(200);
    $('.change-dates-block').fadeOut(750).animateCss('bounceOut');
    setTimeout(function() {
      $('.change-dates-block').removeClass('animated bounceOut');
    }, 750);
    $(window).disablescroll('undo');
  });

  $('.change-save-btn .save').click(function() {
    if ( $('.change-output .change-input').text() === '' ) {
      alert('You must choose the dates before saving!');
    } else {
      $('.dates-bg-block').fadeOut(200);
      $('.change-dates-block').fadeOut(750).animateCss('bounceOut');
      setTimeout(function() {
        $('.change-dates-block').removeClass('animated bounceOut');
      }, 750);
      $(window).disablescroll('undo');
      var outputInput = '.change-output .datepicker-input';
      var outputOutput = '.change-output .datepicker-output';
      var changePath = '.payment-details .payment-booking-details .days-details';
      var dayTextStart = $(outputInput + ' .day').text();
      var monthTextStart = $(outputInput + ' .month').text();
      var yearTextStart = $(outputInput + ' .year').text();
      var dayNameTextStart = $(outputInput + ' .dayName').text();
      var dayTextEnd = $(outputOutput + ' .day').text();
      var monthTextEnd = $(outputOutput + ' .month').text();
      var yearTextEnd =  $(outputOutput + ' .year').text();
      var dayNameTextEnd = $(outputOutput + ' .dayName').text();
      var nightText = $('.change-output .datepicker-total .nights').text();

      $(changePath + ' .start .dayName').text(dayNameTextStart);
      $(changePath + ' .start .day').text(' ' + dayTextStart);
      $(changePath + ' .start .month').text(' ' + monthTextStart);
      $(changePath + ' .start .year').text(' ' + yearTextStart);
      $(changePath + ' .end .dayName').text(dayNameTextEnd);
      $(changePath + ' .end .day').text(' ' + dayTextEnd);
      $(changePath + ' .end .month').text(' ' + monthTextEnd);
      $(changePath + ' .end .year').text(' ' + yearTextEnd);
      $(changePath + ' .total .nights').text(nightText);
    }
  });

  $('.input-number[data-id="children"]').change(function() {
    if ( $(this).val() != 0 ) {
      $(this).closest('.children').next('.children-age').removeClass('not-active').children('.child-1').removeClass('not-active');
      if ( $(this).val() == 1 ) {
        $(this).closest('.children').next('.children-age').children('.child-2').addClass('not-active');
        $(this).closest('.children').next('.children-age').children('.child-3').addClass('not-active');
        $(this).closest('.children').next('.children-age').children('.child-4').addClass('not-active');
      } else if ( $(this).val() == 2 ) {
        $(this).closest('.children').next('.children-age').children('.child-2').removeClass('not-active');
        $(this).closest('.children').next('.children-age').children('.child-3').addClass('not-active');
        $(this).closest('.children').next('.children-age').children('.child-4').addClass('not-active');
      } else if ( $(this).val() == 3 ) {
        $(this).closest('.children').next('.children-age').children('.child-3').removeClass('not-active');
        $(this).closest('.children').next('.children-age').children('.child-4').addClass('not-active');
      } else if ( $(this).val() == 4 ) {
        $(this).closest('.children').next('.children-age').children('.child-4').removeClass('not-active');
      }
    } else {
      $(this).closest('.children').next('.children-age').addClass('not-active');
    }
    // $('#roomsCount')
  });

  // add rooms on "add" button
  // var addedRooms = 1;
  // $('#add-book-room').click(function() {
  //   $('.book-menu .room:first-child .remove').removeClass('hidden');
  //   addedRooms += 1;
  //   if ( $('.book-menu .room').eq(-1).hasClass('hidden') ) {
  //     $('.book-menu .room:not(.hidden)').next().removeClass('hidden');
  //     if ( $('.book-menu .room:not(.hidden)').next().hasClass('book-footer') ) {
  //       $('#add-book-room').hide();
  //     } else {
  //       $('#add-book-room').show();
  //     }
  //   }
  //   $('#roomsVal').val(addedRooms);
  //   countBookedVals('add');
  // });

  $('#roomsCount').on('change', function() {
    var room = $('.search-filter-block .book-menu .room');
    room.addClass('not-active');
    // if ( $('.book-menu .room .input-number')  )
    // room.children('.children-age').addClass('not-active').children('.child').addClass('not-active');
    if ( $(this).val() === '1' ) {
      room.eq(0).removeClass('not-active');
    } else if ( $(this).val() === '2' ) {
      room.eq(0).removeClass('not-active');
      room.eq(1).removeClass('not-active');
    } else if ( $(this).val() === '3' ) {
      room.eq(0).removeClass('not-active');
      room.eq(1).removeClass('not-active');
      room.eq(2).removeClass('not-active');
    } else if ( $(this).val() === '4' ) {
      room.eq(0).removeClass('not-active');
      room.eq(1).removeClass('not-active');
      room.eq(2).removeClass('not-active');
      room.eq(3).removeClass('not-active');
    }
    $('.book-menu .room').each(function() {
      if ( $(this).children('.children').find('.input-number').val() != 0 && $(this).hasClass('not-active') ) {
        $(this).children('.children-age').addClass('not-active').children('.child').addClass('not-active');
        $(this).children('.children').find('.input-number').val('0');
        $(this).children('.children').find('.btn-number.minus').attr('disabled', 'disabled');
        $(this).children('.children').find('.btn-number.plus').removeAttr('disabled');
      }
    });
    var roomsVal = 0;
    $('.book-menu .room:not(.not-active)').each(function() {
      roomsVal += parseInt($(this).length, 10);
    });
    console.log(roomsVal);
    $('#roomsVal').val(roomsVal);
    countBookedVals('add');
  });

  $('#done-book-menu').click(function() {
    $('.people-count').removeClass('active open opened');
  });

  // $('.book-menu .room .remove').click(function() {
  //   addedRooms -= 1;
  //   $('.book-menu .room:not(.hidden):last').addClass('hidden');
  //   $('#add-book-room').show();
  //   if ( $('.book-menu .room:first-child').next().hasClass('hidden') ) {
  //     $('.book-menu .room:first-child .remove').addClass('hidden');
  //   }
  //   $('#roomsVal').val(addedRooms);
  //   countBookedVals();
  // });

  function writeBookedVals(add) {
    var adultsVal = 0;
    var childrenVal = 0;
    $('.book-menu .room:not(.not-active) [data-id="adults"]').each(function() {
      adultsVal += parseInt($(this).val(), 10);
    });
    $('.book-menu .room:not(.not-active) [data-id="children"]').each(function() {
      childrenVal += parseInt($(this).val(), 10);
    });
    if ( add === 'add' ) {
      $('#adultsVal').val(adultsVal);
      $('#childrenVal').val(childrenVal);
    } else {
      $('#adultsVal').val(adultsVal);
      $('#childrenVal').val(childrenVal);
    }
  }

  function countBookedVals(add) {
    writeBookedVals(add);
    $('#peopleCount #rooms').html($('#roomsVal').val());
    $('#peopleCount #adults').html($('#adultsVal').val());
    $('#peopleCount #children').html($('#childrenVal').val());
  }

  $('#people-count-open').click(function(e) {
    e.preventDefault();
    var peopleCount = $('.booking-table .search-filter-block .people-count');
    var bookMenu = $('.booking-table .search-filter-block .people-count .book-menu');
    if ( bookMenu.is(':visible') ) {
      peopleCount.removeClass('active opened');
    } else {
      peopleCount.addClass('active opened');
    }
  });

  $(document).on('click', '.list-of-countries ul.dropdown-menu li a', function(e) {
    e.preventDefault();
    if ( $(this).children('.text').text() === 'United States' ) {
      console.log('hide states');
      $('.states-usa').removeClass('hidden');
    } else {
      console.log('show states');
      $('.states-usa').addClass('hidden');
    }
  });

  $('.search-filter .show-all').on('click', function() {
    $('.main-wrapper .full-filter-search').toggleClass('active');
  });

  $('.main-wrapper .full-filter-search .close a, .main-wrapper .full-filter-search .filter-search-footer a').on('click', function() {
    $('.main-wrapper .full-filter-search').removeClass('active');
    $('.search-filter .show-all i').removeClass('fa-close').addClass('fa-bars');
  });

  $('.full-filter-search input[type="checkbox"]').change(function() {
    if ( $(this).prop('checked') ) {
      if ( $(this).parent().offset().left < 400 ) {
        $('.full-filter-search .filter-search-result').removeClass('right').addClass('active left').animate({
          left: $(this).parent().offset().left + 170,
          top: $(this).parent().offset().top - 284
        }, 200);
      } else {
        $('.full-filter-search .filter-search-result').removeClass('left').addClass('active right').animate({
          left: $(this).parent().offset().left - 340,
          top: $(this).parent().offset().top - 284
        }, 200);
      }
    } else {
      $('.full-filter-search .filter-search-result').removeClass('active');
    }
  });

  $('.full-filter-search .filter-search-result .close').on('click', function() {
    $('.full-filter-search .filter-search-result').removeClass('active left right');
  });

  $('.add-favorites').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('added');
    if ( $(this).hasClass('added') ) {
      $(this).find('img').attr('src', './images/icons/heart-white.svg');
    } else {
      $(this).find('img').attr('src', './images/icons/heart.svg');
    }
  });

  $('.open-map').on('click', function(e) {
    e.preventDefault();
    $('.information-map').addClass('active');
    setTimeout(function() {
      reinitMap();
    }, 250);
  });

  $('.close-map').on('click', function(e) {
    e.preventDefault();
    $('.information-map').removeClass('active');
    setTimeout(function() {
      reinitMap();
    }, 250);
  });

  $('.dropdown.change-stars .dropdown-menu').on('click', 'label', function() {
    // $(this).closest('.change-text').children('button').text($(this).text()).val($(this).text());
    var elClass = $(this).attr('class');
    var elFor = $(this).attr('for');
    var elText = $(this).text();
    $(this).closest('.change-stars').children('.dropdown-toggle').children('label').attr({
      'class': elClass,
      'for': elFor
    }).text(elText);

  });

  $('.sort-button.change-text .dropdown-menu').on('click', 'li a', function() {
    $(this).closest('.change-text').children('button').html($(this).text() + '<span class="caret ml-10"></span>').val($(this).text());
    $.localStorage.setItem('items-sort', $(this).text());
  });

  $('.map-wrapper .back-btn').click(function() {
    fullWidthSearch();
    $('.map-wrapper .back-btn').removeClass('active');
    $('.onoffswitch .myonoffswitch').prop('checked', false);
  });

  $('.datepicker-book-rooms .datepicker-input, .datepicker-book-rooms .datepicker-output').click(function(e) {
    e.preventDefault();
    $('#datepicker-start').click();
  });

  $('.sign-in-mobile').click(function() {
    $('.sign-in-mobile-menu').addClass('opened');
  });

  $('.sign-in-mobile-menu .back-sign-btn').click(function() {
    $('.sign-in-mobile-menu').removeClass('opened');
  });

  $('.currency-mobile, .language-mobile').click(function() {
    $('.currencies-mobile').addClass('opened');
  });

  $('.currencies-mobile .back-sign-btn').click(function() {
    $('.currencies-mobile').removeClass('opened');
  });

  $('.currencies-mobile ul li a').click(function() {
    $('.currencies-mobile ul li').removeClass('active');
    $(this).parent('li').addClass('active');
    var text = $(this).children('.currency').text();
    $('.currency-title-mobile').text(text);
  });

  $('.search-filter-block .people-count .book-menu .room .title').click(function() {
    $(this).parent('.room').toggleClass('open-rooms');
  });

  $('.hide-calendar').click(function(e) {
    if ( $('.calendar-start').hasClass('visible') || $('.calendar-end').hasClass('visible') ) {
      var calentimStart = $("#datepicker-start").data("calentim");
      // var calentimEnd = $("#datepicker-end").data("calentim");
      calentimStart.hideDropdown(e);
      // calentimEnd.hideDropdown(e);
    }
  });

  /**
   * ------------------------------------------------------------------------------------------------------
   * Initialization
   * ------------------------------------------------------------------------------------------------------
   **/

  initPhotoSwipeFromDOM('.photoswipe-block');

  initPhotoSwipeFromDOM('.photoswipe-block');

  // if ( datepickerInput.length ) {
  //   datepickerInput.dateRangePicker({
  //     startOfWeek: 'sunday',
  //     separator: ' ~ ',
  //     singleMonth: false,
  //     showTopbar: false,
  //     format: 'MMM Do dddd',
  //     autoClose: false,
  //     time: {
  //       enabled: true
  //     },
  //     extraClass: 'search-datepicker',
  //     defaultTime: moment().startOf('day').toDate(),
  //     defaultEndTime: moment().endOf('day').toDate(),
  //     language: 'en',
  //     applyBtnClass: 'save-time',
  //     customOpenAnimation: function(cb) {
  //       $(this).fadeIn(300, cb);
  //     },
  //     customCloseAnimation: function(cb) {
  //       $(this).fadeOut(300, cb);
  //     }
  //   });
  // }
  //
  // if ( datepickerInputLanding.length ) {
  //   datepickerInputLanding.dateRangePicker({
  //     startOfWeek: 'sunday',
  //     separator: ' ~ ',
  //     singleMonth: false,
  //     showTopbar: false,
  //     format: 'MMM Do dddd',
  //     autoClose: false,
  //     time: {
  //       enabled: true
  //     },
  //     extraClass: 'booking-datepicker',
  //     defaultTime: moment().startOf('day').toDate(),
  //     defaultEndTime: moment().endOf('day').toDate(),
  //     language: 'en',
  //     applyBtnClass: 'save-time',
  //     customOpenAnimation: function(cb) {
  //       $(this).fadeIn(300, cb);
  //     },
  //     customCloseAnimation: function(cb) {
  //       $(this).fadeOut(300, cb);
  //     }
  //   });
  // }
  //
  // if ( datepickerInputChangeDate.length ) {
  //   datepickerInputChangeDate.dateRangePicker({
  //     startOfWeek: 'sunday',
  //     separator: ' ~ ',
  //     singleMonth: false,
  //     showTopbar: false,
  //     format: 'DD MMM dddd',
  //     autoClose: false,
  //     time: {
  //       enabled: true
  //     },
  //     extraClass: 'change-date-datepicker',
  //     defaultTime: moment().startOf('day').toDate(),
  //     defaultEndTime: moment().endOf('day').toDate(),
  //     language: 'en',
  //     applyBtnClass: 'save-time',
  //     inline: true,
  //     container: '#change-dates-container',
  //     alwaysOpen: true,
  //     customOpenAnimation: function(cb) {
  //       $(this).fadeIn(300, cb);
  //     },
  //     customCloseAnimation: function(cb) {
  //       $(this).fadeOut(300, cb);
  //     }
  //   });
  // }

  // if ( $('.datepicker-book-rooms').length ) {
  //   $('.datepicker-book-rooms').dateRangePicker({
  //     startOfWeek: 'sunday',
  //     separator: '',
  //     singleMonth: false,
  //     showTopbar: false,
  //     format: 'DD MMM dddd',
  //     autoClose: false,
  //     time: {
  //       enabled: true
  //     },
  //     extraClass: 'book-room-date-datepicker',
  //     defaultTime: moment().startOf('day').toDate(),
  //     defaultEndTime: moment().endOf('day').toDate(),
  //     language: 'en',
  //     applyBtnClass: 'save-time',
  //     customOpenAnimation: function(cb) {
  //       $(this).fadeIn(300, cb);
  //     },
  //     customCloseAnimation: function(cb) {
  //       $(this).fadeOut(300, cb);
  //     },
  //     getValue: function() {
  //       if ($('#dateRangeRooms-start').val() && $('#dateRangeRooms-end').val() )
  //         return $('#dateRangeRooms-start').val() + ' ' + $('#dateRangeRooms-end').val();
  //       else
  //         return '';
  //     },
  //     setValue: function(s, s1, s2) {
  //       $('#dateRangeRooms-start').val(s1);
  //       $('#dateRangeRooms-end').val(s2);
  //     }
  //   });
  // }

  // var startRangeDate = 'July 3rd',
  //     endRangeDate = 'August 14th';
  $('#datepicker-start').calentim({
    singleDate: false,
    showFooter: false,
    showTimePickers: false,
    format: "MMM Do",
    startOnMonday: true,
    startDate: '2017-07-02T21:00:00.000Z',
    endDate: '2017-08-13T21:00:00.000Z',
    showOn: "bottom",
    dateSeparator: '               ',
    // enableMonthSwitcher: false,
    // enableYearSwitcher: false,
    oneCalendarWidth: 273.5,
    oninit: function(calentim) {

      // var startDate = $("#datepicker-start").data("calentim");
      // startDate.$elem.val('July 3rd');
      // calentim.container.addClass('calendar-start');

    },
    onbeforeshow: function(calentim) {

      // var startDate = $("#datepicker-start").data("calentim");
      // startDate.$elem.val(startRangeDate);
      //
      // var hideHtml = '<div class="calentim-hide"><a href="javascript:void(0)"><i class="fa fa-close" aria-hidden="true"></i></a></div>';
      // $('.calentim-container .calentim-input .calentim-header').append(hideHtml);

    },
    onfirstselect: function(calentim, start) {

      // var startDate = $("#datepicker-start").data("calentim");
      // startDate.$elem.val(moment(start).format(startDate.options.format));

    },
    onafterselect: function(calentim, start, end) {

      // var startDate = $("#datepicker-start").data("calentim");
      // startDate.$elem.val(moment(start).format(startDate.options.format));
      // startRangeDate = moment(start).format(startDate.options.format);

      // var endDate = $("#datepicker-end").data("calentim");
      // endDate.$elem.val(moment(end).format(endDate.options.format));
      // endRangeDate = moment(end).format(endDate.options.format);
      // endDate.config.startDate = startDate.config.startDate;
      // endDate.config.endDate = startDate.config.endDate;
      // $('.datepicker-book-rooms .datepicker-input').text(moment(start).format(startDate.options.format));
      // $('.datepicker-book-rooms .datepicker-output').text(moment(end).format(endDate.options.format));

      // calentim.container.hide();

      // console.log(calentim);
    },
    // onbeforemonthchange: function(calentim) {
    //
    //   var startDate = $("#datepicker-start").data("calentim");
    //   startDate.$elem.val(startRangeDate);
    //
    // },
    onaftermonthchange: function(calentim) {

      // var startDate = $("#datepicker-start").data("calentim");
      // startDate.$elem.val(startRangeDate);

    },
    onaftershow: function(calentim) {
      $('#datepicker-start').parent('.input-group').addClass('active');
      $('.people-count').removeClass('active');
      calentim.container.addClass('visible');
      $('.hide-calendar').removeClass('not-active');
    },
    onafterhide: function(calentim) {
      $('#datepicker-start').parent('.input-group').removeClass('active');
      calentim.container.removeClass('visible');
      $('.hide-calendar').addClass('not-active');
    }
  });

  // $('#datepicker-end').calentim({
  //   singleDate: false,
  //   showFooter: false,
  //   showTimePickers: false,
  //   format: "MMM Do",
  //   startOnMonday: true,
  //   startDate: '2017-07-02T21:00:00.000Z',
  //   endDate: '2017-08-13T21:00:00.000Z',
  //   showOn: "bottom",
  //   dateSeparator: '',
  //   enableMonthSwitcher: false,
  //   enableYearSwitcher: false,
  //   oneCalendarWidth: 273.5,
  //   oninit: function(calentim) {
  //
  //     var endDate = $("#datepicker-end").data("calentim");
  //     endDate.$elem.val('August 14th');
  //     calentim.container.addClass('calendar-end');
  //
  //   },
  //   onbeforeshow: function(calentim) {
  //
  //     var endDate = $("#datepicker-end").data("calentim");
  //     endDate.$elem.val(endRangeDate);
  //
  //     var hideHtml = '<div class="calentim-hide"><a href="javascript:void(0)"><i class="fa fa-close" aria-hidden="true"></i></a></div>';
  //     $('.calentim-container .calentim-input .calentim-header').append(hideHtml);
  //
  //   },
  //   onfirstselect: function(calentim, start) {
  //
  //     var startDate = $("#datepicker-start").data("calentim");
  //     startDate.$elem.val(moment(start).format(startDate.options.format));
  //
  //   },
  //   onafterselect: function(calentim, start, end) {
  //
  //     var startDate = $("#datepicker-start").data("calentim");
  //     var endDate = $("#datepicker-end").data("calentim");
  //
  //     startDate.$elem.val(moment(start).format(startDate.options.format));
  //     startRangeDate = moment(start).format(startDate.options.format);
  //     startDate.config.startDate = endDate.config.startDate;
  //     startDate.config.endDate = endDate.config.endDate;
  //
  //     endDate.$elem.val(moment(end).format(endDate.options.format));
  //     endRangeDate = moment(end).format(endDate.options.format);
  //     $('.datepicker-book-rooms .datepicker-input').text(moment(start).format(startDate.options.format));
  //     $('.datepicker-book-rooms .datepicker-output').text(moment(end).format(endDate.options.format));
  //
  //     calentim.container.hide();
  //
  //   },
  //   onbeforemonthchange: function(calentim) {
  //     // console.log('1');
  //   //
  //   //   var endDate = $("#datepicker-end").data("calentim");
  //   //   endDate.$elem.val(endRangeDate);
  //   //
  //   },
  //   onaftermonthchange: function(calentim) {
  //
  //     var endDate = $("#datepicker-end").data("calentim");
  //     endDate.$elem.val(endRangeDate);
  //
  //   },
  //   onaftershow: function(calentim) {
  //     $('#datepicker-end').parent('.input-group').addClass('active');
  //     $('.people-count').removeClass('active');
  //     calentim.container.addClass('visible');
  //     $('.hide-calendar').removeClass('not-active');
  //   },
  //   onafterhide: function(calentim) {
  //     $('#datepicker-end').parent('.input-group').removeClass('active');
  //     calentim.container.removeClass('visible');
  //     $('.hide-calendar').addClass('not-active');
  //   }
  // });

  $(document).on("click", ".calentim-hide", function(e) {
    var calentimStart = $("#datepicker-start").data("calentim");
    // var calentimEnd = $("#datepicker-end").data("calentim");
    calentimStart.hideDropdown(e);
    // calentimEnd.hideDropdown(e);
  });

  // $('.selectpicker').selectpicker();

  $('.selectpicker').selectpicker({
    container: 'body',
    dropupAuto: false
  });

  // make selectpicker works inside dropdown-menu
  $('.dropdown-menu').on('click', function(event) {
    event.stopPropagation();
    $('.bootstrap-select.open').removeClass('open');
  }).find('.btn-group').on('click', function(event) {
    event.stopPropagation();
  });

  $('body').on('click', function(event) {
    var target = $(event.target);
    // if ( target.parents('.bootstrap-select').length) {
    //   console.log(1);
    //   event.stopPropagation();
    //   $('.bootstrap-select.open').removeClass('open');
    // }
    if ( $('.search-filter-block .people-count').hasClass('active') ) {
      $(this).find('.bootstrap-select.open').removeClass('open');
    }
  });
  if ( $.localStorage.getItem('price-sort-min') !== null && $.localStorage.getItem('price-sort-max') !== null ) {
    $(".price-slider-range").slider({
      range: true,
      min: 100,
      max: 10000,
      values: [$.localStorage.getItem('price-sort-min'), $.localStorage.getItem('price-sort-max')],
      animate: true,
      slide: function(event, ui) {
        $(".price-amount1").val("$" + ui.values[0]);
        $(".price-amount2").val("$" + ui.values[1]);
        $.localStorage.setItem('price-sort-min', ui.values[0]);
        $.localStorage.setItem('price-sort-max', ui.values[1]);
        $(this).parent().siblings('.dropdown-toggle').html('$' + $.localStorage.getItem('price-sort-min') + ' - ' + '$' + $.localStorage.getItem('price-sort-max') + '<span class="caret ml-10"></span>');
      }
    });
    $('.price-slider-range').parent().siblings('.dropdown-toggle').html('$' + $.localStorage.getItem('price-sort-min') + ' - ' + '$' + $.localStorage.getItem('price-sort-max') + '<span class="caret ml-10"></span>');
  } else {
    $(".price-slider-range").slider({
      range: true,
      min: 100,
      max: 10000,
      values: [100, 10000],
      animate: true,
      slide: function(event, ui) {
        $(".price-amount1").val("$" + ui.values[0]);
        $(".price-amount2").val("$" + ui.values[1]);
        $.localStorage.setItem('price-sort-min', ui.values[0]);
        $.localStorage.setItem('price-sort-max', ui.values[1]);
        $(this).parent().siblings('.dropdown-toggle').html('$' + $.localStorage.getItem('price-sort-min') + ' - ' + '$' + $.localStorage.getItem('price-sort-max') + '<span class="caret ml-10"></span>');
      }
    });
  }

  $("#slider-range-distance").slider({
    range: false,
    min: 0,
    max: 50,
    value: 28,
    animate: true,
    slide: function(event, ui) {
      $("#amount-distance").val(ui.value + "km.");
    }
  });

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
    thumbContainerClass: 'owl-thumbs-full',
    thumbItemClass: 'owl-thumb-item',
    onInitialized: function() {
      $('.gallery-map-wrapper #map').height($('.information-block').height());
    }
  });

  owlCarouselTableSlider.on('initialized.owl.carousel', function(event) {
    event.relatedTarget.$element.context.nextElementSibling.innerHTML = "1/" + event.item.count;
  });

  // this carousel must have .counter in html right after .owl-carousel (sibling)
  owlCarouselTableSlider.owlCarousel({
    loop: false,
    items: 1,
    nav: true,
    dots: false,
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

  owlCarouselInfoPayment.owlCarousel({
    loop: true,
    items: 1,
    nav: false,
    dots: false,
    lazyLoad: true,
    singleItem: true,
    thumbs: true,
    thumbImage: false,
    thumbsPrerendered: true,
    thumbContainerClass: 'owl-thumbs-info-payment',
    thumbItemClass: 'owl-thumb-item',
    touchDrag: false,
    mouseDrag: false
  });

  owlCarouselGallery.owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    lazyLoad: true,
    navText : ['<img src="./images/icons/left-arrow-white.svg" alt="arrow"/><span>Previous image</span>','<img src="./images/icons/right-arrow-white.svg" alt="arrow"/><span>Next image</span>'],
    items : 4,
    margin: 10
  });

  $('.currency-slider').owlCarousel({
    loop: false,
    items: 1,
    nav: true,
    navText: ["<img src='./images/icons/left-arrow.svg'><span>Previous Currencies</span>","<img src='./images/icons/right-arrow.svg'><span>Next Currencies</span>"],
    dots: false,
    singleItem: true
  });

  $('.same-height').matchHeight();

  if ( $(window).width() > 767 ) {
    $('.same-height-map').matchHeight();
  }

  var inputPhone = $('#inputPhone');
  if ( inputPhone.length ) {
    inputPhone.intlTelInput({
      autoPlaceholder: true,
      nationalMode: false,
      preferredCountries: ['us', 'fr', 'gb']
    });
    if ( inputPhone.data('default-country') !== "" && inputPhone.data('default-country') !== undefined )
      inputPhone.intlTelInput('setCountry', inputPhone.data('default-country'));
  }

  $('.searching-tags .tag .close').on('click', function(e) {
    e.preventDefault();
    $(this).closest('.tag').fadeOut(300);
    setTimeout(function() {
      $(this).closest('.tag').remove();
    }, 300);
  });

  /**
   * ------------------------------------------------------------------------------------------------------
   * Events
   * ------------------------------------------------------------------------------------------------------
   **/

  $(".price-amount1").val("$" + $(".price-slider-range").slider("values", 0));

  $(".price-amount2").val("$" + $(".price-slider-range").slider("values", 1));

  $(".price-amount1").on('change', function() {
    if ( $(".price-amount1").val().indexOf("$") >= 0 ) {
      $(".price-slider-range").slider("values", 0, $(".price-amount1").val().slice(1));
    } else {
      $(".price-slider-range").slider("values", 0, $(".price-amount1").val());
    }
  });

  $(".price-amount2").on('change', function() {
    if ( $(".price-amount2").val().indexOf("$") >= 0 ) {
      $(".price-slider-range").slider("values", 1, $(".price-amount2").val().slice(1));
    } else {
      $(".price-slider-range").slider("values", 1, $(".price-amount2").val());
    }
  });

  function fullWidthSearch() {
    $('.map-wrapper').removeClass('full-width');
    $('.black-bg-map').removeClass('no-filter');
    $('.black-bg-search').removeClass('no-filter');
    $('.search-filter .menu-icon').addClass('active').parent('.hide-filter').removeClass('hidden-filter');
    $('.sidebar-filter').removeClass('show-on-map').height(2475);

    // $('#map').parent('.ui').removeClass('sticky').removeAttr('style');
    $('.map-wrapper.full-width').height(2475);
    if ( $('.hide-filter').hasClass('hidden-filter') ) {
      $('.content-wrapper').fadeIn(200);
    } else {
      if ( $(window).width() > 767 ) {
        $('.content-wrapper').fadeIn(200);
        // $('.sidebar-filter').removeClass('to-left');
      } else {
        $('.content-wrapper').fadeIn(200);
      }
      // $('.main-wrapper').removeClass('hidden-sidebar-filter');
      // $('.search-group').removeClass('hidden-sidebar-filter');
    }
    // $('.sidebar-filter').removeClass('show-on-map').height($('.main-wrapper').height());

    $('#map').parent('.ui').addClass('sticky').width($('#map').parent().width()).height('auto');
    $('.map-wrapper').height($('.sidebar-filter').height());
    $('.map-wrapper .ui.sticky').sticky('refresh');

    $('.filter-top .display, .filter-top .bootstrap-select, .filter-top .avail')
      .css({
        'opacity': 0,
        'pointer-events': 'initial'
      })
      .animate({
        'opacity': 1
      }, 200);
    var gridView = $.localStorage.getItem('items-view');
    $('.view-icons .' + gridView + '-btn').addClass('active');
  }

  function fullWidthMap() {
    $('.view-icons .list-btn, .view-icons .grid-btn').removeClass('active');
    $('.map-wrapper').addClass('full-width');
    $('.black-bg-map').addClass('no-filter');
    $('.black-bg-search').addClass('no-filter');
    $('.main-wrapper').addClass('hidden-sidebar-filter');
    $('.search-group').addClass('hidden-sidebar-filter');
    $('.content-wrapper').fadeOut(200);
    $('.sidebar-filter').addClass('to-left');
    $('.search-filter .menu-icon').removeClass('active').parent('.hide-filter').addClass('hidden-filter');
    $('.sidebar-filter').addClass('show-on-map').height(1690);

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
  }

  $('.onoffswitch').change(function() {
    if ( $('.onoffswitch .myonoffswitch').prop('checked') ) {
      fullWidthMap();
      $('.map-wrapper .back-btn').addClass('active');
    } else {
      fullWidthSearch();
      $('.map-wrapper .back-btn').removeClass('active');
    }
    // if ( $(window).width() > 1199 ) {
    //   if ( $('.input-group.search-group').length && $('.noplaceholder .grid-item').length ) {
    //     scrolledElement($(this), '.input-group.search-group', $('.noplaceholder .grid-item').eq(2).offset().top, '#search-space', $('.noplaceholder .grid-item').last().prev('.grid-item').andSelf().offset().top);
    //   }
    // } else {
    //   destroyScrolledElement('.input-group.search-group', '#search-space');
    // }
    reinitMap();
    setTimeout(function() {
      $('.sidebar-filter .ui.sticky').sticky('refresh');
    }, 250);
  });

  $('.map-button-wrapper .open-map').click(function() {
    $(this).toggleClass('active');
    $(this).find('i').toggleClass('hidden');
    var text = $(this).find('.text').text();
    $(this).find('.text').text(
      text === "Enlarge map" ? "Back to Items" : "Enlarge map");
    if ( $(this).hasClass('active') ) {
      fullWidthMap();
    } else {
      fullWidthSearch();
    }
    reinitMap();
  });

  // $('.onoffswitch-gallery').change(function() {
  //   if ( $('.onoffswitch-gallery .myonoffswitch').prop('checked') ) {
  //     $(this).parent().addClass('checked');
  //     $('.gallery-map-wrapper #map').removeClass('hidden');
  //     $('.information-block .slider-block,' +
  //       '.information-block .sidebar-block').addClass('hidden');
  //   } else {
  //     $(this).parent().removeClass('checked');
  //     $('.gallery-map-wrapper #map').addClass('hidden');
  //     $('.information-block .slider-block,' +
  //       '.information-block .sidebar-block').removeClass('hidden');
  //   }
  //   reinitMap();
  // });

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

  $(document).ready(function() {

    initAOS();
    $('.loading-search-cover').fadeOut(200).removeClass('showing');
    $('.loading-items').fadeOut(200);
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

    $('.cvv-input .number').shuffle();

    if ( $(window).width() > 767 && $(window).width() < 992 ) {
      $('.payment-details-wrapper .payment-details .sidebar-block').addClass('draggable');
    } else {
      $('.payment-details-wrapper .payment-details .sidebar-block').removeClass('draggable');
    }
    directBorder();

    $('#inputCardNumber').inputmask({
      mask: '9999 9999 9999 9999',
      placeholder: ''
    });

    if ( $.localStorage.getItem('items-sort') !== null && $.localStorage.getItem('items-sort').length ) {
      $('.sort-button.sort-by.change-text button').html($.localStorage.getItem('items-sort') + '<span class="caret ml-10"></span>').val($(this).text());
    }

    if ( $.localStorage.getItem('stars-sort') !== null ) {
      var starsValue = $.localStorage.getItem('stars-sort');
      $('.sort-button.stars .dropdown-toggle').html(
        '<input id="stars-rating-show" type="radio" name="stars-rating" value="' + starsValue + '">' +
        '<label class="five" for="stars-rating-show"></label>' +
        '<span class="text">' + starsValue + '+</span>' +
        '<span class="caret ml-10"></span>'
      );
      $('.sort-button.stars .dropdown-menu #stars-rating' + starsValue).prop('checked', true);
      $('.grid-item').each(function() {
        var starsRating = $(this).find('.stars-hotel').data('stars');
        $(this).removeClass('hidden');
        if ( Math.round(starsRating) < parseInt(starsValue) ) {
          $(this).addClass('hidden');
        }
      });
      gridViewChecker();
    }

    if ( $.localStorage.getItem('rating-sort') !== null ) {
      var ratingValue = $.localStorage.getItem('rating-sort');
      $('.sort-button.rating .dropdown-toggle').html(
        'Rating<span class="text"> ' + ratingValue + '+</span>' +
        '<span class="caret ml-10"></span>'
      );
      $('.sort-button.rating .dropdown-menu #hotel-rating' + ratingValue).prop('checked', true);
      $('.grid-item').each(function() {
        var ratingRating = $(this).find('.rating-line .rate').data('rate');
        $(this).removeClass('hidden');
        if ( Math.round(ratingRating) < parseInt(ratingValue) ) {
          $(this).addClass('hidden');
        }
      });
      $('.grid-item').not('.hidden').each(function() {
        var starsRating = $(this).find('.stars-hotel').data('stars');
        var tripRating = $(this).find('.rating-line .rate').data('rate');

        if ( $.localStorage.getItem('stars-sort') !== null ) {
          if ( Math.round(starsRating) < parseInt($.localStorage.getItem('stars-sort')) ) {
            $(this).addClass('hidden');
          }
        }
        if ( $.localStorage.getItem('rating-sort') !== null ) {
          if ( Math.round(tripRating) < parseInt($.localStorage.getItem('rating-sort')) ) {
            $(this).addClass('hidden');
            console.log($(this).data('stars_rating'));
          }
        }
      });
      gridViewChecker();

    }

    // $('.sort-button.price-filter button').html($.localStorage.getItem('items-sort') + '<span class="caret ml-10"></span>').val($(this).text());
    // $('.sort-button.hotel-stars button').html($.localStorage.getItem('items-sort') + '<span class="caret ml-10"></span>').val($(this).text());
    // $('.sort-button.rating button').html($.localStorage.getItem('items-sort') + '<span class="caret ml-10"></span>').val($(this).text());

  });

  window.addEventListener('resize', function() {
    if (!throttledResize) {
      // actual callback action
      getDimensionsResize();

      directBorder();
      // actions on resize
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

      // if ( $(window).width() < 768 ) {
      //   $('#reviews .review-block_comments').mCustomScrollbar({
      //     scrollbarPosition: "outside"
      //   });
      // }

      initAOS();
      checkMobileFilter('#myonoffswitch-mobile-gallery', '#myonoffswitch-mobile-map');
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
      reinitMap();

      if ( $(window).width() > 767 && $(window).width() < 992 ) {
        $('.payment-details-wrapper .payment-details .sidebar-block').addClass('draggable');
      } else {
        $('.payment-details-wrapper .payment-details .sidebar-block').removeClass('draggable');
      }
      if ( $(window).width() > 991 ) {
        $('.payment-details .ui.sticky').sticky({
          context: '#sticky-wrap',
          silent: true,
          observeChanges: true
        });
        $('.payment-details-wrapper .payment-details .sidebar-block .panel-second').appendTo($('.payment-details .sidebar-block'));
        $('.payment-details-wrapper .payment-details .sidebar-block .slider-panel').css('opacity', 1);
      } else {
        $('.payment-details .ui.sticky').sticky('destroy');
        var paymentSidebarWidth = 0;
        $('.payment-details-wrapper .payment-details .sidebar-block .panel').each(function() {
          if ( !$(this).hasClass('placeholder-room-info') ) {
            paymentSidebarWidth += $(this).outerWidth();
          }
        });
        $('.payment-details-wrapper .payment-details .sidebar-block').css('max-width', paymentSidebarWidth);

        $('.payment-details-wrapper .payment-details .sidebar-block .panel').matchHeight();

        $('.payment-details-wrapper .payment-details .sidebar-block .panel-second').insertAfter('.payment-details-wrapper .payment-details .sidebar-block .panel-first');
      }
      if ( $('.card-number-input').length ) {
        $('.card-number-input .card-input').keypress(function (event) {
          var $this = $(this);
          if ( (($this.val().length + 1) % 5) === 0 && ($this.val().length < 19 ) ) {
            $this.val($this.val() + " ");
          }
        });
      }

      if ( $(window).width() > 991 ) {
        $('.details-item-info .main-sidebar').addClass('ui sticky');
        $('.details-item-info .ui.sticky').sticky({
          context: '#sticky-wrap',
          silent: true,
          observeChanges: true
        });
      } else {
        $('.details-item-info').removeAttr('style');
        $('.details-item-info .ui.sticky').removeClass('ui sticky');
      }
      detectswipe('body', swipeActions);

      AOS.refresh();

      // we're throttled!
      throttledResize = true;
      // set a timeout to un-throttle
      setTimeout(function() {
        throttledResize = false;
      }, delayResize);
    }
  });

  getDimensionsResize();

  window.addEventListener('scroll', function() {
    if (!throttledScroll) {
      // actual callback action
      getDimensionsScroll();

      // actions on resize
      // if ( $(window).width() > 1199 ) {
      //   if ( $('.input-group.search-group').length && $('.noplaceholder .grid-item').length ) {
      //     scrolledElement($(this), '.input-group.search-group', $('.noplaceholder .grid-item').eq(2).offset().top, '#search-space', $('.noplaceholder .grid-item').last().prev('.grid-item').andSelf().offset().top);
      //   }
      // } else {
      //   destroyScrolledElement('.input-group.search-group', '#search-space');
      // }
      // we're throttled!
      throttledScroll = true;
      // set a timeout to un-throttle
      setTimeout(function() {
        throttledScroll = false;
      }, delayScroll);
    }
  });

  getDimensionsScroll();

  window.addEventListener('load', function() {

    $('.list-of-countries').on('change', function() {
      var selected = $(this).find("option:selected").val();
      console.log(selected);
      if ( selected === 'United States' ) {
        console.log('hide states');
        $('.states-usa').removeClass('hidden');
      } else {
        console.log('show states');
        $('.states-usa').addClass('hidden');
      }
    });

    setTimeout(function() {
      $('body').removeClass('placeholder');
      $('.placeholder-sidebar,' +
        '.placeholder-grid,' +
        '.placeholder-map'
      ).hide();
      $('.placeholder-show').removeClass('placeholder-show');
      $('.loading-form-cover').fadeOut(200);
      $('.loading-title-cover').fadeOut(200);
      $('.main-wrapper .check .grid.noplaceholder').addClass('price-placeholder');

      // window loaded functions
      // histogram('#histogram', histogramData);
      histogram();
      // jquery ui draggable
      var itemsCount = 0;
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
          if ( $element.parent().hasClass('sidebar-block-wrapper') ) {
            var calc = 1 - ( ui.position.left + $element.children('.panel').eq(itemsCount - 1).width() - 400 ) / 400 - 0.275;
            itemsCount = $element.children('.panel').length;

            $element.children('.panel').eq(itemsCount - 1).css('opacity', calc);
          }
        }
      });

      $(window).disablescroll('undo');
      initTouchHandler($(".draggable"));
      checkMobileFilter('#myonoffswitch-mobile-gallery', '#myonoffswitch-mobile-map');
      reinitMap();
      setMapWrapperHeight();
      $('.stars-hotel[data-stars]').stars();
      $('.rate[data-rate]').rate();
      $('.map-item-block--wrapper').mCustomScrollbar({
        autoHideScrollbar: true
      });

      $('.landing-popup .map-item-block--wrapper').mCustomScrollbar({
        scrollbarPosition: "outside"
      });

      // if ( $(window).width() > 1199 ) {
      //   if ( $('.input-group.search-group').length && $('.noplaceholder .grid-item').length ) {
      //     setTimeout(function() {
      //       scrolledElement($(this), '.input-group.search-group', $('.noplaceholder .grid-item').eq(2).offset().top, '#search-space', $('.noplaceholder .grid-item').last().prev('.grid-item').andSelf().offset().top);
      //     }, 10);
      //   }
      // } else {
      //   destroyScrolledElement('.input-group.search-group', '#search-space');
      // }

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
      //
      // $('.attractions_gallery').mCustomScrollbar({
      //   scrollbarPosition: "outside"
      // });

      // if ( $(window).width() < 768 ) {
      //   $('#reviews .review-block_comments').mCustomScrollbar({
      //     scrollbarPosition: "outside"
      //   });
      // }


      $('.map-wrapper .ui.sticky').sticky({
        context: '#sticky-wrap',
        silent: true,
        onScroll: function() {
          $(this).width($(this).parent().width());
          $(this).css('left', $(this).parent().offset().left);
          reinitMap();
        }
      });

      $('.sidebar-filter .ui.sticky').sticky({
        context: '#sticky-wrap',
        silent: true
      });

      if ( $(window).width() > 991 ) {
        $('.payment-details-wrapper .payment-details .ui.sticky').sticky({
          context: '#sticky-wrap',
          silent: true,
          observeChanges: true
        });
        $('.payment-details-wrapper .payment-details .sidebar-block .panel-second').appendTo($('.payment-details .sidebar-block'));
        $('.payment-details-wrapper .payment-details .sidebar-block .slider-panel').css('opacity', 1);
      } else {
        var paymentSidebarWidth = 0;
        $('.payment-details-wrapper .payment-details .sidebar-block .panel').each(function() {
          if ( !$(this).hasClass('placeholder-room-info') ) {
            paymentSidebarWidth += $(this).outerWidth();
          }
        });
        $('.payment-details-wrapper .payment-details .sidebar-block').css('max-width', paymentSidebarWidth);

        $('.payment-details-wrapper .payment-details .sidebar-block .panel').matchHeight();

        $('.payment-details-wrapper .payment-details .sidebar-block .panel-second').insertAfter('.payment-details-wrapper .payment-details .sidebar-block .panel-first');
      }

      if ( $(window).width() > 991 ) {
        $('.details-item-info .main-sidebar').addClass('ui sticky');
        $('.details-item-info .ui.sticky').sticky({
          context: '#sticky-wrap',
          silent: true,
          observeChanges: true
        });
      } else {
        // $('.details-item-info').removeAttr('style');
        $('.details-item-info .ui.sticky').removeClass('ui sticky');
      }

      AOS.refresh();
    }, 1500);
    setTimeout(function() {
      $('.main-wrapper .check .grid.noplaceholder').removeClass('price-placeholder');
    }, 5000);
    // remove all placeholders
    setTimeout(function() {
      $('.placeholder-sidebar,' +
          '.placeholder-grid,' +
          '.placeholder-map,' +
          '.placeholder-slider,' +
          '.placeholder-thumbs,' +
          '.placeholder-logo,' +
          '.placeholder-info,' +
          '.placeholder-facilities,' +
          '.placeholder-room-info'
      ).remove();
    }, 1501);
  });


})(jQuery);