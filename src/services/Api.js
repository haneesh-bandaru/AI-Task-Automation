import axios from "axios";

const baseUrl = `http://localhost:3000`;
const remoteUrl = `http://172.17.15.208:3000`;

// Function to handle login
export async function login(obj) {
  try {
    const response = await axios.post(`${baseUrl}/login`, obj);
    return response.data.success;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
}

// Function to get employees
export function getEmployees() {
  return axios.get(`${baseUrl}/employees/get-employees`);
}

// Function to get count of assigned employees
export function assignedEmployees() {
  return axios.get(`${baseUrl}/employees/assigned-count`);
}

// Function to upload a document
export async function uploadDocument(file) {
  try {
    const response = await axios.post(`${remoteUrl}/upload`, file);
    return response;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}

export async function getProjectTaskStatus(){
  try{
    const response = await axios.get(`${baseUrl}/tasks/get-task-status`)
    return response;
  }
  catch(error){
    console.error(" Can't get projects"+error);
    throw error;
  }
}

// Exporting API object with all the calls
export const API = {
  login: (obj) => login(obj),
  getEmployees: () => getEmployees(),
  assignedEmployees: () => assignedEmployees(),
  sendDocument: (file) => uploadDocument(file),
  getProjectTaskStatus: () => getProjectTaskStatus()  
};
