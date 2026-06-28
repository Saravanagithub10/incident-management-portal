import axios from "axios";

const api = axios.create({
baseURL: "https://incident-management-portal-api-h2fnd5ashheahtdz.centralindia-01.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;