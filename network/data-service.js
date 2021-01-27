import config from "../config/config.json";
const apiUrl = config[config.ENV_MODE].API_URL;
const DataService = {
  post(serviceUrl, data) {
    return fetch(`${apiUrl}/${serviceUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  put(serviceUrl, data) {
    return fetch(`${apiUrl}/${serviceUrl}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
};

export default DataService;
