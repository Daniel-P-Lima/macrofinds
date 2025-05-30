import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import Main from './pages/main/Main';
import UserData from "./Components/UserData";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/dadosUsuario" element={<UserData/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
