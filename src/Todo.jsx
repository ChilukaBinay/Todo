// 📁 src/Todo.jsx
import useLocalStorage from "../src/hooks/useLocalStorage.jsx";
import React, { useEffect, useState } from "react";
import "./Todo.css";
import TaskItem from "./components/TaskItem";
import search from "./assets/search.png";
const Todo = () => {
  // State
  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState([]);
  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await todos();
        setdata(response);
      } catch (error) {
        seterror("data not found");
      } finally {
        setLoading(false);
      }
    };
    getTodos();
  }, []);
  const [darkmode, setdarkmode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkmode")) || false;
  });

  const [searchterm, setsearchTerm] = useState("");
  const [newEditedTask, setnewEditedTask] = useState("");
  const [filter, setfilter] = useState("All");

  const [tasks, setTasks] = useLocalStorage("tasks");

  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    localStorage.setItem("darkmode", JSON.stringify(darkmode));
  }, [darkmode]);
  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  function addTask() {
    if (inputValue.trim() === "") {
      alert("Enter the task");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      darkmode,
    };

    setTasks([...tasks, newTask]);

    setInputValue("");
  }

  // Delete Task
  function removeList(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks);
  }

  // Toggle Task
  function toggleTask(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  // Edit Task
  function editTask(id) {
    if (newEditedTask.trim() === "") {
      alert("Enter the new task");
      return;
    }

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          text: newEditedTask,
        };
      }

      return task;
    });

    setTasks(updatedTasks);

    setnewEditedTask("");
  }

  function removeCompletedTask() {
    // Keep tasks where task.completed is NOT truthy
    const pendingTasks = tasks.filter((task) => {
      return task.completed === false;
    });
    setTasks(pendingTasks);
  }

  // Filter Tasks
  const filterTask = tasks
    .filter((task) => {
      if (filter === "Completed") {
        return task.completed === true;
      }

      if (filter === "Pending") {
        return task.completed === false;
      }

      return true;
    })
    .filter((task) => {
      return task.text.toLowerCase().includes(searchterm.toLowerCase());
    });
  const completedTaskLength = tasks.filter(
    (task) => task.completed === true,
  ).length;

  const pendingTaskLength = tasks.filter(
    (task) => task.completed === false,
  ).length;
  return (
    <div className={`container ${darkmode ? "dark" : ""}`}>
      <h1 id="heading">TO-DO APP</h1>

      {/* Input Section */}
      <div className="input-section">
        <input
          autoFocus
          type="text"
          id="inputPlace"
          placeholder="Enter the task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button id="addBtn" onClick={addTask}>
          ADD
        </button>

        <select
          className="selectSection"
          value={filter}
          onChange={(e) => {
            setfilter(e.target.value);
          }}
        >
          <option>All</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>
      </div>

      <div className="taskLength">
        <span>Total Task: {tasks.length}</span>
        <span>Completed Task: {completedTaskLength}</span>
        <span>Pending Task: {pendingTaskLength}</span>
      </div>

      <div className="searchTask">
        <input
          autoFocus
          type="text"
          placeholder="Search the task"
          value={searchterm}
          onChange={(e) => {
            setsearchTerm(e.target.value);
          }}
        />
        <button>
          <img src={search} alt="Something Went Wrong" />
        </button>
        <button
          onClick={() => {
            removeCompletedTask();
          }}
        >
          {" "}
          Clear Completed
        </button>
      </div>
      {/* Task List */}
      <ul id="taskHolder">
        {tasks.length === 0 ? (
          <span className="noAvailTask">No available Task</span>
        ) : (
          filterTask.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              removeList={removeList}
              toggleTask={toggleTask}
              editTask={editTask}
              newEditedTask={newEditedTask}
              setnewEditedTask={setnewEditedTask}
            />
          ))
        )}
      </ul>

      <button
        className="darkmodeButton"
        onClick={() => {
          setdarkmode(!darkmode);
        }}
      >
        {darkmode === false ? "DarkMode" : "LightMode"}
      </button>
    </div>
  );
};

export default Todo;
