import axios from "axios";

// Masukkan Bearer Token dari Postman
const token = "5|52SNORp6f5jTaMkFvYKPbB1OfdLRJLZaMyzkOVHw14fde4f7";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + token,
  },
});

export default apiClient;
