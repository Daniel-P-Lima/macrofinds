import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import Mainpage from './Components/Mainpage';
import UserData from "./Components/UserData";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Mainpage/>}></Route>
          <Route path="/dadosUsuario" element={<UserData/>}></Route>
        </Routes>
      </Router>
    </div>

  );
}

export default App;
