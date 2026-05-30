import React from "react";

const ApiTesterFrontend = ({ title, completed }) => {
  return (
    <div>
      <div className="container">
        <h1>{title}</h1>
        <p>{completed.toString()}</p>
      </div>
    </div>
  );
};

export default ApiTesterFrontend;
