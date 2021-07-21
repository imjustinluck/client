import './App.css';
import React from "react"
import Home from "./components/Home"
import Detail from "./components/Detail"
import Edit from "./components/Edit"
import {Router} from "@reach/router"

function App() {

  return (
    <div className="App">
      <Router>
        <Home path="/" />
        <Detail path="/:product_id" />
        <Edit path="/:product_id/edit" />
      </Router>
    </div>
  );
}

export default App;
