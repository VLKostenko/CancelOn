var map, map1;
var labels = '123456789';
var blackIcon = 'images/icons/black-marker.png';
var blueIcon = 'images/icons/blue-marker.png';

function initialize() {

  var locations = [
    [
      'Soho, Soma-Bay Resort',
      '485 Clawson St, Staten Island, NY 10306',
      '4.8',
      'images/room1.png',
      38.885765,
      -77.047563,
      '8',
      'images/icons/black-marker.png'
    ],
    [
      'Radisson Blu Resort',
      '485 Clawson St, Staten Island, NY 10306',
      '4.2',
      'images/room3.png',
      38.877951,
      -77.035238,
      '7',
      'images/icons/black-marker.png'
    ],
    [
      'London Hilton Hotel',
      '485 Clawson St, Staten Island, NY 10306',
      '4.74',
      'images/room2.png',
      38.888337,
      -77.025073,
      '6',
      'images/icons/black-marker.png'
    ],
    [
      'Joint Base',
      '485 Clawson St, Staten Island, NY 10306',
      '4.9',
      'images/room4.png',
      38.846002,
      -77.016459,
      '5',
      'images/icons/black-marker.png'
    ],
    [
      'St Martins Lane London',
      'Amsterdam Schiphol, Netherlands',
      '4.97',
      'images/room5.png',
      38.823484,
      -77.008872,
      '6',
      'images/icons/black-marker.png'
    ]
  ];

  var options = {
    zoom: 13,
    center: new google.maps.LatLng(locations[0][4] - 0.07, locations[0][5] - ( -0.015)),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
    }
  };

  map = new google.maps.Map(document.getElementById('map'), options);

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for ( i = 0; i < locations.length; i++ ) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][4], locations[i][5]),
      map: map,
      icon: {
        url: locations[i][7],
        labelOrigin: new google.maps.Point(14, 14)
      },
      label: {
        text: locations[i][6],
        color: 'white',
        fontSize: '14px'
      }
    });

    var handleMarkerClick = (function(marker, i) {

        var iwContent =
          '<div class="thumbnail" style="width: 250px;">' +
          '<div class="thumbnail-wrapper">' +
          '<a href="javascript:void(0)" class="iw-close-btn">' +
          '<i class="fa fa-times" aria-hidden="true"></i>' +
          '</a>' +
          '<a href="javascript:void(0)" class="thumbnail-img">' +
          '<div style="background-image:url(' + locations[i][3] + ');" class="image"></div>' +
          '<div class="thumbnail-info text-right">' +
          '<span class="label">Rate ' + locations[i][2] + '</span>' +
          '</div>' +
          '</a>' +
          '<div class="caption">' +
          '<h5>' +
          '<a href="javascript:void(0)">' + locations[i][0] + '</a>' +
          '</h5>' +
          '<p> ' + locations[i][1] + '</p>' +
          '<a href="javascript:void(0)" class="view-btn open-map-item">View</a>' +
          '</div>' +
          '</div>' +
          '</div>';
        return function() {
          infowindow.setContent(iwContent);
          infowindow.open(map, marker);
        }
      })(marker, i);

    function handleMarkerMouseOver() {
      if ( this.icon.url == blackIcon ) {
        this.setIcon({
          url: blueIcon,
          labelOrigin: new google.maps.Point(14, 14)
        });
      }
    }

    function handleMarkerMouseLeave() {
      if ( this.icon.url == blueIcon ) {
        this.setIcon({
          url: blackIcon,
          labelOrigin: new google.maps.Point(14, 14)
        });
      }
    }

    google.maps.event.addListener(marker, 'click', handleMarkerClick);
    google.maps.event.addListener(marker, "mouseover", handleMarkerMouseOver);
    google.maps.event.addListener(marker, "mouseout", handleMarkerMouseLeave);

    google.maps.event.addListener(infowindow, 'domready', function() {
      $('.map-wrapper .open-map-item,' +
        '.features .open-map-item').click(function() {
        $('.black-bg-map').fadeIn(200);
        $('.map-item-block').show("slide", { direction: "right" }, 300);
        if ( $(window).width() > 992 ) {
          $(window).disablescroll();
        }
      });

      $('.hotel-information .open-map-item, .gallery-map-wrapper .open-map-item').click(function() {
        $('.black-bg-map').fadeIn(200);
        $('.map-item-block').show().animateCss('bounceIn');
        if ( $(window).width() > 992 ) {
          $(window).disablescroll();
        }
      });

      var closeBtn = $('.iw-close-btn').get();
      google.maps.event.addDomListener(closeBtn[0], 'click', function() {
        infowindow.close();
      });

    });

    $('.main-wrapper .black-bg-map, .main-wrapper .map-item-block .close-btn, .input-search').click(function() {
      $('.black-bg-map').fadeOut(200);
      $('.map-item-block').hide("slide", { direction: "right" }, 200);
      $(window).disablescroll('undo');
    });

    $('.hotel-information .black-bg-map, .hotel-information .map-item-block .close-btn, .landing-popup .black-bg-map, .landing-popup .map-item-block .close-btn').click(function() {
      $('.black-bg-map').fadeOut(200);
      $('.map-item-block').fadeOut(750).animateCss('bounceOut');
      setTimeout(function() {
        $('.map-item-block').removeClass('animated bounceOut');
      }, 750);
      $(window).disablescroll('undo');
    });

    google.maps.event.addListener(map, 'click', function() {
      infowindow.close();
    });
  }
}

function initialize1() {

  var locations1 = [
    [
      'Soho, Soma-Bay Resort',
      '485 Clawson St, Staten Island, NY 10306',
      '4.8',
      'images/room1.png',
      38.885765,
      -77.047563,
      '8',
      'images/icons/black-marker.png'
    ],
    [
      'Radisson Blu Resort',
      '485 Clawson St, Staten Island, NY 10306',
      '4.2',
      'images/room3.png',
      38.877951,
      -77.035238,
      '7',
      'images/icons/black-marker.png'
    ],
    [
      'London Hilton Hotel',
      '485 Clawson St, Staten Island, NY 10306',
      '4.74',
      'images/room2.png',
      38.888337,
      -77.025073,
      '6',
      'images/icons/black-marker.png'
    ],
    [
      'Joint Base',
      '485 Clawson St, Staten Island, NY 10306',
      '4.9',
      'images/room4.png',
      38.846002,
      -77.016459,
      '5',
      'images/icons/black-marker.png'
    ],
    [
      'St Martins Lane London',
      'Amsterdam Schiphol, Netherlands',
      '4.97',
      'images/room5.png',
      38.823484,
      -77.008872,
      '6',
      'images/icons/black-marker.png'
    ]
  ];

  var options1 = {
    zoom: 13,
    center: new google.maps.LatLng(locations1[0][4] - 0.07, locations1[0][5] - ( -0.015)),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
    }
  };

  map1 = new google.maps.Map(document.getElementById('map1'), options1);

  var infowindow1 = new google.maps.InfoWindow();

  var marker1, b;

  for ( b = 0; b < locations1.length; b++ ) {
    marker1 = new google.maps.Marker({
      position: new google.maps.LatLng(locations1[b][4], locations1[b][5]),
      map: map1,
      icon: {
        url: locations1[b][7],
        labelOrigin: new google.maps.Point(14, 14)
      },
      label: {
        text: locations1[b][6],
        color: 'white',
        fontSize: '14px'
      }
    });

    var handleMarkerClick1 = (function(marker1, b) {

      var iwContent1 =
        '<div class="thumbnail" style="width: 250px;">' +
        '<div class="thumbnail-wrapper">' +
        '<a href="javascript:void(0)" class="iw-close-btn">' +
        '<i class="fa fa-times" aria-hidden="true"></i>' +
        '</a>' +
        '<a href="javascript:void(0)" class="thumbnail-img">' +
        '<div style="background-image:url(' + locations1[b][3] + ');" class="image"></div>' +
        '<div class="thumbnail-info text-right">' +
        '<span class="label">Rate ' + locations1[b][2] + '</span>' +
        '</div>' +
        '</a>' +
        '<div class="caption">' +
        '<h5>' +
        '<a href="javascript:void(0)">' + locations1[b][0] + '</a>' +
        '</h5>' +
        '<p> ' + locations1[b][1] + '</p>' +
        '<a href="javascript:void(0)" class="view-btn open-map-item">View</a>' +
        '</div>' +
        '</div>' +
        '</div>';
      return function() {
        infowindow1.setContent(iwContent1);
        infowindow1.open(map1, marker1);
      }
    })(marker1, b);

    function handleMarkerMouseOver1() {
      if ( this.icon.url == blackIcon ) {
        this.setIcon({
          url: blueIcon,
          labelOrigin: new google.maps.Point(14, 14)
        });
      }
    }

    function handleMarkerMouseLeave1() {
      if ( this.icon.url == blueIcon ) {
        this.setIcon({
          url: blackIcon,
          labelOrigin: new google.maps.Point(14, 14)
        });
      }
    }

    google.maps.event.addListener(marker1, 'click', handleMarkerClick1);
    google.maps.event.addListener(marker1, "mouseover", handleMarkerMouseOver1);
    google.maps.event.addListener(marker1, "mouseout", handleMarkerMouseLeave1);

    google.maps.event.addListener(infowindow1, 'domready', function() {
      $('.map-item-block .open-map-item,' +
        '.features .open-map-item').click(function() {
        $('.black-bg-map').fadeIn(200);
        $('.map-item-block').show("slide", { direction: "right" }, 300);
        if ( $(window).width() > 992 ) {
          $(window).disablescroll();
        }
      });

      $('.hotel-information .open-map-item, .gallery-map-wrapper .open-map-item').click(function() {
        $('.black-bg-map').fadeIn(200);
        $('.map-item-block').show().animateCss('bounceIn');
        if ( $(window).width() > 992 ) {
          $(window).disablescroll();
        }
      });

      var closeBtn1 = $('.iw-close-btn').get();
      google.maps.event.addDomListener(closeBtn1[0], 'click', function() {
        infowindow1.close();
      });

    });

    $('.main-wrapper .black-bg-map, .main-wrapper .map-item-block .close-btn, .input-search').click(function() {
      $('.black-bg-map').fadeOut(200);
      $('.map-item-block').hide("slide", { direction: "right" }, 200);
      $(window).disablescroll('undo');
    });

    $('.hotel-information .black-bg-map, .hotel-information .map-item-block .close-btn, .landing-popup .black-bg-map, .landing-popup .map-item-block .close-btn').click(function() {
      $('.black-bg-map').fadeOut(200);
      $('.map-item-block').fadeOut(750).animateCss('bounceOut');
      setTimeout(function() {
        $('.map-item-block').removeClass('animated bounceOut');
      }, 750);
      $(window).disablescroll('undo');
    });

    google.maps.event.addListener(map1, 'click', function() {
      infowindow1.close();
    });
  }
}

if ( $('#map').length && $('#map1').length ) {
  google.maps.event.addDomListener(window, 'load', initialize);
  google.maps.event.addDomListener(window, 'load', initialize1);
} else if ( $('#map').length ) {
  google.maps.event.addDomListener(window, 'load', initialize);
}