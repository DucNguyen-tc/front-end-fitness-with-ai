import apiClient from "./apiClient";

const BASE_URL = "http://localhost:3000/muscle-group";

export const getAllMuscleGroups = async () => {
  const response = await apiClient.get(`${BASE_URL}`);
  return response.data;
};
