// var markers = [{
//   "title": 'Soho, Soma-Bay Resort',
//   "lat": '38.885765',
//   "lng": '-77.047563',
//   "number": 8,
//   "address": '485 Clawson St, Staten Island, NY 10306',
//   "rate": '4.8'
// }, {
//   "title": 'Radisson Blu Resort',
//   "lat": '38.877951',
//   "lng": '-77.035238',
//   "number": 7,
//   "address": '485 Clawson St, Staten Island, NY 10306',
//   "rate": '4.2'
// }, {
//   "title": 'London Hilton Hotel',
//   "lat": '38.888337',
//   "lng": '-77.025073',
//   "number": 6,
//   "address": '485 Clawson St, Staten Island, NY 10306',
//   "rate": '4.74'
// }, {
//   "title": 'Joint Base',
//   "lat": '38.846002',
//   "lng": '-77.016459',
//   "number": 5,
//   "address": '485 Clawson St, Staten Island, NY 10306',
//   "rate": '4.9'
// }, {
//   "title": 'St Martins Lane London',
//   "lat": '38.823484',
//   "lng": '-77.008872',
//   "number": 1,
//   "address": 'Amsterdam Schiphol, Netherlands',
//   "rate": '4.9',
//   "image": true
// }];
//
// var map;
// var markerObjects = [];
// var infoWindow;
//
// function initialize() {
//
//   var myOptions = {
//     center: new google.maps.LatLng(markers[0].lat - 0.07, markers[0].lng - (-0.015)),
//     zoom: 13,
//     mapTypeId: google.maps.MapTypeId.ROADMAP,
//     scrollwheel: false,
//     disableDefaultUI: true
//   };
//
//   map = new google.maps.Map(document.getElementById("map"), myOptions);
//
//   // drop markers
//   var i = 0;
//   var interval = setInterval(function() {
//     var data = markers[i];
//     var myLatlng = new google.maps.LatLng(data.lat, data.lng);
//     // var number = data.number.toString();
//     var number = "5";
//     var clickedIcon = {
//       path: google.maps.SymbolPath.CIRCLE,
//       scale: 20,
//       fillColor: '#85b83a',
//       fillOpacity: 1,
//       strokeColor: '#ffffff',
//       strokeWeight: 2.5
//     };
//     var defaultIcon = {
//       path: google.maps.SymbolPath.CIRCLE,
//       scale: 20,
//       fillColor: '#55c1ff',
//       fillOpacity: 1,
//       strokeColor: '#ffffff',
//       strokeWeight: 2.5
//     };
//     // var heartIcon;
//     //
//     // if ( data.image != "heart" ) {
//     //   return defaultIcon;
//     // } else {
//     //   data.image = 'images/icons/heart.svg';
//     // }
//     var imageIcon = "";
//
//     if ( data.image ) {
//       imageIcon = "images/icons/heart.svg";
//     }
//
//
//     // marker object for the marker
//     var marker = new google.maps.Marker({
//       position: myLatlng,
//       map: map,
//       title: data.title,
//       optimized: false,
//       icon: imageIcon,
//       label: {
//         text: number,
//         color: '#ffffff',
//         fontSize: '15px',
//         fontWeight: 'bold'
//       }
//     });
//
//     // a new Info Window is created
//     infoWindow = new google.maps.InfoWindow({
//       padding: 0,
//       borderRadius: 5
//     });
//
//     var markerIndex = markerObjects.push(marker) - 1;
//     google.maps.event.addListener(markerObjects[markerIndex], 'click', function() {
//
//       if ( this.icon.fillColor == defaultIcon.fillColor) {
//         for(var i = 0; i < markerObjects.length; i++) {
//           markerObjects[i].setIcon(defaultIcon);
//         }
//         marker.setIcon(clickedIcon);
//
//         // Creating the content to be inserted in the infowindow
//         var iwContent =
//           '<div class="thumbnail" style="width: 250px;">' +
//             '<div class="thumbnail-wrapper">' +
//               '<a href="javascript:void(0)" class="thumbnail-img">' +
//                 '<img src="images/photo-map.png" alt="img" class="img-responsive">' +
//                 '<div class="thumbnail-info text-right">' +
//                   '<span class="label">Rate ' + data.rate + '</span>' +
//                 '</div>' +
//               '</a>' +
//               '<div class="caption">' +
//                 '<h5>' +
//                   '<a href="javascript:void(0)">' + data.title + '</a>' +
//                 '</h5>' +
//                 '<p> '+ data.address +'</p>' +
//               '</div>' +
//             '</div>' +
//           '</div>';
//
//         // including content to the Info Window.
//         infoWindow.setContent(iwContent);
//         // opening the Info Window in the current map and at the current marker location.
//         infoWindow.open(map, marker);
//       } else {
//         marker.setIcon(defaultIcon);
//         infoWindow.close();
//       }
//
//     });
//
//     google.maps.event.addListener(map, 'click', function() {
//       marker.setIcon(defaultIcon);
//       infoWindow.close();
//     });
//
//   // continue iteration
//     i++;
//     if (i == markers.length) {
//       clearInterval(interval);
//     }
//   }, 0);
//
// } // initialize

var heartIcon = 'images/icons/heart.svg';
var defaultIcon = {
  path: google.maps.SymbolPath.CIRCLE,
  scale: 20,
  fillColor: '#55c1ff',
  fillOpacity: 1,
  strokeColor: '#ffffff',
  strokeWeight: 2.5
};
var clickedIcon = {
  path: google.maps.SymbolPath.CIRCLE,
  scale: 20,
  fillColor: '#85b83a',
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

var arrayOfMarkers = [];
arrayOfMarkers.push(marker);

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
      '</div>' +
      '</div>' +
      '</div>';
    return function () {
      infowindow.setContent(iwContent);
      infowindow.open(map, marker);
    }
  })(marker, i));

  google.maps.event.addListener(marker, 'click', function() {
    for(var i = 0; i < locations.length; i++) {
      this.setIcon(defaultIcon);
      console.log(this.icon);
    }
    if ( this.icon.fillColor == defaultIcon.fillColor) {
      this.setIcon(clickedIcon);
    } else {
      this.setIcon(defaultIcon);
      infowindow.close();
    }
  });

  google.maps.event.addListener(map, 'click', function() {
    // marker.setIcon(defaultIcon);
    // console.log(marker.icon)
    infowindow.close();
  });
}
