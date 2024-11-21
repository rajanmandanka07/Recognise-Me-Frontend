import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCheckCircle, FaTimesCircle, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userID');
                if (!userId) {
                    setError('User ID not found in local storage.');
                    setLoading(false);
                    return;
                }
                const response = await axios.post('http://localhost:5000/api/user/dashboard', { user_id: userId });
                setUserData(response.data);
                console.log("UserID : ", cookies.get('userID'));

                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Failed to fetch user data.');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center mt-4">{error}</div>;
    }

    const handleBackToDashboard = () => {
        cookies.remove('userID');
        navigate('/attendance');
    };

    const { full_name, email, attendance, organization } = userData;
    const sortedAttendance = attendance ? attendance.sort((a, b) => new Date(b.attendance_date) - new Date(a.attendance_date)) : [];

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">User Dashboard</h2>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg mb-4">
                        <div className="card-body text-center">
                            <h4 className="card-title text-primary mb-3">
                                <FaUser className="me-2"/> User Details
                            </h4>
                            <p className="lead">
                                <strong>Full Name:</strong> {full_name}
                            </p>
                            <p className="lead">
                                <strong>E-Mail:</strong> {email}
                            </p>
                            <p className="lead">
                                <strong>Organization:</strong> {organization}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg mb-4">
                        <div className="card-body text-center">
                            <h4 className="card-title text-success mb-3">
                                <FaCalendarAlt className="me-2"/> Attendance Records
                            </h4>
                            {sortedAttendance.length > 0 ? (
                                <ul className="list-group">
                                    {sortedAttendance.map((record, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>
                                                <FaCalendarAlt className="me-2 text-info"/>
                                                <strong>Date:</strong> {new Date(record.attendance_date).toLocaleDateString("en-US", {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}
                                            </span>
                                            <span>
                                                {record.status === 'Present' ? (
                                                    <FaCheckCircle className="text-success me-2"/>
                                                ) : (
                                                    <FaTimesCircle className="text-danger me-2"/>
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
            <div className="d-flex justify-content-center m-3">
                <button className="btn btn-danger" onClick={handleBackToDashboard}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;
