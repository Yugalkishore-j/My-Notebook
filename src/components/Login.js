import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../context/notes/AlertContext';
import { baseUrl } from '../Urls';

const Login = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { showAlert } = useContext(AlertContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });

        const json = await response.json();


        if (json.success) {
            // Save the "AuthToken" and redirect user
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('user', JSON.stringify({ name: json.user.name, email: json.user.email }));

            showAlert('success', 'Login successful!');
            navigate("/")
        } else {
            showAlert('danger', 'Invalid Details');
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="login container justify-content-center my-5 col-md-6 col-lg-5">
            <h3>Login to continue My-Notebook</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="position-relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                            id="password"
                            className="form-control"
                        />
                        <i
                            className={` pw-icon fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                            onClick={() => setShowPassword(!showPassword)}
                            
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="button" className="btn btn-primary mx-3" onClick={() => navigate('/signup')}> Signup </button>
                
            </form>
        </div>
    );
};

export default Login;
