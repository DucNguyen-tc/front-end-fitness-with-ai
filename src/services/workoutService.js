import apiClient from "./apiClient";

const BASE_URL = "http://localhost:3000/workout";

export const getWorkoutByMuscleGroup = async (muscleGroupName) => {
    const response = await apiClient.get(`${BASE_URL}/by-muscle-group/${muscleGroupName}`);
    return response.data;
};

export const getWorkoutById = async (workoutId) => {
    const response = await apiClient.get(`${BASE_URL}/${workoutId}`);
    return response.data;
};