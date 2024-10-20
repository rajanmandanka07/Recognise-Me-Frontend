import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const AdminPanel = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch attendance data from the API when the component mounts
    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/attendance');
                setAttendanceData(response.data.attendance);
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Failed to fetch attendance data.');
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceData();
    }, []);

    // If loading, show a loading spinner
    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // If there's an error, show the error message
    if (error) {
        return <div className="alert alert-danger text-center mt-4">{error}</div>;
    }

    const handleBackToDashboard = () => {
        navigate('/attendance/admin/admin-dashboard');
    };

    return (
        <div className="container mt-5 mb-4">
            <div className="card shadow-lg p-4">
                <div className="card-header bg-primary text-white text-center">
                    <h2>Admin Dashboard</h2>
                    <p className="mb-0">Manage Attendance Records</p>
                </div>

                <div className="card-body">
                    <h5 className="text-center mb-4">Attendance Data</h5>

                    {/* Display the attendance data in a table */}
                    <div className="table-responsive">
                        <table className="table table-hover table-striped table-bordered">
                            <thead className="table-dark">
                            <tr>
                                <th>Full Name</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {attendanceData.length > 0 ? (
                                attendanceData.map((record, index) => (
                                    <tr key={index}>
                                        <td>{record.full_name}</td>
                                        <td>{record.date}</td>
                                        <td>
                                                <span
                                                    className={`badge ${record.status === 'Present' ? 'bg-success' : 'bg-danger'}`}>
                                                    {record.status}
                                                </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">No attendance records found.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-secondary" onClick={handleBackToDashboard}>
                    Back to Admin Dashboard
                </button>
            </div>
        </div>
    );
};

export default AdminPanel;
