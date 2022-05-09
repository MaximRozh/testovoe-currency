import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./router";

function App() {
  return (
    <div className="App">
      <Routes>
        {routes.map((route) => (
          <Route
            path={route.path}
            element={<route.component />}
            key={route.path}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
