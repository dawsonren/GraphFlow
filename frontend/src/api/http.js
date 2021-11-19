import axios from 'axios';

let token = '';


export function setToken(newToken) {
  token = newToken;
  localStorage.setItem('TOKEN', token);
}
export function removeToken() {
  localStorage.removeItem('TOKEN');
}

function authenticateAxiosRequest(data, headers) {
  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }

  return data;
}

export async function loadToken() {
  token = (await localStorage.getItem('TOKEN')) || '';
  let data = null;
  if (token) {
    data = token
  }

  return data;
}

export const axiosApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  transformRequest: axios.defaults.transformRequest.concat([authenticateAxiosRequest]),
});

function alertError(error) {
  console.log('API error', error, error && error.response && error.response.data);
  if (error && error.response && error.response.status === 401){
    localStorage.setItem('TOKEN', '');
  }

  return Promise.reject(error);
}

axiosApi.interceptors.response.use(res => res, alertError);
