import { useEffect, useState } from "react";
import Todo from "./Todo.jsx";
import ApiTesterFrontend from "./api/ApiTesterFrontend.jsx";
import { todos } from "./api/Api.jsx";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState("");
  // useEffect(() => {
  //   const getTodos = async () => {
  //     try {
  //       const response = await todos();
  //       setData(response);
  //     } catch (error) {
  //       seterror(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getTodos();
  // }, []);
  // if (loading) return <h1>Loading...</h1>;

  // if (error) return <h1>{error}</h1>;
  return (
    <>
      <Todo />
      {/* {data.length > 0 ? (
        data.map((e) => (
          <ApiTesterFrontend
            title={e.title}
            key={e.id}
         
            completed={e.completed}
          />
        ))
      ) : (
        <p>noo data found</p>
      )} */}
    </>
  );
}

export default App;
