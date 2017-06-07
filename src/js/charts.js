$(document).ready(function () {
  if ( $('#pie1').length && $('#pie2').length && $('#pie3').length ) {
    var pieData1 = [
      {
        value: 92,
        color: "#4b79bb"
      },
      {
        value: 100 - 92,
        color: "#bfe6ff"
      }
    ];
    var pieData2 = [
      {
        value: 53,
        color: "#658b2c"
      },
      {
        value: 100 - 53,
        color: "#ceef9d"
      }
    ];
    var pieData3 = [
      {
        value: 76,
        color: "#bd2cd7"
      },
      {
        value: 100 - 76,
        color: "#fbd5ff"
      }
    ];

    var pie1 = new Chart(document.getElementById("pie1").getContext("2d")).Doughnut(pieData1, { percentageInnerCutout: 90 });
    var pie2 = new Chart(document.getElementById("pie2").getContext("2d")).Doughnut(pieData2, { percentageInnerCutout: 90 });
    var pie3 = new Chart(document.getElementById("pie3").getContext("2d")).Doughnut(pieData3, { percentageInnerCutout: 90 });
  }
  var lineChartData = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"],
    datasets: [{
      fillColor: "rgba(220,220,220,0)",
      strokeColor: "rgba(220,180,0,1)",
      pointColor: "rgba(220,180,0,1)",
      data: [20, 30, 80, 20, 40, 10, 60]
    }, {
      fillColor: "rgba(151,187,205,0)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      data: [60, 10, 40, 30, 80, 30, 20]
    }]

  }

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
    var ctx = document.getElementById("canvas").getContext("2d");
    var LineChartDemo = new Chart(ctx).Line(lineChartData, {
      pointDotRadius: 10,
      bezierCurve: false,
      scaleShowVerticalLines: false,
      scaleGridLineColor: "black"
    });
  }
});


