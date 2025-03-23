import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem('token'); // Check if user is logged in

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <nav className="navbar nav-underline navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <i className="fa-regular fa-file mx-2"></i>Y.Notebook
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-2">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                        {isAuthenticated && (
                            <li className="nav-item mx-2">
                                <Link className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} to="/profile">Profile</Link>
                            </li>
                        )}
                    </ul>

                    {isAuthenticated ? (
                        <button className="btn btn-primary mx-3" onClick={handleLogout}>Logout</button>
                    ) : (
                        <form className="d-flex">
                            <Link className="btn btn-primary mx-2" to="/login">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup">Signup</Link>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
