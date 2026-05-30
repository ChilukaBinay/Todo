export const todos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "GET",
  });

  return response.json();
};
