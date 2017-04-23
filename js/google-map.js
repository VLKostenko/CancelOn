var heartIcon = 'images/icons/heart.svg';
var defaultIcon = {
  path: google.maps.SymbolPath.CIRCLE,
  scale: 20,
  fillColor: '#55c1ff',
  fillOpacity: 1,
  strokeColor: '#ffffff',
  strokeWeight: 2.5
};

var locations = [
  [
    'Soho, Soma-Bay Resort',
    '485 Clawson St, Staten Island, NY 10306',
    '4.8',
    'images/room4.png',
    38.885765,
    -77.047563,
    '8',
    defaultIcon
  ],
  [
    'Radisson Blu Resort',
    '485 Clawson St, Staten Island, NY 10306',
    '4.2',
    'images/room3.png',
    38.877951,
    -77.035238,
    '7',
    defaultIcon
  ],
  [
    'London Hilton Hotel',
    '485 Clawson St, Staten Island, NY 10306',
    '4.74',
    'images/room2.png',
    38.888337,
    -77.025073,
    '6',
    defaultIcon
  ],
  [
    'Joint Base',
    '485 Clawson St, Staten Island, NY 10306',
    '4.9',
    'images/room4.png',
    38.846002,
    -77.016459,
    '5',
    defaultIcon
  ],
  [
    'St Martins Lane London',
    'Amsterdam Schiphol, Netherlands',
    '4.97',
    'images/room4.png',
    38.823484,
    -77.008872,
    ' ',
    heartIcon
  ]
];

var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 13,
  center: new google.maps.LatLng(locations[0][4] - 0.07, locations[0][5] - ( - 0.015)),
  mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

for (i = 0; i < locations.length; i++) {
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(locations[i][4], locations[i][5]),
    map: map,
    icon: locations[i][7],
    label: {
      text: locations[i][6],
      color: '#ffffff',
      fontSize: '15px',
      fontWeight: 'bold'
    }
  });

  google.maps.event.addListener(marker, 'click', (function(marker, i) {

    var iwContent =
      '<div class="thumbnail" style="width: 250px;">' +
        '<div class="thumbnail-wrapper">' +
          '<a href="javascript:void(0)" class="thumbnail-img">' +
            '<img src="' + locations[i][3] + '" alt="img" class="img-responsive">' +
            '<div class="thumbnail-info text-right">' +
              '<span class="label">Rate ' + locations[i][2] + '</span>' +
            '</div>' +
          '</a>' +
          '<div class="caption">' +
            '<h5>' +
              '<a href="javascript:void(0)">' + locations[i][0] + '</a>' +
            '</h5>' +
            '<p> '+ locations[i][1] +'</p>' +
            '<a href="javascript:void(0)" class="view-btn open-map-item">View</a>'+
          '</div>' +
        '</div>' +
      '</div>';
    return function () {
      infowindow.setContent(iwContent);
      infowindow.open(map, marker);
    }
  })(marker, i));

  google.maps.event.addListener(map, 'click', function() {
    infowindow.close();
  });
}
