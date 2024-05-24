import './App.css';
import { useState } from "react";
import { validateEmail } from "./utils";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';

const PasswordErrorMessage = () => {
    return (
        <p className="FieldError">Password should have at least 8 characters</p>
    );
};

function App() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState({
        value: "",
        isTouched: false,
    });
    const [role, setRole] = useState("role");

    const getIsFormValid = () => {
        return (
            fullName &&
            validateEmail(email) &&
            password.value.length >= 8 &&
            role !== "role"
        );
    };

    const clearForm = () => {
        setFullName("");
        setEmail("");
        setPassword({
            value: "",
            isTouched: false,
        });
        setRole("role");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Account created!");
        clearForm();
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div className="App">
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <h2>Sign Up</h2>
                                <div className="Field">
                                    <label>
                                        Full Name <sup>*</sup>
                                    </label>
                                    <input
                                        value={fullName}
                                        onChange={(e) => {
                                            setFullName(e.target.value);
                                        }}
                                        placeholder="Full name"
                                    />
                                </div>
                                <div className="Field">
                                    <label>
                                        Email Address <sup>*</sup>
                                    </label>
                                    <input
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="Field">
                                    <label>
                                        Password <sup>*</sup>
                                    </label>
                                    <input
                                        value={password.value}
                                        type="password"
                                        onChange={(e) => {
                                            setPassword({ ...password, value: e.target.value });
                                        }}
                                        onBlur={() => {
                                            setPassword({ ...password, isTouched: true });
                                        }}
                                        placeholder="Password"
                                    />
                                    {password.isTouched && password.value.length < 8 ? (
                                        <PasswordErrorMessage />
                                    ) : null}
                                </div>
                                <div className="Field">
                                    <label>
                                        Role <sup>*</sup>
                                    </label>
                                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <button type="submit" disabled={!getIsFormValid()}>
                                    Create account
                                </button>
                            </fieldset>
                            <div className="mt-4">
                                <Link to="/home" className="text-blue-600">Go to Home</Link>
                            </div>
                        </form>
                    </div>
                } />
                <Route path="/home" element={<Home />} />
            </Routes>


            
        </Router>
    );
}

export default App;
