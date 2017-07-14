var timer = $('#timer');
var minutes = timer.data('time'); // start countdown time
var targetDate = new Date().getTime() + ((minutes * 60 ) * 1000);
var timeLimit = ((minutes * 60 ) * 1000);

var days, hours, seconds, countdown;

function getCountdown() {
  var currentDate = new Date().getTime();
  var secondsLeft = (targetDate - currentDate) / 1000;

  if ( secondsLeft >= 0 ) {
    if ( (secondsLeft * 1000 ) < ( timeLimit / 2 ) ) {
      timer.removeClass('full-time');
      timer.addClass('half-time');

    }
    if ( (secondsLeft * 1000) < 1000 ) {
      timer.removeClass('half-time');
      timer.addClass('empty-time');
    }

    days = pad(parseInt(secondsLeft / 86400));
    secondsLeft = secondsLeft % 86400;

    hours = pad(parseInt(secondsLeft / 3600));
    secondsLeft = secondsLeft % 3600;

    minutes = pad(parseInt(secondsLeft / 60));
    seconds = pad(parseInt(secondsLeft % 60));

    timer.html('<span>' + minutes + ':</span><span>' + seconds + '</span>');
  }

}

function pad(n) {
  return (n < 10 ? '0' : '') + n;
}

window.addEventListener('load', function() {
  if ( timer.length ) {
    setTimeout(function() {
      getCountdown();
      countdown = setInterval(function() { getCountdown(); }, 1000);
      setTimeout(
        function() {
          console.log('countdown is finished');
          clearInterval(countdown);
        }, timeLimit);
    }, 1700);
  }
});