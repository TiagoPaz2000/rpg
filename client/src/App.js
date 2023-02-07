import './App.css';
import { io } from "socket.io-client";
import InitialPage from './pages/initial/Initial';
import Login from './pages/Login';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from './pages/home';

function App() {
  const socket = io.connect("http://localhost:4000");

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login socket={socket} />} />
        <Route path="/home/:name" element={<Home socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
