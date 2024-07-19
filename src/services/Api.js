import axios from "axios";

const baseUrl = `http://172.17.15.226:3004`;

export async function login(obj) {
  let response = await axios.post(`${baseUrl}/login`, obj);
  return response.data.success;
}

export function getEmployees() {
  return axios.get(`${baseUrl}/employees/get-employees`);
}

export function notAssignedEmployees(){
  return axios.get(`${baseUrl}/empnotcount/get-employees-notcount`)
}

export function assignedEmployees(){
  return axios.get(`${baseUrl}/empcount/get-employees-count`)
}


// export function uploadDocument(file){
//   let response =  axios.post(`http://172.17.15.208:3000/upload`, file )
//   console.log(response);
//   return response;
// }

export const API = {
  sendDocument: (file) => axios.post(`http://172.17.15.208:3000/upload`, file),
};

