import { Link } from 'react-router-dom';

const Attendance = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center max-vh-100 bg-white">
            <div className="card shadow border-0 text-center" style={{ maxWidth: '600px', width: '90%', padding: '40px' }}>
                <h2 className="mb-4" style={{ color: '#2C3E50' }}>Attendance System</h2>
                <p className="mb-4 text-muted" style={{ fontSize: '1.1rem' }}>
                    Log in to manage attendance records efficiently. Choose your role below:
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Link to="/attendance/user" className="btn btn-outline-primary btn-lg rounded-pill px-4">
                        User Login
                    </Link>
                    <Link to="/attendance/admin" className="btn btn-outline-success btn-lg rounded-pill px-4">
                        Admin Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
