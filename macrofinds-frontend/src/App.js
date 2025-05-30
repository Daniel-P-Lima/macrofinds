// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Main from './pages/main/Main';
import UserData from "./pages/UserData/UserData";
import Navbar from "./assets/Navbar/Navbar";

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
