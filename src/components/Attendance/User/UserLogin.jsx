import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password
            });

            console.log('Login successful:', response.data);
            const { full_name, user_id, attendance } = response.data;
            localStorage.setItem('user', JSON.stringify({ full_name, user_id, attendance }));

            navigate('/attendance/user/user-dashboard');
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error || 'Login failed. Please try again.');
            } else {
                toast.error('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card shadow" style={{ width: '400px' }}>
                <div className="card-body">
                    <h2 className="mb-4 text-center">User Login</h2>
                    <form onSubmit={handleLogin} className="m-2">
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label text-start w-100">User ID</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter user ID"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="password" className="form-label text-start w-100">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary my-1" style={{ width: '100%' }}>Login</button>
                            <button
                                className="btn btn-outline-secondary"
                                style={{ width: '100%' }}
                                onClick={() => navigate('/attendance')}>
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer /> {/* ToastContainer to display notifications */}
        </div>
    );
};

export default UserLogin;
