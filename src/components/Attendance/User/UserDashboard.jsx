import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCheckCircle, FaTimesCircle, FaCalendarAlt } from 'react-icons/fa'; // Import icons

const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem('user');
        if (storedData) {
            setUserData(JSON.parse(storedData));
        }
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const { full_name, attendance } = userData;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">User Dashboard</h2>

            {/* User Details */}
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg mb-4">
                        <div className="card-body text-center">
                            <h4 className="card-title text-primary mb-3">
                                <FaUser className="me-2" /> User Details
                            </h4>
                            <p className="lead">
                                <strong>Full Name:</strong> {full_name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendance Records */}
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg mb-4">
                        <div className="card-body text-center">
                            <h4 className="card-title text-success mb-3">
                                <FaCalendarAlt className="me-2" /> Attendance Records
                            </h4>
                            {attendance && attendance.length > 0 ? (
                                <ul className="list-group">
                                    {attendance.map((record, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>
                                                <FaCalendarAlt className="me-2 text-info" />
                                                <strong>Date:</strong> {record.date}
                                            </span>
                                            <span>
                                                {record.status === 'Present' ? (
                                                    <FaCheckCircle className="text-success me-2" />
                                                ) : (
                                                    <FaTimesCircle className="text-danger me-2" />
                                                )}
                                                <strong>Status:</strong> {record.status}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted">No attendance records found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Back Button */}
            <div className="text-center mt-4">
                <button
                    className="btn btn-secondary btn-lg px-5"
                    onClick={() => navigate('/attendance')}
                >
                    Back to Home page
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;
