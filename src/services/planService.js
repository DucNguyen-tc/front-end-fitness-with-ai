import apiClient from "./apiClient";

const BASE_URL = "http://localhost:3000/plan";

export const getPlanByUserId = async (userId) => {
    const response = await apiClient.get(`${BASE_URL}/user/${userId}`);
    return response.data;
};