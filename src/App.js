import { Routes,Route, Link } from "react-router-dom";

import Home from "./components/home.js";
import Journeys from "./components/journeys.js";
import Stations from "./components/stations.js";
import Import from "./components/import.js";


import './App.css';

function App() {
  return (    
      <div>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/journeys"}>Journeys</Link>
            </li>
            <li>
              <Link to={"/stations"}>Stations</Link>
            </li>
            <li>
              <Link to={"/import"}>Import</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/journeys" element={<Journeys />} />
          <Route exact path="/stations" element={<Stations />} />
          <Route exact path="/import" element={<Import />} />
        </Routes>
      </div>    
  );
}

export default App;
