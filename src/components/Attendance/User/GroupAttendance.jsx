import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";

const GroupAttendance = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [croppedFaces, setCroppedFaces] = useState([]); // To store cropped face images
    const [attendance, setAttendance] = useState({}); // To store user IDs and names
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            toast.error("Please select a file before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        setIsLoading(true);
        setCroppedFaces([]); // Reset the faces array before new request
        setAttendance({}); // Reset attendance data

        try {
            const response = await axios.post("http://localhost:5000/api/mark_group_attendance", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                toast.success("Attendance marked successfully!");
                // Set cropped faces and attendance data from response
                setCroppedFaces(response.data.cropped_faces);
                setAttendance(response.data.attendance);
            } else {
                toast.error(response.data.message || "Failed to mark attendance.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to mark attendance. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToDashboard = () => {
        navigate('/attendance/admin/admin-dashboard');
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white text-center">
                            <h3>Group Attendance</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 text-center">
                                    <label htmlFor="groupPhoto" className="form-label">
                                        <strong>Upload Group Photo</strong>
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="groupPhoto"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                {preview && (
                                    <div className="mb-4 text-center">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="img-thumbnail"
                                            style={{maxHeight: "200px"}}
                                        />
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Processing..." : "Mark Attendance"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Render cropped faces */}
                    {croppedFaces.length > 0 && (
                        <div className="mt-4">
                            <h5 className="text-center">(Testing) Identified Faces:</h5>
                            <div className="d-flex flex-wrap justify-content-center">
                                {croppedFaces.map((face, index) => (
                                    <div key={index} className="m-2">
                                        <img
                                            src={`data:image/jpeg;base64,${face}`}
                                            alt={`Cropped Face ${index + 1}`}
                                            className="img-thumbnail"
                                            style={{maxWidth: "150px", maxHeight: "150px"}}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Render attendance information */}
                    {Object.keys(attendance).length > 0 && (
                        <div className="mt-4">
                            <h5 className="text-center">(Testing) Attendance Marked:</h5>
                            <ul className="list-group">
                                {Object.entries(attendance).map(([userId, fullName]) => (
                                    <li key={userId} className="list-group-item">
                                        <strong>User ID:</strong> {userId} <br/>
                                        <strong>Full Name:</strong> {fullName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="d-flex justify-content-center m-3">
                    <button className="btn btn-secondary" onClick={handleBackToDashboard}>
                        Back to Admin Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupAttendance;
