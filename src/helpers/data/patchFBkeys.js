import axios from 'axios';

const baseUrl = 'https://pinterest-3deb6.firebaseio.com/';

const patchFBBoardkeys = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/boards.json`)
    .then((response) => {
      const keys = Object.keys(response.data);
      keys.forEach((key) => {
        axios.patch(`${baseUrl}/boards/${key}.json`, { firebaseKey: key });
      });
    })
    .catch((error) => reject(error));
});

const patchFBPinkeys = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/pins.json`)
    .then((response) => {
      const keys = Object.keys(response.data);
      keys.forEach((key) => {
        axios.patch(`${baseUrl}/pins/${key}.json`, { firebaseKey: key });
      });
    })
    .catch((error) => reject(error));
});

export { patchFBBoardkeys, patchFBPinkeys };
