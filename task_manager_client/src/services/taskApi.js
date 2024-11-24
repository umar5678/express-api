import axios from "axios";

const url = "http://localhost:3000/api/v1/tasks";

/**
 * test each api route to get response, see this response
 * try to sent this response to the components and use it there
 * try to get errors and handle these errors
 * handle 404 and 503 errors 
 */

/**
 * Get all tasks.
 * @returns {Promise} Axios response containing all tasks.
 */
export const getAllTasks = async () => {
  try {
    const response = await axios.get(url);
    return response.data; // Assuming the tasks are in response.data
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

/**
 * Create a new task.
 * @param {Object} task - The task to create.
 * @returns {Promise} Axios response containing the created task.
 */
export const createTask = async (task) => {
  try {
    const response = await axios.post(url, task);
    return response.data; // Assuming the created task is in response.data
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

/**
 * Get a single task by ID.
 * @param {string} id - The ID of the task.
 * @returns {Promise} Axios response containing the task.
 */
export const getSingleTask = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    return response.data; // Assuming the task is in response.data
  } catch (error) {
    console.error(`Error fetching task with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Update a single task by ID.
 * @param {string} id - The ID of the task.
 * @param {Object} updatedData - The updated task data.
 * @returns {Promise} Axios response containing the updated task.
 */
export const updateSingleTask = async (id, updatedData) => {
  try {
    
    const response = await axios.patch(`${url}/${id}`, updatedData);
    return response.data; // Assuming the updated task is in response.data
  } catch (error) {
    console.error(`Error updating task with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a single task by ID.
 * @param {string} id - The ID of the task.
 * @returns {Promise} Axios response confirming deletion.
 */
export const deleteSingleTask = async (id) => {
  try {
    const response = await axios.delete(`${url}/${id}`);
    return response.data; // Assuming the deletion confirmation is in response.data
  } catch (error) {
    console.error(`Error deleting task with ID ${id}:`, error);
    throw error;
  }
};
