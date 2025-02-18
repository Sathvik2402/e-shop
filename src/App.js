import React from "react";
import "./App.css";
import LoginForm from "./components/LoginPage";
import HomePage from "./components/HomePage";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Logout from "./components/Logout";
import Cart from "./components/CartPage";


function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/login" element={<LoginForm/>} />
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/cart" element={<Cart/>} />
            </Routes>
        </Router>

    );
}

export default App;
