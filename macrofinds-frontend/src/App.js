// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Main from './pages/main/Main';
import UserData from "./pages/UserData/UserData";
import AboutUs from "./pages/AboutUs/AboutUs";
import Login from "./pages/Login/Login";


function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main/>}></Route>
          <Route path="/dadosUsuario" element={<UserData/>}></Route>
          <Route path="metodologia" element={<AboutUs/>}> </Route>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
