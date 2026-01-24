import axios from "axios";

const API_URL = "https://696e0052d7bacd2dd71557cd.mockapi.io/employees"; // API

export const api=axios.create({
  baseURL: API_URL,
  timeout:5000,
});

export const fetchEmployees = () => axios.get(API_URL);

export const fetchEmployeeById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const addEmployeeApi = (data) =>
  axios.post(API_URL, data);

export const updateEmployeeApi = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteEmployeeApi = (id) =>
  axios.delete(`${API_URL}/${id}`);
