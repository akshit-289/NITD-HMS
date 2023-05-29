 import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Hostel from "./screens/Hostel";
import Floor from "./screens/Floor";
import Room from "./screens/Room";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/hostel" element={<Hostel />} />
          <Route exact path="/floor/:id" element={<Floor/>} />
          <Route exact path="/room/:floor/:room" element={<Room />} />       
        </Routes>
      </div>
    </Router>
  );
}

export default App;
