import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center max-vh-100">
            <h1 className="display-4 mb-4 text-info">Admin Dashboard</h1>
            <h2 className="text-muted mb-5">Select an Option</h2>
            <div className="row justify-content-center">
                {/* Card for User Registration */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-lg border-0">
                        <div className="card-body text-center">
                            <h5 className="card-title mb-3">User Registration</h5>
                            <p className="card-text text-muted">Register new users in the system for attendance tracking and access control.</p>
                            <Link to="/attendance/user/user-ragistration" className="btn btn-info">
                                Register User
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Card for Take Attendance */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-lg border-0">
                        <div className="card-body text-center">
                            <h5 className="card-title mb-3">Take Attendance</h5>
                            <p className="card-text text-muted">Use the system to take attendance using facial recognition technology.</p>
                            <Link to="/attendance/user/take-attendance" className="btn btn-success">
                                Take Attendance
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Card for Admin Panel */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-lg border-0">
                        <div className="card-body text-center">
                            <h5 className="card-title mb-3">Admin Panel</h5>
                            <p className="card-text text-muted">Manage system configurations and monitor user attendance data.</p>
                            <Link to="/admin/admin-panel" className="btn btn-primary">
                                Go to Admin Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back button */}
            <div className="mt-4">
                <Link to="/attendance" className="btn btn-secondary">
                    Back to Attendance
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
