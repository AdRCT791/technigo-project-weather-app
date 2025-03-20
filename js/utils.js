export function convertUnixToTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  return date.toISOString().slice(11, 16);
}

export function convertUnixToDate(unixTimestamp) {
  const date = new Intl.DateTimeFormat('se-SE', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(unixTimestamp * 1000);
  return date.slice(0, 22);
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

export function capitalizeFirstLetter(word) {
  return word[0].toUpperCase() + word.slice(1);
}
