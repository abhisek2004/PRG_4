import React from "react";
import "./loading.css"; 

const Loading = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <span>{`{`}</span>
        <span>{`}`}</span>
      </div>
    </div>
  );
};

export default Loading;
