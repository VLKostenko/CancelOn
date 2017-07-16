function addSpinnerSpin() {
  $('.loading-more .loading .fa-spinner').show(200);
}

function removeSpinnerSpin() {
  $('.loading-more .loading .fa-spinner').hide(200);
}

function setMapWrapperHeight() {
  var mainWrapperHeight = $('.main-wrapper').height();
  $('.map-wrapper').height(mainWrapperHeight);
  $('.sidebar-filter').height(mainWrapperHeight);
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
    url: './' + url,
    type: 'GET',
    beforeSend: function() {
    },
    success: function(data) {
      removeSpinnerSpin();
      $('.main-wrapper .content-wrapper .check').append(data);
      $('.main-wrapper .content-wrapper .check .grid').removeClass('placeholder-show');
      if ( !$('.main-wrapper .content-wrapper .check .grid:first-child').hasClass('list-view') ) {
        $('.main-wrapper .content-wrapper .check .grid:last-child').removeClass('list-view');
      }
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
      $('.ui.sticky').sticky({
        context: '#sticky-wrap',
        silent: true
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(textStatus + ': ' + errorThrown + ' please, try again later');
    }
  });
}

function loadContentTable(tableType) {
  var existing = $('.booking-table table.table.table-responsive').hasClass(tableType);
  if ( !existing ) {
    var xhr = $.ajax({
      url: './partial/' + tableType + '.html',
      type: 'GET',
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
          if (current > allItems || current == 0) {
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
    } else if ( $(window).width() > 768 && $(window).width() < 992 ) {
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
    } else if ( $(window).width() > 768 && $(window).width() < 992 ) {
      loadContentTable('table-tablet');
    } else {
      loadContentTable('table-desktop');
    }
  }
});