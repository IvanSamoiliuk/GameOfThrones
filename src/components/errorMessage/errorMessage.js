import React from "react";
import dayneris from "./Dayneris.jpg";
import "./errorMessage.css";

const ErrorMessage = () => {
    return (
        <React.Fragment>
            <span>Something goes wrong.</span>
            <img src={dayneris} className="random" alt="error" />
        </React.Fragment>
    );
};

export default ErrorMessage;
