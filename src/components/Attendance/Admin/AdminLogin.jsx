import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API calls

const AdminLogin = () => {
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error message
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state before making a request

        try {
            // Make a POST request to the admin login endpoint
            const response = await axios.post('http://localhost:5000/api/admin/login', {
                adminId,
                password
            });

            // If successful, you can use the response as needed
            console.log('Admin Login successful:', response.data);
            // Optionally, store token or admin data in localStorage if needed
            localStorage.setItem('admin', JSON.stringify(response.data));

            // Navigate to the admin dashboard or appropriate route
            navigate('/attendance/admin/admin-dashboard');
        } catch (error) {
            // Handle error from the server
            if (error.response) {
                setError(error.response.data.error || 'Login failed. Please try again.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card shadow" style={{ width: '400px' }}>
                <div className="card-body text-center">
                    <h2 className="mb-4">Admin Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>} {/* Error message */}
                    <form onSubmit={handleLogin} className="m-2">
                        <div className="form-group mb-3">
                            <label htmlFor="adminId" className="form-label text-start w-100">Admin ID</label>
                            <input
                                type="email"
                                id="adminId"
                                className="form-control"
                                placeholder="Enter admin ID"
                                value={adminId}
                                onChange={(e) => setAdminId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="password" className="form-label text-start w-100">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary my-1" style={{width: '100%'}}>Login
                            </button>
                            <button
                                className="btn btn-outline-secondary"
                                style={{width: '100%'}}
                                onClick={() => navigate('/attendance')}>
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
