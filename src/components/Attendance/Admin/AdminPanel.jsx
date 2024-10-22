import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [selectedDate, setSelectedDate] = useState(''); // State for selected date
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

    // Filter attendance data based on the search query and selected date
    const filteredAttendanceData = attendanceData
        .filter(record =>
            (record.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                record.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                record.organization_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                record.date.includes(searchQuery) || // Assuming date is in 'YYYY-MM-DD' format
                record.status.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedDate ? record.date === selectedDate : true) // Only filter by date if one is selected
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date in descending order

    return (
        <div className="container mt-5 mb-4">
            <div className="card shadow-lg p-4">
                <div className="card-header bg-primary text-white text-center">
                    <h2>Admin Dashboard</h2>
                    <p className="mb-0">Manage Attendance and User Data</p>
                </div>

                <div className="card-body">
                    <h5 className="text-center mb-4">Attendance & User Data</h5>
                    <div className="d-flex justify-content-between mb-4">
                        <div className="me-2" style={{flex: 7}}>
                            {/* Search Input */}
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Name, Email, Organization, or Status"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div style={{flex: 3}}>
                            {/* Date Selector */}
                            <input
                                type="date"
                                className="form-control"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Display the attendance and user data in a table */}
                    <div className="table-responsive">
                        <table className="table table-hover table-striped table-bordered">
                            <thead className="table-dark">
                            <tr>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Organization</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredAttendanceData.length > 0 ? (
                                filteredAttendanceData.map((record, index) => (
                                    <tr key={index}>
                                        <td>{record.full_name}</td>
                                        <td>{record.email}</td>
                                        <td>{record.organization_name}</td>
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
                                    <td colSpan="5" className="text-center">No attendance records found.</td>
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
