$(document).ready(function () {
  Chart.pluginService.register({
    beforeDraw: function (chart) {
      if (chart.config.options.elements.center) {
        //Get ctx from string
        var ctx = chart.chart.ctx;

        //Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Arial';
        var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2);
        //Start with a base font of 30px
        ctx.font = "30px " + fontStyle;

        //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight);

        //Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse+"px " + fontStyle;
        ctx.fillStyle = color;

        //Draw text in center
        ctx.fillText(txt, centerX, centerY);
      }
    }
  });
  if ( $('#pie1').length && $('#pie2').length && $('#pie3').length ) {
    var config = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [10],
          backgroundColor: [
            "#4b79bb"
          ],
          hoverBackgroundColor: [
            "#4b79bb"
          ]
        }]
      },
      options: {
        elements: {
          center: {
            text: '92%',
            color: '#4b79bb',
            fontStyle: 'Roboto',
            sidePadding: 5
          }
        },
        tooltips: {
          enabled: false
        }
      }
    };


    var ctx1 = document.getElementById("pie1").getContext("2d");
    var ctx2 = document.getElementById("pie2").getContext("2d");
    var ctx3 = document.getElementById("pie3").getContext("2d");
    var pie1 = new Chart(ctx1, config);
    var pie2 = new Chart(ctx2, config);
    var pie3 = new Chart(ctx3, config);
  }
  if ( $('canvas').length ) {

    var data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"],
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
          backgroundColor: '#ceef9d',
          borderColor: '#ceef9d',
          pointBackgroundColor: '#99c45a',
          pointBorderColor: '#658b2c',
          pointHoverBackgroundColor: '#fff',
          pointBorderWidth: 3,
          pointRadius: 8,
          pointHoverRadius: 8,
          data: [4, 4.3, 5, 4.9, 4.4, 4.8, 3.9, 5, 4.3, 5, 4.9, 4.4, 4.8, 3.9],
          hidden: false,
          lineTension: 0,
          label: 'Rating',
          fill: false
        }]
    };

    var options = {
      responsive: true,
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
        display: false
      },
      scales: {
        xAxes: [{
          stacked: false,
          afterTickToLabelConversion: function(data) {
            var xLabels = data.ticks;
            xLabels.forEach(function(labels, i) {
              if ( i % 2 == 1 ) {
                xLabels[i] = '';
              }
            });
          }
        }],
        yAxes: [{
          ticks: {
            display: false
          }
        }]
      },
      legend: {
        display: false
      },
      legendCallback: function(chart) {
        var text = [];
        text.push('<ul class="chart-legends-wrapper">');
        for ( var i = 0; i < chart.data.datasets.length; i++ ) {
          // console.log(chart.data.datasets[i].hidden);
          // console.log(averageData(chart.data.datasets[i].data));
          text.push('<li class="chart-name" id="' + chart.data.datasets[i].label.toLowerCase() + '" onclick="updateDataset(event, ' + '\'' + chart.legend.legendItems[i].datasetIndex + '\'' + ')">');
          if ( chart.data.datasets[i].label !== "Rating" ) {
            text.push('<div class="label-name" style="color: #000;">' + chart.data.datasets[i].label + '</div>');
            text.push('<div class="label-value" style="color: ' + chart.data.datasets[i].pointBackgroundColor + ';">' + Math.floor(averageData(chart.data.datasets[i].data)) + '</div>');
            text.push('<div class="label-point" style="background: ' + chart.data.datasets[i].pointBackgroundColor + ';border-color: ' + chart.data.datasets[i].pointBorderColor + ';border-width: ' + chart.data.datasets[i].pointBorderWidth + 'px;"></div>');
          } else {
            // console.log(chart.data.datasets[i].hidden);
            if ( chart.data.datasets[i].hidden ) {
              text.push('<div class="label-value rating" style="color: ' + chart.data.datasets[i].pointBackgroundColor + '; text-decoration: line-through;">' + averageData(chart.data.datasets[i].data).toFixed(1) + ' /5</div>');
            } else {
              text.push('<div class="label-value rating" style="color: ' + chart.data.datasets[i].pointBackgroundColor + ';">' + averageData(chart.data.datasets[i].data).toFixed(1) + ' /5</div>');
            }
          }
          text.push('</li>');
        }
        text.push('</ul>');
        return text.join("");
      }
    };

    updateDataset = function(e, datasetIndex) {
      var index = datasetIndex;
      var ci = e.view.mainChart;
      var meta = ci.getDatasetMeta(index);

      // See controller.isDatasetVisible comment
      meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;

      if ( meta.hidden !== null ) {
        $('#' + ci.data.datasets[index].label.toLowerCase())
          .children('.label-name, .label-value')
          .css('text-decoration', 'line-through');
      } else {
        $('#' + ci.data.datasets[index].label.toLowerCase())
          .children('.label-name, .label-value')
          .css('text-decoration', 'initial');
      }

      // We hide a dataset and rerender the chart
      ci.update();
    };

    var config = {
      type: 'line',
      data: data,
      options: options
    };

    var ctx = document.getElementById('canvas').getContext('2d');
    window.mainChart = new Chart(ctx, config);
    document.getElementById('chart-legends').innerHTML = mainChart.generateLegend();

  }

  function averageData(array) {
    var sum = 0;
    for( var i = 0; i < array.length; i++ ){
      sum += parseInt( array[i], 10 );
    }
    return (sum/array.length);
  }
  // Chart.Tooltip.positioners.customPos = function(unused, position) {
  //   // return { x: position.x, y: 25 };
  //   return { x: this.chart.width / 2, y: 25 };
  // }
});


