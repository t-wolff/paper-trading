import axios from "axios";

export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export const saveToLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const saveToSessionStorage = (name, data) => {
  sessionStorage.setItem(name, JSON.stringify(data));
};

export const getFromLocalStorage = (name) => {
  const data = localStorage.getItem(name);
  return JSON.parse(data);
};
