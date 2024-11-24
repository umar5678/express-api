import React, { useState } from "react";

const Modal = ({ task, isNewTask, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState(
    task || { name: "", description: "", completed: false }
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    if (formData.name) {
      onSave(formData);
    }
  };
  const handleUpdate = (id) => {
    if (formData.name) {
      const updatedData = {
        name: formData.name,
        description: formData.description,
        completed: formData.completed,
      };
      
      onSave(id, updatedData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {isNewTask ? "Add New Task" : "Task Details"}
        </h2>
        <div className="mb-4">
          <label className="block font-medium">Title</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
              className="mr-2"
            />
            Completed
          </label>
        </div>
        <div className="flex justify-between">
          {!isNewTask && (
            <button
              onClick={() => onDelete(task._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          )}

          {isNewTask ? (
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Create Task
            </button>
          ) : (
            <button
              onClick={() => handleUpdate(task._id)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Update Task
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
