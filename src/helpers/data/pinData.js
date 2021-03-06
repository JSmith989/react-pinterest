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

const createPin = (data) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pins.json`, data).then((response) => {
    const update = { firebaseKey: response.data.name };
    axios
      .patch(`${baseUrl}/pins/${response.data.name}.json`, update).then(resolve);
  }).catch((error) => reject(error));
});

const joinPinToBoard = (data) => axios.post(`${baseUrl}/pins-boards.json`, data).then((response) => {
  const update = { firebaseKey: response.data.name };
  axios
    .patch(`${baseUrl}/pins-boards/${response.data.name}.json`, update)
    .catch((error) => console.warn(error));
});

const createBoardPin = (data) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pins-boards.json`, data)
    .then((response) => {
      axios.patch(`${baseUrl}/pins-boards/${response.data.name}.json`, { firebaseKey: response.data.name })
        .then(() => {
          resolve(response);
        });
    }).catch((error) => reject(error));
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

const deletePinsBoards = (firebaseKey) => axios.delete(`${baseUrl}/pins-boards/${firebaseKey}.json`);

const deleteKeyValue = (pinId) => axios.get(`${baseUrl}/pins-boards.json?orderBy="pinId"&equalTo="${pinId}"`)
  .then((response) => {
    const arrayValue = Object.values(response);
    arrayValue.forEach((array) => {
      const keyArray = Object.keys(array);
      keyArray.forEach((id) => {
        deletePinsBoards(id);
      });
    });
  });

const deleteJoinTable = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="pinId"&equalTo="${pinId}"`).then((response) => {
    Object.keys(response.data).forEach((firebaseKey) => {
      axios.delete(`${baseUrl}/pins-boards/${firebaseKey}.json`);
    });
  }).then(resolve).catch((error) => reject(error));
});

export {
  getBoardPins, getPin, getAllPins, getAllUserPins, createPin, updatePin, deletePin, createBoardPin, joinPinToBoard, deleteJoinTable, deleteKeyValue,
};
