import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);
    const [user,setUser]=useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData object
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);


        try {
            const res = await fetch('http://localhost:8086/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
                credentials:"include"// Send the FormData object directly
            });

            if (res.ok) {
                const myuser = await res.json(); // Use .text() for String responses
                console.log("Server response:", myuser);
                setResponse(myuser.message);// Save the response in state to display it

                //fetch user on login
                const fetchUser  = await fetch('http://localhost:8086/user', {
                    method: 'GET',
                    credentials:"include"// Send the FormData object directly
                });
                if(fetchUser.ok){
                    const result=await fetchUser.json();
                    console.log("Fetched User:",result);
                    setUser(result);
                    navigate('/',{state:{result}});
                }
                else{
                console.error("failed to Fetch User");
                }

            } else {
                console.error("Login Failed:", res.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (

        <div className="login-form">
            <header className="login-header">
                Please Sign In
            </header>
            <form className="form-class" onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="username"  // This must match the property in your backend model
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                <br />

                    <input
                        type="password"
                        name="password"  // This must match the property in your backend model
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                <br />
                <input type="submit" value="Login"/>
            </form>
            {response && <div>{response}</div>}
        </div>
    );
}
export default LoginForm;
