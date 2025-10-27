import apiClient from "./apiClient";

const BASE_URL = "http://localhost:3000/plan";

export const getPlanByUserId = async (userId) => {
    const response = await apiClient.get(`${BASE_URL}/user/${userId}`);
    return response.data;
};

export const createPlanByAI = async (userId) => {
    const response = await apiClient.post(`${BASE_URL}/create-initial/${userId}`);
    return response.data;
};

export const updatePlan = async (planId, plan) => {
    const response = await apiClient.patch(`${BASE_URL}/${planId}`, plan);
    return response.data;
};

export const updateSessionStatus = async (planId, sessionId, status) => {
    const response = await apiClient.patch(`${BASE_URL}/${planId}/sessions/${sessionId}`, { status });
    return response.data;
};