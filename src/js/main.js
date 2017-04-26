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
      singleMonth: true,
      showTopbar: false,
      format: 'DD.MM.YYYY HH:mm',
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
      $('#map').removeClass('full-width');
      $('.black-bg-map').removeClass('no-filter');
      $('.black-bg-search').removeClass('no-filter');
      $('.main-wrapper').removeClass('hidden-sidebar-filter');
      if ( $('.hide-filter').hasClass('hidden-filter') ) {
        $('.content-wrapper').fadeIn(200);
      } else {
        $('.sidebar-filter, .content-wrapper').fadeIn(200);
      }
      $(' .filter-top .search-filter, .filter-top .display, .filter-top .bootstrap-select, .filter-top .avail')
        .css({
          'opacity': 0,
          'pointer-events': 'initial'
        })
        .animate({
          'opacity': 1
        }, 200);
    } else {
      $('#map').addClass('full-width');
      $('.black-bg-map').addClass('no-filter');
      $('.black-bg-search').addClass('no-filter');
      $('.main-wrapper').addClass('hidden-sidebar-filter');
      $('.sidebar-filter, .content-wrapper').fadeOut(200);
      $(' .filter-top .search-filter, .filter-top .display, .filter-top .bootstrap-select, .filter-top .avail')
        .css({
          'opacity': 1,
          'pointer-events': 'none'
        })
        .animate({
          'opacity': 0
        }, 200);
    }
    reinitMap();

  });

  $('.collapse').on('shown.bs.collapse', function() {
    $(this).prev().find('.fa').removeClass("fa-caret-down").addClass("fa-caret-up");
  }).on('hidden.bs.collapse', function() {
    $(this).prev().find('.fa').removeClass("fa-caret-up").addClass("fa-caret-down");
  });

  $('.list-btn').click(function(e) {
    e.preventDefault();
    $(this).addClass('active');
    $('.grid-btn').removeClass('active');
    $('.grid').hide();
    $('.list').show();

  });

  /**
   * ------------------------------------------------------------------------------------------------------
   * Load More Items on Page Scroll (on reaching .loading-wrapper)
   * ------------------------------------------------------------------------------------------------------
   **/

  appear({
    elements: function elements() {
      return document.getElementsByClassName('loading-more');
    },
    appear: function appear(el) {
      var type = el.getAttribute('data-type');
      el.innerHTML =
        '<div class="loading">' +
          '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>' +
          '<span class="text-uppercase">Loading</span>' +
        '</div>';
      function appendItems(data) {
        var newItems = $(data);

        $('.content-wrapper .check').append(newItems).fadeIn(200);
      }

      function shiftedLoading() {
        $.get('partial/ajax-grid.html', {}, function(data) {
          appendItems(data);
        });
        el.innerHTML = '';
      }
      setTimeout(shiftedLoading, 1500);
    },
    // if 'reappear: true' appear.js will keep tracking elements for successfuive appears and dissappears
    reappear: false
  });



  $('.grid-btn').click(function(e) {
    e.preventDefault();
    $(this).addClass('active');
    $('.list-btn').removeClass('active');
    $('.list').hide();
    $('.grid').show();

  });

  $('.owl-carousel').owlCarousel({
    loop: true,
    items: 1,
    nav: false,
    lazyLoad: true,
    singleItem: true
  });

  $('.navbar-brand.dropdown').click(function() {

    if ( $(this).hasClass('opened') ) {
      $(this).removeClass('opened');
    } else {
      $(this).addClass('opened');
    }

  });

  $('.navbar-brand.dropdown.opened').click(function() {

  });

  // $('.datepicker-output').on('click', function(event) {
  //   // $('.datepicker-input').click();
  // });

  $('.hide-filter').click(function() {
    if ( $(this).hasClass('hidden-filter') ) {
      $(this).removeClass('hidden-filter');
      $('.sidebar-filter').show("slide", { direction: "left" }, 200);
      $('.main-wrapper.hidden-sidebar-filter').removeClass('hidden-sidebar-filter');
      $('.black-bg-map').removeClass('no-filter');
      $('.black-bg-search').removeClass('no-filter');
    } else {
      $(this).addClass('hidden-filter');
      $('.sidebar-filter').hide("slide", { direction: "left" }, 200);
      $('.black-bg-map').addClass('no-filter');
      $('.black-bg-search').addClass('no-filter');
      $('.main-wrapper').addClass('hidden-sidebar-filter');
    }
    reinitMap();
  });

  function toggleFocus(e) {
    if ( e.type == 'keyup' ) {
      $('.search-result').fadeIn(200);
      $('.black-bg-search').fadeIn(200);
    }
    else {
      $('.search-result').fadeOut(200);
      $('.black-bg-search').fadeOut(200);
    }
    if(e.which == 13) {
      $('.search-result').fadeOut(200);
      $('.black-bg-search').fadeOut(200);
    }
  }
  $('.input-search').on('keyup blur', toggleFocus);

  $('.btn-go-app').click(function() {
    $('html, body').animate(
      {
        scrollTop : 0
      }, 800);
    return false;
  });

  var IE = navigator.userAgent.indexOf("MSIE") > -1;

  if ( IE ) {
    $('body').addClass('ie-style');
  }

  function reinitMap() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  }

  // $(document).ready(function(){
  //   $('.scrollbar-dynamic').scrollbar();
  // });

  $('#menu-button').click(function() {
    if ( $(this).parent('.navbar-header').hasClass('open') ) {
      $(this).parent('.navbar-header').removeClass('open');
      $('body').removeClass('opened-menu');
    } else {
      $(this).parent('.navbar-header').addClass('open');
      $('body').addClass('opened-menu');
    }
  });

})(jQuery);