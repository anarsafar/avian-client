/* eslint-disable no-console */
interface Location {
  latitude: number;
  longitude: number;
}

const getLocation = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error.message);
        }
      );
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Geolocation is not supported in this browser.');
    }
  });
};

const detectOS = () => {
  const { userAgent } = navigator;

  switch (true) {
    case /Windows NT 10.0/.test(userAgent):
      return 'Windows 10';
    case /Windows NT 6.2/.test(userAgent):
      return 'Windows 8';
    case /Windows NT 6.1/.test(userAgent):
      return 'Windows 7';
    case /Windows NT 6.0/.test(userAgent):
      return 'Windows Vista';
    case /Windows NT 5.1/.test(userAgent):
      return 'Windows XP';
    case /Mac OS X/.test(userAgent):
      return 'Mac OS X';
    case /Android/.test(userAgent):
      return 'Android';
    case /Linux/.test(userAgent):
      return 'Linux';
    case /iOS/.test(userAgent):
      return 'iOS';
    default:
      return 'Unknown OS';
  }
};

const detectBrowser = () => {
  const { userAgent } = navigator;

  switch (true) {
    case /Chrome/.test(userAgent):
      return 'Google Chrome';
    case /Firefox/.test(userAgent):
      return 'Mozilla Firefox';
    case /Safari/.test(userAgent) && !/Chrome/.test(userAgent):
      return 'Safari';
    case /Edge/.test(userAgent):
      return 'Microsoft Edge';
    case /Opera/.test(userAgent) || /OPR/.test(userAgent):
      return 'Opera';
    case /MSIE|Trident/.test(userAgent):
      return 'Internet Explorer';
    default:
      return 'Unknown Browser';
  }
};

const generateNotification = async (type: 'reset' | 'login' | 'group') => {
  try {
    const location = (await getLocation()) as Location;
    const osInfo = detectOS();
    const browserInfo = detectBrowser();

    return {
      type,
      osInfo,
      browserInfo,
      location,
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    return {
      type,
      osInfo: detectOS(),
      browserInfo: detectBrowser(),
    };
  }
};

export default generateNotification;
