import React from "react";
import "./InputEditTask.css";

const InputEditTask = ({
  newEditedTask,
  setnewEditedTask,
  task,
  setisEditing,
  editTask,
}) => {
  return (
    <div>
      <input
        autoFocus
        type="text"
        value={newEditedTask}
        placeholder="Enter the task"
        onChange={(e) => {
          setnewEditedTask(e.target.value);
        }}
      />
      <button
        className="save-btn"
        onClick={() => {
          editTask(task.id);
          setisEditing(false);
        }}
      >
        Save
      </button>
    </div>
  );
};
export default InputEditTask;
