import apiClient from "./apiClient";

const BASE_URL = "http://localhost:3000/user";

export const createUser = async (user) => {
    console.log("user:", user);
    const response = await apiClient.post(`${BASE_URL}`, user);
    return response.data;
};

export const getUserById = async (userId) => {
    const response = await apiClient.get(`${BASE_URL}/${userId}`);
    return response.data;
};

export const getUserByAccountId = async (accountId) => {
    const response = await apiClient.get(`${BASE_URL}/account/${accountId}`);
    return response.data;
};