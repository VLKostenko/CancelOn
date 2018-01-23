var map, map1, map2;
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
      position: google.maps.ControlPosition.BOTTOM_LEFT
    },
  };

  map = new google.maps.Map(document.getElementById('map'), options);

  var marker, i;

  for ( i = 0; i < locations.length; i++ ) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][4], locations[i][5]),
      map: map,
      icon: {
        url: locations[i][7],
        labelOrigin: new google.maps.Point(14, 14)
      },
      // label: {
      //   text: locations[i][6],
      //   color: 'white',
      //   fontSize: '14px'
      // }
    });

    var iwContent =
      '<div class="thumbnail">'+
      '  <div class="thumbnail-wrapper"><a class="thumbnail-img" href="javascript:void(0)">'+
      '      <div class="image" style="background-image: url(' + locations[i][3] + ');"></div>'+
      '      <div class="thumbnail-info text-right"><span class="label"> ' + locations[i][2] + '</span></div></a>'+
      '    <div class="caption">'+
      '      <div class="calendar-price">'+
      '        <div class="calendar"> '+
      '          <div class="icon"><i class="fa fa-calendar" aria-hidden="true"></i></div>'+
      '          <div class="date"><span>July, </span>'+
      '            <span class="day">3th</span>'+
      '            <span>- August,</span>'+
      '            <span class="day">14th</span>'+
      '          </div>'+
      '        </div>'+
      '        <div class="price"><span class="number">$468</span><span class="slash">/</span><span class="day">Day</span></div>'+
      '      </div>'+
      '      <div class="title">'+
      '        <h5><a href="javascript:void(0)">' + locations[i][0] + '</a></h5>'+
      '        <div class="blocks-wrapper">'+
      '          <div class="block rooms">'+
      '            <div class="icon"></div>'+
      '            <div class="count">3</div>'+
      '          </div>'+
      '          <div class="block adults">'+
      '            <div class="icon"></div>'+
      '            <div class="count">3</div>'+
      '          </div>'+
      '          <div class="block children">'+
      '            <div class="icon"></div>'+
      '            <div class="count">2</div>'+
      '          </div>'+
      '        </div>'+
      '      </div>'+
      '      <div class="rating-line">'+
      '        <div class="stars">'+
      '          <ul class="stars-hotel" data-stars=' + locations[i][2] + '>'+
      '            <li><i class="fa fa-star" aria-hidden="true"></i></li>'+
      '            <li><i class="fa fa-star" aria-hidden="true"></i></li>'+
      '            <li><i class="fa fa-star" aria-hidden="true"></i></li>'+
      '            <li><i class="fa fa-star" aria-hidden="true"></i></li>'+
      '            <li class="hidden"><i class="fa fa-star" aria-hidden="true"></i></li>'+
      '          </ul>'+
      '        </div>'+
      '        <div class="rate" data-rate=' + locations[i][2] + '><img class="rate-image" src="./images/icons/rate/5.0.svg"/></div>'+
      '        <div class="reviews"><a href="javascript:void(0)">142 Reviews</a></div>'+
      '      </div>'+
      '      <div class="buttons-line"><a class="view-btn open-map-item" href="javascript:void(0)">View</a><a class="close-btn" href="javascript:void(0)">Close</a></div>'+
      '    </div>'+
      '  </div>'+
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: iwContent
    });

    infowindow.open(map, marker);

    // var loadMarkerInfo = (function(marker, i) {
    //
    //     var iwContent =
    //       '<div class="thumbnail">'+
    //       '  <div class="thumbnail-wrapper"><a class="thumbnail-img" href="javascript:void(0)">'+
    //       '      <div class="image" style="background-image: url(' + locations[i][3] + ');"></div>'+
    //       '      <div class="thumbnail-info text-right"><span class="label"> ' + locations[i][2] + '</span></div></a>'+
    //       '    <div class="caption">'+
    //       '      <div class="calendar-price">'+
    //       '        <div class="calendar"> '+
    //       '          <div class="icon"><i class="fa fa-calendar" aria-hidden="true"></i></div>'+
    //       '          <div class="date"><span>July, </span>'+
    //       '            <span class="day">3th</span>'+
    //       '            <span>- August,</span>'+
    //       '            <span class="day">14th</span>'+
    //       '          </div>'+
    //       '        </div>'+
    //       '        <div class="price"><span class="number">$468</span><span class="slash">/</span><span class="day">Day</span></div>'+
    //       '      </div>'+
    //       '      <div class="title">'+
    //       '        <h5><a href="javascript:void(0)">' + locations[i][0] + '</a></h5>'+
    //       '        <div class="blocks-wrapper">'+
    //       '          <div class="block rooms">'+
    //       '            <div class="icon"></div>'+
    //       '            <div class="count">3</div>'+
    //       '          </div>'+
    //       '          <div class="block adults">'+
    //       '            <div class="icon"></div>'+
    //       '            <div class="count">3</div>'+
    //       '          </div>'+
    //       '          <div class="block children">'+
    //       '            <div class="icon"></div>'+
    //       '            <div class="count">2</div>'+
    //       '          </div>'+
    //       '        </div>'+
    //       '      </div>'+
    //       '      <div class="rating-line">'+
    //       '        <div class="stars">'+
    //       '          <ul class="stars-hotel" data-stars=' + locations[i][2] + '>'+
    //       '            <li><i class="fa fa-star" aria-hidden="true"></i></li>'+
    //       '            <li><i class="fa fa-star" aria-hidden="true"></i></li>'+
    //       '            <li><i class="fa fa-star" aria-hidden="true"></i></li>'+
    //       '            <li><i class="fa fa-star" aria-hidden="true"></i></li>'+
    //       '            <li class="hidden"><i class="fa fa-star" aria-hidden="true"></i></li>'+
    //       '          </ul>'+
    //       '        </div>'+
    //       '        <div class="rate" data-rate=' + locations[i][2] + '><img class="rate-image" src="./images/icons/rate/5.0.svg"/></div>'+
    //       '        <div class="reviews"><a href="javascript:void(0)">142 Reviews</a></div>'+
    //       '      </div>'+
    //       '      <div class="buttons-line"><a class="view-btn open-map-item" href="javascript:void(0)">View</a><a class="close-btn" href="javascript:void(0)">Close</a></div>'+
    //       '    </div>'+
    //       '  </div>'+
    //       '</div>';
    //       // '<div class="thumbnail" style="width: 250px;">' +
    //       // '<div class="thumbnail-wrapper">' +
    //       // '<a href="javascript:void(0)" class="iw-close-btn">' +
    //       // '<i class="fa fa-times" aria-hidden="true"></i>' +
    //       // '</a>' +
    //       // '<a href="javascript:void(0)" class="thumbnail-img">' +
    //       // '<div style="background-image:url(' + locations[i][3] + ');" class="image"></div>' +
    //       // '<div class="thumbnail-info text-right">' +
    //       // '<span class="label">Rate ' + locations[i][2] + '</span>' +
    //       // '</div>' +
    //       // '</a>' +
    //       // '<div class="caption">' +
    //       // '<h5>' +
    //       // '<a href="javascript:void(0)">' + locations[i][0] + '</a>' +
    //       // '</h5>' +
    //       // '<p> ' + locations[i][1] + '</p>' +
    //       // '<a href="javascript:void(0)" class="view-btn open-map-item">View</a>' +
    //       // '</div>' +
    //       // '</div>' +
    //       // '</div>';
    //     return function() {
    //       infowindow.setContent(iwContent);
    //       infowindow.open(map, marker);
    //     }
    //   })(marker, i);

    // function loadMarkerInfo() {
    //   for (var i = 0; i < marker.length; ++i) {
    //     var iwContent =
    //       '<div class="thumbnail" style="width: 250px;">' +
    //       '<div class="thumbnail-wrapper">' +
    //       // '<a href="javascript:void(0)" class="iw-close-btn">' +
    //       // '<i class="fa fa-times" aria-hidden="true"></i>' +
    //       // '</a>' +
    //       // '<a href="javascript:void(0)" class="thumbnail-img">' +
    //       // '<div style="background-image:url(' + locations[i][3] + ');" class="image"></div>' +
    //       // '<div class="thumbnail-info text-right">' +
    //       // '<span class="label">Rate ' + locations[i][2] + '</span>' +
    //       // '</div>' +
    //       // '</a>' +
    //       '<div class="caption">' +
    //       '<h5>' +
    //       '<a href="javascript:void(0)">' + locations[i][0] + '</a>' +
    //       '</h5>' +
    //       '<p> ' + locations[i][1] + '</p>' +
    //       '<a href="javascript:void(0)" class="view-btn open-map-item">View</a>' +
    //       '</div>' +
    //       '</div>' +
    //       '</div>';
    //     infowindow.setContent(iwContent);
    //     infowindow.open(map, marker[i]);
    //   }
    // }

    // for ( i = 0; i < locations.length; i++ ) {
    //   console.log(i);
    //   loadMarkerInfo();
    // }

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
    // google.maps.event.addListener(marker, "mouseover", handleMarkerMouseOver);
    // google.maps.event.addListener(marker, "mouseout", handleMarkerMouseLeave);

    google.maps.event.addListener(infowindow, 'domready', function() {
      var zIndexHover;
      $('.map-wrapper .open-map-item,' +
        '.features .open-map-item').click(function() {
        $('.black-bg-map').fadeIn(200);
        $('.map-item-block').show().animateCss('bounceIn');
        if ( $(window).width() > 992 ) {
          $(window).disablescroll();
        }
      });

      $('.thumbnail')
        .closest('.gm-style-iw')
        .parent()
        .parent()
        .addClass('map-popup-wrapper');

      // $('.thumbnail').hover(
      //   function(e) {
      //     // console.log($(this));
      //     if ( !$(this).closest('.gm-style-iw').parent().hasClass('clicked') ) {
      //       // console.log('hovering');
      //       zIndexHover = $(this).closest('.gm-style-iw').parent().css('z-index');
      //       $(this).closest('.gm-style-iw').parent().css('z-index', 0).addClass('hovered');
      //       // console.log(zIndexHover);
      //     } else {
      //
      //     }
      //   },
      //   function(e) {
      //     console.log('unhovering');
      //     if ( $('.map-popup-wrapper .hovered').hasClass('clicked') ) {
      //       $('.map-popup-wrapper .hovered.clicked').css('z-index', 0).removeClass('hovered');
      //     } else {
      //       $('.map-popup-wrapper .hovered').css('z-index', zIndexHover).removeClass('hovered');
      //       // console.log(zIndexHover);
      //     }
      //   }
      // );

      $(document).on('click', '.thumbnail.full-info a.close-btn', function() {
        $(this)
          .closest('.thumbnail.full-info')
          .removeClass('full-info')
          .closest('.gm-style-iw')
          .parent()
          .removeClass('clicked')
          .removeClass('hovered');
        // setTimeout(function() {
        //   $(this)
        //     .closest('.thumbnail.closing')
        //     .removeClass('closing')
        // }, 500);
      });

      $('.thumbnail').click(function() {
        if ( !$(this).hasClass('full-info') ) {
          $('.thumbnail')
            .removeClass('full-info')
            .unbind('hover')
            .closest('.gm-style-iw')
            .parent()
            .removeClass('clicked');
          $(this)
            .addClass('full-info')
            .closest('.gm-style-iw')
            .parent()
            .addClass('clicked');
        }

      });

      $('.hotel-information .open-map-item, .gallery-map-wrapper .open-map-item').click(function() {
        $('.black-bg-map').fadeIn(200);
        $('.map-item-block').show().animateCss('bounceIn');
        if ( $(window).width() > 992 ) {
          $(window).disablescroll();
        }
      });

      // var closeBtn = $('.iw-close-btn').get();
      // google.maps.event.addDomListener(closeBtn[0], 'click', function() {
      //   infowindow.close();
      // });
    });

    $('.main-wrapper .black-bg-map, .main-wrapper .map-item-block .close-btn, .input-search').click(function() {
      $('.black-bg-map').fadeOut(200);
      $('.map-item-block').fadeOut(750).animateCss('bounceOut');
      setTimeout(function() {
        $('.map-item-block').removeClass('animated bounceOut');
      }, 750);
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
      $('.thumbnail')
        .removeClass('full-info')
        .closest('.gm-style-iw')
        .parent()
        .removeClass('clicked')
        .removeClass('hovered');
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
    },
    // styles: [
    //   {
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#ebe3cd"
    //       }
    //     ]
    //   },
    //   {
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#523735"
    //       }
    //     ]
    //   },
    //   {
    //     "elementType": "labels.text.stroke",
    //     "stylers": [
    //       {
    //         "color": "#f5f1e6"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "administrative",
    //     "elementType": "geometry.stroke",
    //     "stylers": [
    //       {
    //         "color": "#c9b2a6"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "administrative.land_parcel",
    //     "elementType": "geometry.stroke",
    //     "stylers": [
    //       {
    //         "color": "#dcd2be"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "administrative.land_parcel",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#ae9e90"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "landscape.natural",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#dfd2ae"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "poi",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#dfd2ae"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "poi",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#93817c"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "poi.park",
    //     "elementType": "geometry.fill",
    //     "stylers": [
    //       {
    //         "color": "#a5b076"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "poi.park",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#447530"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#f5f1e6"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road.arterial",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#fdfcf8"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road.highway",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#f8c967"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road.highway",
    //     "elementType": "geometry.stroke",
    //     "stylers": [
    //       {
    //         "color": "#e9bc62"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road.highway.controlled_access",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#e98d58"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road.highway.controlled_access",
    //     "elementType": "geometry.stroke",
    //     "stylers": [
    //       {
    //         "color": "#db8555"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road.local",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#806b63"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "transit.line",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#dfd2ae"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "transit.line",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#8f7d77"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "transit.line",
    //     "elementType": "labels.text.stroke",
    //     "stylers": [
    //       {
    //         "color": "#ebe3cd"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "transit.station",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#dfd2ae"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "water",
    //     "elementType": "geometry.fill",
    //     "stylers": [
    //       {
    //         "color": "#b9d3c2"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "water",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#92998d"
    //       }
    //     ]
    //   }
    // ]
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
      // label: {
      //   text: locations1[b][6],
      //   color: 'white',
      //   fontSize: '14px'
      // }
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

function initialize2() {

  var locations = [
    [
      'Liberty of London Department Store',
      '485 Clawson St, Staten Island, NY 10306',
      '4.8',
      'images/room1.png',
      51.505860,
      -0.129975,
      '8',
      'images/icons/black-marker.png'
    ],
    [
      'London Palladium',
      '485 Clawson St, Staten Island, NY 10306',
      '4.2',
      'images/room3.png',
      51.506454,
      -0.129009,
      '7',
      'images/icons/black-marker.png'
    ],
    [
      'Carnaby Street',
      '485 Clawson St, Staten Island, NY 10306',
      '4.74',
      'images/room2.png',
      51.506020,
      -0.128623,
      '6',
      'images/icons/black-marker.png'
    ],
    [
      'Hamleys Toy Store',
      '485 Clawson St, Staten Island, NY 10306',
      '4.9',
      'images/room4.png',
      51.505719,
      -0.126971,
      '5',
      'images/icons/black-marker.png'
    ],
    [
      'Big Ben',
      'Amsterdam Schiphol, Netherlands',
      '4.97',
      'images/room5.png',
      51.506407,
      -0.127507,
      '6',
      'images/icons/black-marker.png'
    ]
  ];

  var options = {
    zoom: 17,
    center: new google.maps.LatLng(locations[0][4], locations[0][5]),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    // styles: [
    //   {
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#ebe3cd"
    //       }
    //     ]
    //   },
    //   {
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#523735"
    //       }
    //     ]
    //   },
    //   {
    //     "elementType": "labels.text.stroke",
    //     "stylers": [
    //       {
    //         "color": "#f5f1e6"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "administrative",
    //     "elementType": "geometry.stroke",
    //     "stylers": [
    //       {
    //         "color": "#c9b2a6"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "administrative.land_parcel",
    //     "elementType": "geometry.stroke",
    //     "stylers": [
    //       {
    //         "color": "#dcd2be"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "administrative.land_parcel",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#ae9e90"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "landscape.natural",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#dfd2ae"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "poi",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#dfd2ae"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "poi",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#93817c"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "poi.park",
    //     "elementType": "geometry.fill",
    //     "stylers": [
    //       {
    //         "color": "#a5b076"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "poi.park",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#447530"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#f5f1e6"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road.arterial",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#fdfcf8"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road.highway",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#f8c967"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road.highway",
    //     "elementType": "geometry.stroke",
    //     "stylers": [
    //       {
    //         "color": "#e9bc62"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road.highway.controlled_access",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#e98d58"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road.highway.controlled_access",
    //     "elementType": "geometry.stroke",
    //     "stylers": [
    //       {
    //         "color": "#db8555"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road.local",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#806b63"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "transit.line",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#dfd2ae"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "transit.line",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#8f7d77"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "transit.line",
    //     "elementType": "labels.text.stroke",
    //     "stylers": [
    //       {
    //         "color": "#ebe3cd"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "transit.station",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#dfd2ae"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "water",
    //     "elementType": "geometry.fill",
    //     "stylers": [
    //       {
    //         "color": "#b9d3c2"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "water",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#92998d"
    //       }
    //     ]
    //   }
    // ]
  };

  map2 = new google.maps.Map(document.getElementById('map2'), options);

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for ( i = 0; i < locations.length; i++ ) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][4], locations[i][5]),
      map: map2,
      icon: {
        url: locations[i][7],
        labelOrigin: new google.maps.Point(14, 14)
      },
      // label: {
      //   text: locations[i][6],
      //   color: 'white',
      //   fontSize: '14px'
      // }
    });

    var handleMarkerClick = (function(marker, i) {

      var iwContent =
        '<div class="thumbnail" style="width: 250px;">' +
        '<div class="thumbnail-wrapper">' +
        '<a href="javascript:void(0)" class="iw-close-btn">' +
        '<i class="fa fa-times" aria-hidden="true"></i>' +
        '</a>' +
        '<a href="javascript:void(0)" class="thumbnail-img hidden">' +
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
        '<a href="javascript:void(0)" class="view-btn open-map-item hidden">View</a>' +
        '</div>' +
        '</div>' +
        '</div>';
      return function() {
        infowindow.setContent(iwContent);
        infowindow.open(map2, marker);
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
      $('.map-item-block').fadeOut(750).animateCss('bounceOut');
      setTimeout(function() {
        $('.map-item-block').removeClass('animated bounceOut');
      }, 750);
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

    google.maps.event.addListener(map2, 'click', function() {
      infowindow.close();
    });
  }
}

if ( $('#map').length && !$('#map1').length && !$('#map2').length ) {
  google.maps.event.addDomListener(window, 'load', initialize);
} else if ( $('#map').length && $('#map1').length && !$('#map2').length ) {
  google.maps.event.addDomListener(window, 'load', initialize);
  google.maps.event.addDomListener(window, 'load', initialize1);
} else if ( $('#map').length && $('#map1').length && $('#map2').length ) {
  google.maps.event.addDomListener(window, 'load', initialize);
  google.maps.event.addDomListener(window, 'load', initialize1);
  google.maps.event.addDomListener(window, 'load', initialize2);
} else if ( $('#map').length && !$('#map1').length && $('#map2').length ) {
  google.maps.event.addDomListener(window, 'load', initialize);
  google.maps.event.addDomListener(window, 'load', initialize2);
} else if ( !$('#map').length && $('#map1').length && !$('#map2').length ) {
  google.maps.event.addDomListener(window, 'load', initialize1);
} else if ( !$('#map').length && $('#map1').length && $('#map2').length ) {
  google.maps.event.addDomListener(window, 'load', initialize1);
  google.maps.event.addDomListener(window, 'load', initialize2);
} else if ( !$('#map').length && !$('#map1').length && $('#map2').length ) {
  google.maps.event.addDomListener(window, 'load', initialize2);
}
