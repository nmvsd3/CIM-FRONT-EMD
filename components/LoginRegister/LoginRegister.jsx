import React, { useState } from 'react';
import './LoginRegister.css'; // Importing CSS file

const LoginRegister = ({ onLoginSuccess }) => {
    const [action, setAction] = useState('');
    const [formData, setFormData] = useState({ policeId: '', email: '', password: '' });
    const [passwordValid, setPasswordValid] = useState(true);
    const [policeIdValid, setPoliceIdValid] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility

    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction('');
    };

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'password') {
            const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
            setPasswordValid(passwordPattern.test(value));
        }

        if (name === 'policeId') {
            const idPattern = /^[A-Za-z0-9]+$/; // Allow letters and numbers
            setPoliceIdValid(idPattern.test(value));
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!passwordValid || !policeIdValid) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ policeId: formData.policeId, password: formData.password })
            });
            const result = await response.text();
            if (result === "Login successful") {
                sessionStorage.setItem("auth", "true");
                onLoginSuccess(formData.policeId); // Pass policeId instead of name
            } else {
                alert(result);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Handle register form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!passwordValid || !policeIdValid) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.text();
            alert(result);
            if (result === "Registration successful") {
                loginLink(); // Switch to login form after successful registration
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="login-register-container">
            <div className="form-toggle">
                <button onClick={loginLink} className={`toggle-button${action === '' ? ' active' : ''}`}>Login</button>
                <button onClick={registerLink} className={`toggle-button${action}`}>Register</button>
            </div>
            <form onSubmit={action === '' ? handleLogin : handleRegister} className="form">
                {action === ' active' && (
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                )}
                <input
                    type="text"
                    name="policeId"
                    placeholder="Police ID"
                    value={formData.policeId}
                    onChange={handleChange}
                    required
                    style={{ borderColor: policeIdValid ? '#ccc' : 'red' }} // Change border color based on validity
                />
                <div className="password-container">
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ borderColor: passwordValid ? '#ccc' : 'red' }} // Change border color based on validity
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
                        {passwordVisible ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7.2 4.5 3.7 8.2 2 12c1.7 3.8 5.2 7.5 10 7.5s8.3-3.7 10-7.5c-1.7-3.8-5.2-7.5-10-7.5zm0 13.5a6.995 6.995 0 0 1-6.6-4.5A6.995 6.995 0 0 1 12 9c2.4 0 4.5 1.2 5.6 3.2a7.007 7.007 0 0 1-5.6 5.3zm0-9a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7.2 4.5 3.7 8.2 2 12c1.7 3.8 5.2 7.5 10 7.5s8.3-3.7 10-7.5c-1.7-3.8-5.2-7.5-10-7.5zm0 13.5a6.995 6.995 0 0 1-6.6-4.5A6.995 6.995 0 0 1 12 9c2.4 0 4.5 1.2 5.6 3.2a7.007 7.007 0 0 1-5.6 5.3zm0-9a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM12 6a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"/></svg>
                        )}
                    </button>
                </div>
                <button type="submit" className="submit-button">{action === ' active' ? 'Register' : 'Login'}</button>
            </form>
        </div>
    );
};

export default LoginRegister;
