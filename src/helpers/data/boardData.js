import axios from 'axios';

const baseUrl = 'https://pinterest-3deb6.firebaseio.com/';

const getBoards = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}.json`)
    .then((response) => {
      resolve(Object.values(response.data));
    })
    .catch((error) => reject(error));
});

export default { getBoards };
