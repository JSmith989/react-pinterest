import axios from 'axios';

const baseUrl = 'https://pinterest-3deb6.firebaseio.com/';

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getAllPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const createPin = (data) => axios.post(`${baseUrl}/pins.json`, data).then((response) => {
  const update = { firebaseKey: response.data.name };
  axios
    .patch(`${baseUrl}/pins/${response.data.name}.json`, update)
    .catch((error) => console.warn(error));
});

const updatePin = (dataObject) => axios.patch(`${baseUrl}/pins/${dataObject.firebaseKey}.json`, dataObject);

const getAllUserPins = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getPin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const deletePin = (firebaseKey) => axios.delete(`${baseUrl}/pins/${firebaseKey}.json`);

export {
  getBoardPins, getPin, getAllPins, getAllUserPins, createPin, updatePin, deletePin,
};
