import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

const TakeAttendance = () => {
    const [capturedImages, setCapturedImages] = useState([]);
    const [attendanceStatus, setAttendanceStatus] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const webcamRef = useRef(null);
    const navigate = useNavigate();
    let intervalRef = useRef(null);

    const captureAndSubmitAttendance = async () => {
        try {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log("Captured Image:", imageSrc); // Log the base64 image

            if (imageSrc) {
                setCapturedImages((prevImages) => [...prevImages, imageSrc]);

                const data = { image: imageSrc };

                const response = await axios.post('http://localhost:5000/api/compare_faces', data);
                console.log("Response:", response);

                if (response.status === 200) {
                    setAttendanceStatus(response.data.message);
                    setIsSuccess(true);
                    setShowToast(true);
                    stopAttendanceProcess();
                } else {
                    setAttendanceStatus('No matching face found. Retrying...');
                    setIsSuccess(false);
                    setShowToast(true);
                }
            } else {
                setAttendanceStatus('Error capturing image.');
                setIsSuccess(false);
                setShowToast(true);
            }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setAttendanceStatus('Error during attendance. Please try again.');
            setIsSuccess(false);
            setShowToast(true);
        }
    };

    const startAttendanceProcess = () => {
        setIsProcessing(true);

        intervalRef.current = setInterval(() => {
            captureAndSubmitAttendance();
        }, 5000);
    };

    const stopAttendanceProcess = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsProcessing(false);
    };

    const handleBackToDashboard = () => {
        navigate('/attendance/admin/admin-dashboard');
    };

    useEffect(() => {
        if (showToast) {
            const timeout = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [showToast]);

    return (
        <div className="container mt-4 d-flex justify-content-center align-items-center flex-column">
            <div className="card shadow-lg p-4 d-flex justify-content-center align-items-center" style={{ width: '45%', position: 'relative' }}>
                <h2 className="text-center mb-4">Take Attendance</h2>
                <div className="text-center">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        mirrored={true}
                        className="rounded-circle"
                        style={{
                            width: '300px',
                            height: '300px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                    />
                </div>

                {!isProcessing ? (
                    <button className="btn btn-primary w-100 mt-4" onClick={startAttendanceProcess}>
                        Start Attendance
                    </button>
                ) : (
                    <button className="btn btn-danger w-100 mt-4" onClick={stopAttendanceProcess}>
                        Stop Attendance
                    </button>
                )}
            </div>

            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-secondary" onClick={handleBackToDashboard}>
                    Back to Admin Dashboard
                </button>
            </div>

            {showToast && (
                <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
                    <div className={`toast show ${isSuccess ? 'bg-success' : 'bg-danger'} text-white`} role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="d-flex">
                            <div className="toast-body">
                                {attendanceStatus}
                            </div>
                            <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Close" onClick={() => setShowToast(false)}></button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4">
                <h4>Captured Images (for Testing):</h4>
                <div className="d-flex flex-wrap">
                    {capturedImages.map((imgSrc, index) => (
                        <div key={index} className="p-2">
                            <img
                                src={imgSrc}
                                alt={`Captured ${index}`}
                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TakeAttendance;
