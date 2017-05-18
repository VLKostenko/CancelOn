$(document).ready(function() {

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
      loadContent(href);
    }, 2000);
    setTimeout(function() {
      setMapWrapperHeight();
    }, 2100);
  });

  function loadContent(url) {
    $.ajax({
      url: url,
      type: 'GET',
      beforeSend: function() {
      },
      success: function(data) {
        removeSpinnerSpin();
        $('.main-wrapper .content-wrapper .check').append(data);
        // if ( !$('.main-wrapper .content-wrapper .check .grid:first-child').hasClass('list-view') ) {
        //   $('.main-wrapper .content-wrapper .check .grid:last-child').removeClass('list-view');
        // }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert(textStatus + ': ' + errorThrown + ' please, try again later');
      }
    });
  }
});