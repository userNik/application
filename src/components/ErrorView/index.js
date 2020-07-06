import React from "react";

const ErrorView = () => {
    const reloadPage = () => {
      window.location.reload();
    };

    return (
        <div className="error-view">
            <h2>Something went wrong</h2>
            <button onClick={reloadPage}>Try that again</button>
        </div>
    )
};

export default ErrorView;
