import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../context/notes/AlertContext';
import { baseUrl } from '../Urls';



function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const navigate = useNavigate();
    const { showAlert } = useContext(AlertContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;

        if (password !== cpassword) {
            showAlert('danger', 'Passwords do not match!');
            return;
        }

        const response = await fetch(`${baseUrl}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            // Save the "AuthToken" and redirect user
            localStorage.setItem('token', json.authtoken);
            showAlert('success', 'Signup successful!');
            navigate("/")
        } else {
            showAlert('danger', 'Invalid Credentials');
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <div className="container justify-content-center my-5 col-md-6 col-lg-5">
            <h3>Create Account To Use <br />
                My-Notebook</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" onChange={onChange} value={credentials.name} id="text" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" onChange={onChange} value={credentials.email} id="email" aria-describedby="emailHelp" autoComplete="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="position-relative">
                        <input type={showPassword ? "text" : "password"} name="password" onChange={onChange} id="password" value={credentials.password} className="form-control" autoComplete="new-password" />
                        <i
                            className={`pw-icon fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                            onClick={() => setShowPassword(!showPassword)} />
                    </div>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <div className="position-relative">
                        <input type={showCPassword ? "text" : "password"} name="cpassword" onChange={onChange} id="cpassword" value={credentials.cpassword} className="form-control" autoComplete="new-password" />
                        <i
                            className={`pw-icon fa ${showCPassword ? "fa-eye-slash" : "fa-eye"}`}
                            onClick={() => setShowCPassword(!showCPassword)}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup
