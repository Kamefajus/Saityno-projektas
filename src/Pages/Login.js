import './Login.css';  // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Send the username and password in the request body
            const response = await axios.post('https://localhost:5133/api/login', { userName: username, password });
            
            // Store the access token in localStorage
            localStorage.setItem('accessToken', response.data.accessToken);

            // Redirect to the home page after successful login
            navigate('/');
        } catch (error) {
            console.error('Login error', error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:5133/api/accounts', {
                userName: registerUsername,
                password: registerPassword,
                email,
            });

            setRegisterMessage('Registration successful! You can now log in.');
        } catch (error) {
            console.error('Registration error', error);
            setRegisterMessage('Registration failed. Please try again.');
        }
    };


    return (
        <div className="login-container">
            <h1>Film Analysis Lounge</h1> {/* Title for the project */}
            
            <form className="login-form" onSubmit={handleLogin}>
            <h4>Login</h4>
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
                <button type="submit">Login</button>
            </form>


        
        {/* Register Form */}
        <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
            type="text"
            placeholder="Username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        {registerMessage && <p>{registerMessage}</p>}
    </form>
</div>

    );
};

export default Login;
