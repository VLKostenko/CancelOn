/**
 * Created by buyandfly on 10.04.17.
 */
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

  $('.grid').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'masonry',
    masonry: {
      columnWidth: '.grid-item',
      gutter: 15
    }
  });

  $('.list').isotope({
    itemSelector: '.list-item',
    layoutMode: 'masonry',
    masonry: {
      columnWidth: '.list-item',
      gutter: 15
    }
  });

  $('.onoffswitch').click(function() {
    if ( document.getElementById('myonoffswitch').checked ) {

      $('#map').show();
      $('.check').css('width', '52.3%');
      $('.grid-item').css('width', '49%');
      $('.exclusive').css('width', '54.17841374874%');
      $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: '.grid-item',
          gutter: 15
        }
      });

      $('.list').isotope({
        itemSelector: '.list-item',
        layoutMode: 'masonry',
        masonry: {
          columnWidth: '.list-item',
          gutter: 15
        }
      });
    } else {
      $('#map').hide();
      $('.check').css('width', '83.2%');
      $('.grid-item').css('width', '32%');
      $('.exclusive').css('width', '84.33%');
      $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: '.grid-item',
          gutter: 15
        }
      });

      $('.list').isotope({
        itemSelector: '.list-item',
        layoutMode: 'masonry',
        masonry: {
          columnWidth: '.list-item',
          gutter: 15
        }
      });
    }
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

    $('.list').isotope({
      itemSelector: '.list-item',
      layoutMode: 'masonry',
      masonry: {
        columnWidth: '.list-item',
        gutter: 15
      }
    });
  });

  $('.grid-btn').click(function(e) {
    e.preventDefault();
    $(this).addClass('active');
    $('.list-btn').removeClass('active');
    $('.list').hide();
    $('.grid').show();

    $('.grid').isotope({
      itemSelector: '.grid-item',
      layoutMode: 'masonry',
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: '.grid-item',
        gutter: 15
      }
    });
  });

  $('.owl-carousel').owlCarousel({
    loop: true,
    items: 1,
    nav: false,
    lazyLoad: true,
    singleItem: true
  });

})(jQuery);