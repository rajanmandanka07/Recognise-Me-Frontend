import React, { useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from "react-router-dom";

const TakeAttendance = () => {
    const [image, setImage] = useState(null);
    const [isCaptured, setIsCaptured] = useState(false);
    const [attendanceStatus, setAttendanceStatus] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);  // To track if the message is success or error
    const webcamRef = React.useRef(null);
    const navigate = useNavigate();

    const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        setIsCaptured(true); // Stop camera and show image
    };

    const retakePhoto = () => {
        setImage(null);
        setIsCaptured(false); // Reset to allow retake
    };

    const submitAttendance = async () => {
        try {
            const data = {
                image: image, // Send the captured image as base64
            };

            const response = await axios.post('http://localhost:5000/api/compare_faces', data);
            if (response.status === 200) {
                const userName = response.data.user_name;
                setAttendanceStatus(`Attendance marked as Present for ${userName}`);
                setIsSuccess(true); // Mark message as success
            } else {
                setAttendanceStatus('No matching face found.');
                setIsSuccess(false); // Mark message as error
            }
        } catch (error) {
            setAttendanceStatus(`Error: ${error.response.data.error}`);
            setIsSuccess(false); // Mark message as error
        }

        // Clear the message after 2 seconds
        setTimeout(() => {
            setAttendanceStatus('');
            setImage(null);
            setIsCaptured(false);
        }, 2000);
    };

    const handleBackToDashboard = () => {
        navigate('/attendance/admin/admin-dashboard'); // Navigate back to the dashboard
    };

    return (
        <div className="container mt-4 d-flex justify-content-center align-items-center flex-column">
            {/* Camera Section */}
            <div className="card shadow-lg p-4 d-flex justify-content-center align-items-center" style={{ width: '45%' }}>
                <h2 className="text-center mb-4">Take Attendance</h2>
                <div className="text-center">
                    {!isCaptured ? (
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="rounded-circle"
                            style={{
                                width: '300px',
                                height: '300px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                        />
                    ) : (
                        <img
                            src={image}
                            alt="Captured"
                            className="rounded-circle"
                            style={{
                                width: '300px',
                                height: '300px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                        />
                    )}
                </div>
                {!isCaptured ? (
                    <button className="btn btn-primary w-100 mt-4" onClick={capturePhoto}>
                        Capture Photo
                    </button>
                ) : (
                    <>
                        <button className="btn btn-secondary w-100 mt-4" onClick={retakePhoto}>
                            Retake Photo
                        </button>
                        <button className="btn btn-success w-100 mt-4" onClick={submitAttendance}>
                            Submit Attendance
                        </button>
                    </>
                )}
            </div>

            {/* Attendance Status */}
            {attendanceStatus && (
                <div className={`mt-4 alert ${isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {attendanceStatus}
                </div>
            )}

            {/* Back to Dashboard button */}
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-secondary" onClick={handleBackToDashboard}>
                    Back to Admin Dashboard
                </button>
            </div>
        </div>
    );
};

export default TakeAttendance;
