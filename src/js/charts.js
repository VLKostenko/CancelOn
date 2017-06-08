$(document).ready(function () {
  // if ( $('#pie1').length && $('#pie2').length && $('#pie3').length ) {
  //   var pieData1 = [
  //     {
  //       value: 92,
  //       color: "#4b79bb"
  //     },
  //     {
  //       value: 100 - 92,
  //       color: "#bfe6ff"
  //     }
  //   ];
  //   var pieData2 = [
  //     {
  //       value: 53,
  //       color: "#658b2c"
  //     },
  //     {
  //       value: 100 - 53,
  //       color: "#ceef9d"
  //     }
  //   ];
  //   var pieData3 = [
  //     {
  //       value: 76,
  //       color: "#bd2cd7"
  //     },
  //     {
  //       value: 100 - 76,
  //       color: "#fbd5ff"
  //     }
  //   ];
  //
  //   var pie1 = new Chart(document.getElementById("pie1").getContext("2d")).Doughnut(pieData1, { percentageInnerCutout: 90 });
  //   var pie2 = new Chart(document.getElementById("pie2").getContext("2d")).Doughnut(pieData2, { percentageInnerCutout: 90 });
  //   var pie3 = new Chart(document.getElementById("pie3").getContext("2d")).Doughnut(pieData3, { percentageInnerCutout: 90 });
  // }

  // Chart.defaults.global.animationSteps = 50;
  // Chart.defaults.global.tooltipYPadding = 16;
  // Chart.defaults.global.tooltipCornerRadius = 0;
  // Chart.defaults.global.tooltipTitleFontStyle = "normal";
  // Chart.defaults.global.tooltipFillColor = "rgba(0,160,0,0.8)";
  // Chart.defaults.global.animationEasing = "easeOutBounce";
  // Chart.defaults.global.responsive = true;
  // Chart.defaults.global.scaleLineColor = "black";
  // Chart.defaults.global.scaleFontSize = 16;

  if ( $('canvas').length ) {

    var data = {
      labels: [
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Nov",
        "Dec"
      ],
      // datasets: [{
      //   label: "My First dataset",
      //   backgroundColor: window.chartColors.red,
      //   borderColor: window.chartColors.red,
      //   data: [10, 23, 5, 99, 67, 43, 0],
      //   fill: false,
      //   pointRadius: 10,
      //   pointHoverRadius: 15,
      //   showLine: false // no line shown
      // }]
      datasets: [
        {
          backgroundColor: '#8ecdf6',
          borderColor: '#8ecdf6',
          pointBackgroundColor: '#3eb5f1',
          pointBorderColor: '#4b79bb',
          pointHoverBackgroundColor: '#fff',
          pointBorderWidth: 3,
          pointRadius: 8,
          pointHoverRadius: 8,
          data: [23043, 23671, 23650, 24560, 25618, 23103, 24850],
          hidden: false,
          lineTension: 0,
          label: 'Views',
          fill: false
        },
        {
          backgroundColor: '#fed95f',
          borderColor: '#fed95f',
          pointBackgroundColor: '#ff4927',
          pointBorderColor: '#ffccaf',
          pointHoverBackgroundColor: '#fff',
          pointBorderWidth: 3,
          pointRadius: 8,
          pointHoverRadius: 8,
          data: [3470, 4580, 4811, 4328, 4919, 5108, 5241],
          hidden: false,
          lineTension: 0,
          label: 'Reservation',
          fill: false
        },
        {
          backgroundColor: '#99c45a',
          borderColor: '#99c45a',
          pointBackgroundColor: '#ceef9d',
          pointBorderColor: '#658b2c',
          pointHoverBackgroundColor: '#fff',
          pointBorderWidth: 3,
          pointRadius: 8,
          pointHoverRadius: 8,
          data: [4, 4.3, 5, 4.9, 4.4, 4.8, 3.9, 4, 4.3, 5, 4.9, 4.4, 4.8, 3.9],
          hidden: true,
          lineTension: 0,
          label: 'Rating',
          fill: false
        }]
    };

    var options = {
      responsive: true,
      // maintainAspectRatio: false,
      // spanGaps: false,
      tooltips: {
        position: "nearest",
        xPadding: 20,
        yPadding: 5,
        cornerRadius: 13,
        displayColors: false,
        title: false,
        titleFontFamily: "Roboto",
        titleFontStyle: "bold",
        // titleFontSize: 14,
        titleFontSize: 0,
        titleSpacing: 0,
        titleMarginBottom: 0,
        bodyFontFamily: "Roboto",
        bodyFontStyle: "normal",
        bodyFontSize: 14,
        backgroundColor: "#3eb5f1",
        caretSize: 0,
        caretPadding: 0
      },
      hover: {
        mode: 'nearest'
      },
      title: {
        display: true,
        text: 'Jopa'
      },
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: true
          }
        }],
        yAxes: [{
          ticks: {
            autoSkip: true
          }
        }]
      }
      // elements: {
      //   line: {
      //     tension: 0.000001
      //   }
      // },
      // plugins: {
      //   filler: {
      //     propagate: false
      //   }
      // }
    };

    // var chart = new Chart('canvas', {
    //   type: 'line',
    //   data: data,
    //   options: options
    // });

    var config = {
      type: 'line',
      data: data,
      options: options
    };

    var ctx = document.getElementById('canvas').getContext('2d');
    new Chart(ctx, config)

  }
});


