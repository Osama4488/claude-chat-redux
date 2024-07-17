import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const api = axios.create({
        baseURL: 'https://localhost:7144', // Replace with your API base URL
        headers: {
          'Content-Type': 'application/json',
        },
      });

    const handleLogin = async () => {
        try {
            const response = await api.post('/api/auth/login', { username, password });
            setToken(response.data.token);
            console.log(response.data.token,"response.data.token")
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {token && <p>Token: {token}</p>}
        </div>
    );
};

export default Login;
