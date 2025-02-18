import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        // Send a logout request to the server
        await fetch('http://localhost:8086/logout', {
            method: 'POST',  // Or 'GET' depending on your server setup
            credentials: 'include'  // Send session cookie along with the request
        });

        // Redirect the user to the login page or home page
        navigate('/');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;
