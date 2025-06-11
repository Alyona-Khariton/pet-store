import axios from 'axios';

const ENDPOINT = 'https://petstore.swagger.io/v2/';

const axiosInstance = axios.create({
  baseURL: ENDPOINT,
});

axiosInstance.interceptors.request.use(request => {
  if (!request?.data) {
    request.data = {};
  }

  return request;
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      console.error('Сервер не отвечает', error.request); // Нет ответа от сервера
    } else if (!error.response.data) {
      console.error('Нет данных в ответе', error.response); // Ответ не содержит данных
    } else {
      console.error('Сервер вернул ошибку:', error.response); // Ошибка пришла от сервера
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
