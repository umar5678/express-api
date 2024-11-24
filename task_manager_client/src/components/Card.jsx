const Card = ({ task, onClick }) => {
  return (
    <div
      className="border rounded-md p-4 shadow-md cursor-pointer hover:shadow-lg"
      onClick={onClick}
    >
      <h2 className="text-lg font-semibold">{task.name}</h2>
      <p className="text-gray-600">{task.description}</p>
      <p
        className={`mt-2 font-medium ${
          task.completed ? "text-green-600" : "text-red-600"
        }`}
      >
        {task.completed ? "Completed" : "Pending"}
      </p>
    </div>
  );
};

export default Card;
