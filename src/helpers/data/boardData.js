import axios from 'axios';
// import { getBoardPins, deletePin } from './pinData';

const baseUrl = 'https://pinterest-3deb6.firebaseio.com/';

const getAllUserBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSingleBoard = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards/${boardId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getAllBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const createBoard = (data) => axios.post(`${baseUrl}/boards.json`, data).then((response) => {
  const update = { firebaseKey: response.data.name };
  axios
    .patch(`${baseUrl}/boards/${response.data.name}.json`, update)
    .catch((error) => console.warn(error));
});

const updateBoard = (dataObject) => axios.patch(`${baseUrl}/boards/${dataObject.firebaseKey}.json`, dataObject);

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const deleteJoinTableBoard = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    Object.keys(response.data).forEach((firebaseKey) => {
      axios.delete(`${baseUrl}/pins-boards/${firebaseKey}.json`);
    });
  }).then(resolve).catch((error) => reject(error));
});

export {
  getAllUserBoards, getSingleBoard, createBoard, updateBoard, getAllBoards, deleteBoard, deleteJoinTableBoard,
};
