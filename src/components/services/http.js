import fetch from "isomorphic-fetch";

const API_URL = "http://localhost:3001/";

export default {
  get: (url, data) => fetch(`${API_URL + url}`, data).then(resp => resp.json()),

  post: (url, data) =>
    fetch(`${API_URL + url}`, data).then(resp => resp.json()),

  put: (url, data) => fetch(`${API_URL + url}`, data).then(resp => resp.json()),

  patch: (url, data) =>
    fetch(`${API_URL + url}`, data).then(resp => resp.json()),

  delete: (url, data) =>
    fetch(`${API_URL + url}`, data).then(resp => resp.json())
};
