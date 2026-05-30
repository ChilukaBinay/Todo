import { useState } from "react";
function useLocalStorage(key) {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) || [];
  });
  return [tasks, setTasks];
}

export default useLocalStorage;
