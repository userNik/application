import React, { useState } from 'react';

import Chart from "./components/Chart";
import Player from "./components/Player";
import ErrorView from "./components/ErrorView"

import "./App.css";

function App() {
  const [isError, markAsError] = useState(false);

  if (isError) {
    return <ErrorView />
  }

  return (
      <main className="container">
        <div className="video-content">
          <Player markAsError={markAsError}/>
        </div>
        <div className="chart-content">
          <Chart />
        </div>
      </main>
  );
}

export default App;
