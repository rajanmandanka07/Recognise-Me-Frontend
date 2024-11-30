import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserRegistration = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [organizationId, setOrganizationId] = useState('');
    const [images, setImages] = useState([]); // To store 10 photos
    const [isCaptured, setIsCaptured] = useState(false);
    const [capturing, setCapturing] = useState(false); // To manage the photo capture process
    const navigate = useNavigate();
    const webcamRef = React.useRef(null);

    // Function to capture 10 photos with a delay
    const capturePhotos = async () => {
        setCapturing(true);
        const capturedImages = [];

        for (let i = 0; i < 10; i++) {
            const imageSrc = webcamRef.current.getScreenshot();
            // const imageSrc = temp;
            capturedImages.push(imageSrc);

            // Delay between each capture (e.g., 0.1 second)
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        setImages(capturedImages);
        setIsCaptured(true); // Stop camera and show images
        setCapturing(false); // Stop capturing after 10 photos
    };

    const retakePhotos = () => {
        setImages([]);
        setIsCaptured(false); // Reset to allow retake
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const admin = JSON.parse(localStorage.getItem('admin'));
        const adminId = admin?.admin_id; // Retrieve admin_id from localStorage

        const data = {
            full_name: fullName,
            email: email,
            password: password,
            organization_id: parseInt(organizationId),
            admin_id: adminId,
            images: images // Send the array of images (10 photos)
        };

        try {
            const response = await axios.post('http://localhost:5000/api/register_user', data);
            if (response.status === 201) {
                // Show success toast
                toast.success('User registered successfully!');
                clearForm(); // Clear form fields
            }
        } catch (error) {
            // Show error toast
            toast.error('Error: ' + (error.response?.data.error || 'Unknown error'));
        }
    };

    const clearForm = () => {
        // Clear all form fields and captured photos
        setFullName('');
        setEmail('');
        setPassword('');
        setOrganizationId('');
        setImages([]);
        setIsCaptured(false);
    };

    const handleBackToDashboard = () => {
        navigate('/attendance/admin/admin-dashboard'); // Navigate back to the dashboard
    };

    return (
        <div className="max-vh-100">
            {/* Toast container */}
            <ToastContainer />

            <div className="container mt-5 d-flex justify-content-between">
                {/* User Registration Section */}
                <div className="card shadow-lg p-4" style={{ width: '45%' }}>
                    <h2 className="text-center mb-4">User Registration</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter a secure password"
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label className="form-label">Organization ID</label>
                            <input
                                type="number"
                                className="form-control"
                                value={organizationId}
                                onChange={(e) => setOrganizationId(e.target.value)}
                                placeholder="Enter your organization ID"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100 mt-3" disabled={!isCaptured}>
                            Register User
                        </button>
                    </form>
                </div>

                {/* Camera Section */}
                <div className="card shadow-lg p-4 d-flex justify-content-center align-items-center" style={{ width: '45%' }}>
                    <h2 className="text-center mb-4">Capture Photos</h2>
                    <div className="text-center">
                        {!isCaptured ? (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                mirrored={true}
                                className="rounded-circle"
                                style={{
                                    width: '300px',
                                    height: '300px',
                                    borderRadius: '50%', // Ensure a perfect circle
                                    objectFit: 'cover', // Ensures the video fits well within the circle
                                }}
                            />
                        ) : (
                            <div>
                                <img
                                    src={images[0]} // Show the first captured image
                                    alt="Captured"
                                    className="rounded-circle"
                                    style={{
                                        width: '300px',
                                        height: '300px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                    }}
                                />
                                <p className="mt-3">Captured photos</p>
                            </div>
                        )}
                    </div>
                    {!isCaptured ? (
                        <button className="btn btn-primary w-100 mt-4" onClick={capturePhotos} disabled={capturing}>
                            {capturing ? 'Capturing...' : 'Capture Photos'}
                        </button>
                    ) : (
                        <button className="btn btn-secondary w-100 mt-4" onClick={retakePhotos}>
                            Retake Photos
                        </button>
                    )}
                </div>
            </div>

            {/* Back to Dashboard button */}
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-secondary" onClick={handleBackToDashboard}>
                    Back to Admin Dashboard
                </button>
            </div>
        </div>
    );
};

export default UserRegistration;
