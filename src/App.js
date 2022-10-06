import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Ranking from "./components/Ranking";
import Register from "./components/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Login />}
          />
          <Route
            exact
            path="/register"
            element={<Register />}
          />
          <Route exact path="/home" element={<Home />} />
          <Route
            exact
            path="/ranking"
            element={<Ranking /> }
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
