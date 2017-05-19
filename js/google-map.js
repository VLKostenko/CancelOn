var map;
var labels = '123456789';
var labelIndex = 0;
var blackIcon = 'images/icons/black-marker.png';
var blueIcon = 'images/icons/blue-marker.png';
function initialize() {
  // var heartIcon = 'images/icons/heart.svg';
  // var defaultIcon = {
  //   path: google.maps.SymbolPath.CIRCLE,
  //   scale: 20,
  //   fillColor: '#55c1ff',
  //   fillOpacity: 1,
  //   strokeColor: '#ffffff',
  //   strokeWeight: 2.5
  // };

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
      ' ',
      'images/icons/heart.svg'
    ]
  ];

  map = new google.maps.Map(document.getElementById('map'), {
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
    // mapTypeControlOptions: {
    //   style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
    //   position: google.maps.ControlPosition.TOP_RIGHT
    // }
  });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for ( i = 0; i < locations.length; i++ ) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][4], locations[i][5]),
      map: map,
      icon: {
        url: locations[i][7],
        // size: new google.maps.Size(45, 45),
        // origin: new google.maps.Point(0, 0),
        // anchor: new google.maps.Point(0, 0),
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
      // var iwContent =
      //   '<div class="thumbnail" style="width: 250px;">' +
      //   '<div class="thumbnail-wrapper">' +
      //   '<a href="javascript:void(0)" class="thumbnail-img">' +
      //   '<img src="' + locations[i][3] + '" alt="img" class="img-responsive">' +
      //   '<div class="thumbnail-info text-right">' +
      //   '<span class="label">Rate ' + locations[i][2] + '</span>' +
      //   '</div>' +
      //   '</a>' +
      //   '<div class="caption">' +
      //   '<h5>' +
      //   '<a href="javascript:void(0)">' + locations[i][0] + '</a>' +
      //   '</h5>' +
      //   '<p> ' + locations[i][1] + '</p>' +
      //   '<a href="javascript:void(0)" class="view-btn open-map-item">View</a>' +
      //   '</div>' +
      //   '</div>' +
      //   '</div>';
      // infowindow.setContent(iwContent);
      // infowindow.open(map, this);
      // changeMarker();
    }

    function handleMarkerMouseLeave() {
      if ( this.icon.url == blueIcon ) {
        this.setIcon({
          url: blackIcon,
          labelOrigin: new google.maps.Point(14, 14)
        });
      //   // infowindow.close();
      }
    }

    google.maps.event.addListener(marker, 'click', handleMarkerClick);
    google.maps.event.addListener(marker, "mouseover", handleMarkerMouseOver);
    google.maps.event.addListener(marker, "mouseout", handleMarkerMouseLeave);

    google.maps.event.addListener(infowindow, 'domready', function() {
      $('.open-map-item').click(function() {
        $('.black-bg-map').fadeIn(200);
        $('.map-item-block').show("slide", { direction: "right" }, 300);
        $('body').css('overflow', 'hidden');
        // if ( $('.myonoffswitch').prop('checked') ) {
        //   alert(1);
        // }
      });

      var closeBtn = $('.iw-close-btn').get();
      google.maps.event.addDomListener(closeBtn[0], 'click', function() {
        infowindow.close();
      });

    });

    $('.black-bg-map, .map-item-block .close-btn, .input-search').click(function() {
      $('.black-bg-map').fadeOut(200);
      $('.map-item-block').hide("slide", { direction: "right" }, 200);
      $('body').css('overflow', 'initial');
    });

    google.maps.event.addListener(map, 'click', function() {
      infowindow.close();
    });
  }
}
google.maps.event.addDomListener(window, 'load', initialize);
// google.maps.event.addDomListener(map, "resize", function() {
//   var center = map.getCenter();
//   google.maps.event.trigger(map, "resize");
//   map.setCenter(center);
// });