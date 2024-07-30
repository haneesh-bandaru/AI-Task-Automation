import axios from "axios";

const BASE_URL = "http://localhost:3000";
const REMOTE_URL = "http://172.17.15.208:3000";

function getToken() {
  return localStorage.getItem("token");
}

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

const API = {
  login: credentials => axios.post(`${BASE_URL}/login`, credentials),

  getEmployees: headers => axiosInstance.get(`/protected/employees/get-employees`, { headers }),

  assignedEmployees: headers =>
    axiosInstance.get(`/protected/employees/assigned-count`, { headers }),

  uploadedDocument: (file, headers) =>
    axiosInstance.post(`${REMOTE_URL}/upload`, file, { headers }),

  getProjectTaskStatus: headers =>
    axiosInstance.get(`/protected/tasks/get-task-status`, { headers }),

  sendTasks: obj => axios.post(`${REMOTE_URL}/receiveJSONdata`, { obj })
};

export default API;
