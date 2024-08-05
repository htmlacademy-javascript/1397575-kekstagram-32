const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const routeDate = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, method = Method.GET, body = null) => fetch(`${BASE_URL}${route}`, {method, body})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .catch((err) => {
    throw new Error(err.message);
  });

const getData = () => load(routeDate.GET_DATA);

const sendData = (body) => load(routeDate.SEND_DATA, Method.POST, body);

// const getData = () => fetch(`${BASE_URL}${routeDate.GET_DATA}`)
//   .then((response) => {
//     if(!response.ok) {
//       throw new Error(`${response.status} ${response.statusText}`);
//     }
//     return response.json();
//   })
//   .catch((err) => {
//     throw new Error(err.message);
//   });

// const sendData = (body, onSuccess) => fetch(`${BASE_URL}${routeDate.SEND_DATA}`,
//   {
//     method: Method.POST,
//     body
//   }
// )
//   .then((response) => {
//     if(!response.ok) {
//       throw new Error();
//     }
//     // return response.json();
//   })
//   .then(() => {
//     onSuccess();
//     sendMessage(messageText.SENT_SUCCESS);
//   })
//   .catch(() => {
//     sendMessage(messageText.ERROR_SENT);
//   });

export {getData, sendData};
