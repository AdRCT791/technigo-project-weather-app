export function convertUnixToTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  return date.toISOString().slice(11, 16);
}

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error('Unable to retrieve your location'));
      }
    );
  });
};
