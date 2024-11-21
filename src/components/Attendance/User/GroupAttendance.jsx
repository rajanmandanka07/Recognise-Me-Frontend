import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GroupAttendance = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
        formData.append("groupPhoto", selectedFile);

        setIsLoading(true);

        try {
            const response = await axios.post("/api/mark_group_attendance", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Attendance marked successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to mark attendance. Please try again.");
        } finally {
            setIsLoading(false);
        }
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
                                            style={{ maxHeight: "200px" }}
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
                </div>
            </div>
        </div>
    );
};

export default GroupAttendance;
