import axios from "axios";

const BASE_URL = "http://localhost:3000";
const REMOTE_URL = "http://172.17.15.208:3000";

function getToken() {
  return localStorage.getItem("token");
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `${getToken()}`,
  },
});

const API = {
  login: (credentials) => axios.post(`${BASE_URL}/login`, credentials),

  getEmployees: (headers) =>
    axiosInstance.get(`/protected/employees/get-employees`, { headers }),

  assignedEmployees: (headers) =>
    axiosInstance.get(`/protected/employees/assigned-count`, { headers }),

  uploadDocument: (file, headers) =>
    axiosInstance.post(`${REMOTE_URL}/upload`, file, { headers }),

  getProjectTaskStatus: (headers) =>
    axiosInstance.get(`/protected/tasks/get-task-status`, { headers }),
};

export default API;
