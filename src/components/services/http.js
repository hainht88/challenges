import fetch from "isomorphic-fetch";

export default {
  get: (url, data) =>
    fetch(`http://localhost:3001/${url}`, data).then(resp => resp.json()),

  post: (url, data) =>
    fetch(`http://localhost:3001/${url}`, data).then(resp => resp.json()),

  put: (url, data) =>
    fetch(`http://localhost:3001/${url}`, data).then(resp => resp.json()),

  patch: (url, data) =>
    fetch(`http://localhost:3001/${url}`, data).then(resp => resp.json()),

  delete: (url, data) =>
    fetch(`http://localhost:3001/${url}`, data).then(resp => resp.json())
};
