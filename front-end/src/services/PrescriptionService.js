import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/prescription";

export const getAllPrescriptions = () => axios.get(API_URL);
export const getPrescriptionById = (id) => axios.get(`${API_URL}/${id}`);
export const createPrescription = (data) => axios.post(API_URL, data);
export const updatePrescription = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deletePrescription = (id) => axios.delete(`${API_URL}/${id}`);
export const getByDateRange = (start, end) =>
  axios.get(`${API_URL}/by-date?start=${start}&end=${end}`);
export const getByName = (name) =>
  axios.get(`${API_URL}/by-name?name=${name}`);
export const getByGender = (gender) =>
  axios.get(`${API_URL}/by-gender?gender=${gender}`);
