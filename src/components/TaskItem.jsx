// 📁 src/components/TaskItem.jsx
import "../Todo.css";
import React from "react";
import InputEditTask from "../components/InputEditTask.jsx";
import { useState } from "react";

const TaskItem = ({
  task,

  removeList,
  toggleTask,
  editTask,
  newEditedTask,
  setnewEditedTask,
}) => {
  const [isEditing, setisEditing] = useState(false);

  return (
    <li className="task-item">
      {/* Task Text */}
      <span
        className={task.completed ? "completed" : ""}
        onClick={() => toggleTask(task.id)}
      >
        {task.text}
      </span>
      {/* Remove Button */}
      <button className="delete-btn" onClick={() => removeList(task.id)}>
        Remove
      </button>
      <button
        className="edit-btn"
        onClick={() => {
          setisEditing(true);
          setnewEditedTask(task.text);
        }}
      >
        Edit
      </button>
      {isEditing && (
        <>
          <InputEditTask
            newEditedTask={newEditedTask}
            setnewEditedTask={setnewEditedTask}
            editTask={editTask}
            task={task}
            setisEditing={setisEditing}
          />
        </>
      )}
    </li>
  );
};

export default TaskItem;
