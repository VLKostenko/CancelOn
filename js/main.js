;(function($) {
  "use strict";
  /*
   * Datepicker initialization
   */
  var datepickerInput = $('.datepicker-input');
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

  //plugin bootstrap minus and plus
  //http://jsfiddle.net/laelitenetwork/puJ6G/
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

  var input = $('.input-number');

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
    // Allow: backspace, delete, tab, escape, enter and .
    if ( $.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39) ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ( (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) ) {

    }
  });

  $('.dropdown-menu').click(function(event) {
  event.stopPropagation();
  });

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
    if ( $('.myonoffswitch').prop('checked') ) {
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
        if ( $(window).width() > 768 ) {
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
    scrolledElement($(this), '.input-group.search-group', $('.grid-item').eq(2).offset().top, '#search-space', $('.grid-item').last().prev('.grid-item').andSelf().offset().top);
  });

  $('.collapse').on('shown.bs.collapse', function() {
    $(this).prev().find('.fa').removeClass("fa-caret-down").addClass("fa-caret-up");
  }).on('hidden.bs.collapse', function() {
    $(this).prev().find('.fa').removeClass("fa-caret-up").addClass("fa-caret-down");
  });

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

  $('.grid-btn').click(function() {
    gridView();
  });

  $('.list-btn').click(function() {
    listView();
  });

  $('.owl-carousel').owlCarousel({
    loop: true,
    items: 1,
    nav: true,
    lazyLoad: true,
    singleItem: true,
    navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
  });

  $('.navbar-brand.dropdown.opened').click(function() {

  });

  $('.datepicker-output').on('click', function() {
    $('.datepicker-input').click();
  });

  $('.hide-filter').click(function() {
    if ( $(this).hasClass('hidden-filter') ) {
      $(this).removeClass('hidden-filter');
      $(this).children('.menu-icon').addClass('active');
      // $('.sidebar-filter').show("slide", { direction: "left" }, 200);
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

  var search = $('.input-search');
  var searchResult = $('.search-result');
  var loadIcon = $('.load-icon');

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
  search.on('keyup blur', toggleFocus);

  search.on('keyup', function() {
    if ( !loadIcon.hasClass('writing') ) {
      loadIcon.addClass('writing');
      setTimeout(function() {
        loadIcon.removeClass('writing');
      }, 3000);
    }
  });

  $('.btn-go-app').click(function() {
    $('html, body').animate(
      {
        scrollTop : 0
      }, 800);
    return false;
  });

  function reinitMap() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  }

  function hideMobileNav() {
    $('.navbar-header').removeClass('open-menu');
    $('body').removeClass('opened-menu');
    $('.black-bg-search').fadeOut(200).removeAttr('style')
  }

  function hideMobileFilter() {
    $('.navbar-header').removeClass('open-filter');
    $('body').removeClass('opened-filter');
    $('.black-bg-search').fadeOut(200).removeAttr('style')
  }

  $('#menu-button').click(function() {
    if ( $(this).parent('.navbar-header').hasClass('open-menu') ) {
      hideMobileNav();
    } else {
      $(this).parent('.navbar-header').addClass('open-menu');
      $('body').addClass('opened-menu');
      $('.black-bg-search').fadeIn(200).css({
        'position': 'fixed',
        'z-index': '100'
      });
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
    if ( $('.navbar-header').hasClass('open-menu') ) {
      hideMobileNav();
    } else if ( $('.navbar-header').hasClass('open-filter') ) {
      hideMobileFilter();
    }
    $(this).fadeOut(200);
  });


  function hideMapItemBlock() {
    $('.map-item-block').hide("slide", { direction: "right" }, 200);
  }

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

  function sidebarPosition() {
    if ( $(window).width() < 768 ) {
      $('.sidebar-filter').appendTo('#filter_mobile');
    } else {
      $('.sidebar-filter').insertBefore($('.main-wrapper'));
    }
  }

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
        console.log('opa4ki kyky epta');
      }
    }
  });

  $(window).load(function() {
    $('.stars-hotel').stars();
    $('.rate').rate();
    if ( $(window).width() < 768 ) {
      $('.sidebar-filter').mCustomScrollbar();
    }
    $('.map-item-block--wrapper').mCustomScrollbar({
      autoHideScrollbar: true
    });

  });

  function initAOS() {
    if ( $(window).width() > 1199 ) {
      AOS.init();
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

  // execute above function
  initPhotoSwipeFromDOM('.photoswipe-block');

  initPhotoSwipeFromDOM('.photoswipe-block');

  function setMapWrapperHeight() {
    var mainWrapperHeight = $('.main-wrapper').height();
    $('.map-wrapper').height(mainWrapperHeight);
    $('.sidebar-filter').height(mainWrapperHeight);
  }


  $(document).ready(function() {
    $('.sticky').Stickyfill();
    initAOS();
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

  $('.people-count .book-menu .btn-number').click(function() {
    var value = $(this).parent().siblings('.input-number').val();
    var el = $(this).parent().siblings('.input-number').data('id');
    $('#' + el).html(value);
    console.log(value, el);
  });

  $('.people-count #peopleCount').click(function() {
    $('.black-bg-search').fadeIn(200);
    $(this).closest('.people-count').addClass('active');
  });

  function scrolledElement(scrollPos, target, targetLine, targetSpace, targetEnd) {
    if ( !$('.myonoffswitch').prop('checked') ) {
      if ( scrollPos.scrollTop() >= targetLine && !$(target).hasClass('closed') && scrollPos.scrollTop() <= targetEnd ) {
        $(targetSpace).height(113);
        $(target).addClass('scrolled');
        console.log('scroll position > target position');
      } else if ( scrollPos.scrollTop() < targetLine || scrollPos.scrollTop() > targetEnd ) {
        $(target).removeClass('scrolled closed');
        $(targetSpace).height('initial');
        console.log('scroll position < target position');
      }
    }
  }

  $(window).scroll(function() {
    scrolledElement($(this), '.input-group.search-group', $('.grid-item').eq(2).offset().top, '#search-space', $('.grid-item').last().prev('.grid-item').andSelf().offset().top);
  });
  $('.search-group .close-search').click(function() {
    $('.input-group.search-group').removeClass('scrolled');
    $('#search-space').height('initial');
    $('.input-group.search-group').addClass('closed');
  });

  $('#peopleCount').click(function() {
    $('body').css('overflow', 'hidden');
  });

  $('.ui.sticky').sticky({ context: '#example3' });
  $('.open-map-item').click(function() {
    $('.black-bg-map').fadeIn(200);
    $('.map-item-block').show("slide", { direction: "right" }, 300);
    $('body').css('overflow', 'hidden');
  });

})(jQuery);