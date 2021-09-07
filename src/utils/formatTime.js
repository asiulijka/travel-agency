export const formatTime = timeInSec => {
  if (typeof (timeInSec) == 'number' && (timeInSec) >= 0) {
    const seconds = Math.floor(timeInSec % 60);
    const ss = (seconds < 10) ? ('0' + seconds) : seconds;

    const minutes = Math.floor((timeInSec / 60) % 60);
    const mm = (minutes < 10) ? ('0' + minutes) : minutes;

    const hour = Math.floor(timeInSec / 3600);
    const hh = (hour < 10) ? ('0' + hour) : hour;

    return hh + ':' + mm + ':' + ss;
  } else {
    return null;
  }
};
