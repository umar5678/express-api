import React, { useEffect, useState } from "react";
import { Card, Modal } from "./components";
import {
  getAllTasks,
  createTask,
  deleteSingleTask,
  updateSingleTask,
} from "./services/taskApi";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewTask, setIsNewTask] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllTasks()
      .then((response) => {
        setTasks(response.tasks);
      })
      .catch((err) => {
        setError(err.message);
      });
    setLoading(false);
    
  }, [isModalOpen]);

  const openModal = (task) => {
    setSelectedTask(task);
    setIsNewTask(false);
    setIsModalOpen(true);
  };

  const openNewTaskModal = () => {
    setSelectedTask(null);
    setIsNewTask(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateTask = (id, updatedTask) => {
    setLoading(true);

    updateSingleTask(id, updatedTask)
      .then((response) => {})
      .catch((err) => setError(err.message));
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === id ? updatedTask : task))
    );
    setLoading(false);
    closeModal();
  };

  const deleteTask = (taskId) => {
    setLoading(true);
    deleteSingleTask(taskId)
      .then((response) => {})
      .catch((err) => setError(err.message));
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    setLoading(false);
    closeModal();
  };

  const addNewTask = (newTask) => {
    setLoading(true);
    createTask(newTask)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        setError(err.message);
      });
    // newTask.id = tasks.length + 1; // Generate ID
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setLoading(false);
    closeModal();
  };

  if (loading) return <h1>Loading</h1>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Task Manager</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={openNewTaskModal}
        >
          Add New Task
        </button>
      </div>
      {error && <p>{error}</p>}
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div key={task._id}>
              <Card task={task} onClick={() => openModal(task)} />
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <Modal
          task={selectedTask}
          isNewTask={isNewTask}
          onClose={closeModal}
          onSave={isNewTask ? addNewTask : updateTask}
          onDelete={deleteTask}
        />
      )}
    </div>
  );
};

export default App;
