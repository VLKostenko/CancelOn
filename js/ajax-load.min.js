function addSpinnerSpin() {
  $('.loading-more .loading .dots').addClass('active');
}

function removeSpinnerSpin() {
  $('.loading-more .loading .dots').removeClass('active');
}

function setMapWrapperHeight() {
  var mainWrapperHeight = $('.main-wrapper').height();
  $('.map-wrapper').height(mainWrapperHeight);
  $('.sidebar-filter').height(mainWrapperHeight);
}

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
}

// Ajax setup
$.ajaxSetup({
  cache: false
});

$('.loading-more .loading a').click(function(event) {
  var href = this.href;
  event.preventDefault();
  addSpinnerSpin();
  setTimeout(function() {
    loadContentSearch(href);
    console.log('content loaded');
  }, 2000);
  setTimeout(function() {
    setMapWrapperHeight();
  }, 2100);
});

function loadContentSearch(url) {
  $.ajax({
    url: url,
    type: 'GET',
    beforeSend: function() {
    },
    success: function(data) {
      removeSpinnerSpin();
      $('.main-wrapper .content-wrapper .check .grid').append(data);
      // $('.main-wrapper .content-wrapper .check .grid').removeClass('placeholder-show');
      // if ( !$('.main-wrapper .content-wrapper .check .grid:first-child').hasClass('list-view') ) {
      //   $('.main-wrapper .content-wrapper .check .grid:last-child').removeClass('list-view');
      // }
      if ( $('#reviews .review-block_comments').length ) {
        if ( !$('#reviews .review-block_comments').hasClass('mCustomScrollbar') ) {
          $('#reviews .review-block_comments').append(data);
          $('#reviews .review-block_comments').mCustomScrollbar({
            scrollbarPosition: "outside"
          });
        } else {
          $('#reviews .review-block_comments.mCustomScrollbar .mCustomScrollBox .mCSB_container').append(data);
        }
      }
      $('.stars-hotel').stars();
      $('.rate').rate();
      $('.map-wrapper .ui.sticky').sticky('destroy');
      $('.map-wrapper .ui.sticky').sticky({
        context: '#sticky-wrap',
        silent: true,
        observeChanges: true
      });
      reinitMap();
      gridViewChecker();
      sortTypeItem();
      setTimeout(function() {
        $(window).trigger('resize');
        console.log('resize');
      }, 100);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(textStatus + ': ' + errorThrown + ' please, try again later');
    }
  });
}

function loadContentTable(tableType) {
  var existing = $('.booking-table table.table.table-responsive').hasClass(tableType);
  if ( !existing ) {
    var url;
    if ( window.location.href.indexOf("localhost") > -1 ) {
      url = '/partial/' + tableType + '.html';
    } else {
      url = './partial/' + tableType + '.html';
    }
    console.log(url);
    var xhr = $.ajax({
      url: url,
      type: 'GET',
      crossDomain: true,
      beforeSend: function() {
        start_time = new Date().getTime();
      },
      success: function(data) {
        $('.booking-table table.table.table-responsive').remove();
        $('.booking-table').append(data);
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
          if (current > allItems || current === 0) {
            current = allItems - (current % allItems);
          }
          event.relatedTarget.$element.context.nextElementSibling.innerHTML = current + "/" + event.item.count;
        });
        var request_time = new Date().getTime() - start_time;
        console.log('Time of loading table', request_time + ' milliseconds');
        console.log('Size of loaded table', xhr.getResponseHeader('Content-Length') + ' bytes');
      },
      error: function() {
        alert('Tables loading failed, please, use server');
      }
    });
  }
}

$(window).load(function() {
  if ( $('.booking-table').length ) {
    if ( $(window).width() < 768 ) {
      loadContentTable('table-mobile');
    } else if ( $(window).width() > 767 && $(window).width() < 992 ) {
      loadContentTable('table-tablet');
    } else {
      loadContentTable('table-desktop');
    }
  }
});

$(window).resize(function() {
  if ( $('.booking-table').length ) {
    if ( $(window).width() < 768 ) {
      loadContentTable('table-mobile');
    } else if ( $(window).width() > 767 && $(window).width() < 992 ) {
      loadContentTable('table-tablet');
    } else {
      loadContentTable('table-desktop');
    }
  }
});