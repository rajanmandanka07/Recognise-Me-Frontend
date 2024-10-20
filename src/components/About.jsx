import { FaCheckCircle, FaCogs, FaDatabase, FaLaptopCode, FaUserShield } from 'react-icons/fa';
import logo from '../assets/Main Logo.png'; // Adjust the path based on your project structure

const About = () => {
    return (
        <div className="container m-4">
            <div className="card shadow-lg p-4">
                {/* Card Header */}
                <div className="card-header bg-primary text-white text-center">
                    <h2>About Recognise Me</h2>
                </div>

                {/* Card Body */}
                <div className="card-body">
                    {/* Logo and Project Title */}
                    <div className="text-center mb-4">
                        <img
                            src={logo}
                            alt="Recognise Me Logo"
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                        <h4>Recognise Me</h4>
                        <p className="text-muted">Facial Recognition-Powered Attendance Solution</p>
                    </div>

                    {/* Project Overview */}
                    <h5 className="text-primary mt-4">Project Overview</h5>
                    <p className="mb-4">
                        Recognise Me is an advanced attendance management system that leverages facial recognition technology to automate and streamline the process of recording attendance. Designed for educational institutions and organizations, Recognise Me ensures accurate and efficient tracking of attendance, reducing manual errors and saving valuable time.
                    </p>

                    {/* Key Features */}
                    <h5 className="text-primary mt-4">Key Features</h5>
                    <ul className="list-group mb-4">
                        <li className="list-group-item d-flex align-items-center">
                            <FaCheckCircle className="text-success me-3" />
                            <strong>Facial Recognition-Based Attendance:</strong> Automatically recognize and record attendance using facial features.
                        </li>
                        <li className="list-group-item d-flex align-items-center">
                            <FaUserShield className="text-success me-3" />
                            <strong>Secure User Authentication:</strong> Ensure only authorized users can access and manage attendance records.
                        </li>
                        <li className="list-group-item d-flex align-items-center">
                            <FaCogs className="text-success me-3" />
                            <strong>Admin Dashboard:</strong> Manage and monitor attendance records with ease through an intuitive dashboard.
                        </li>
                        <li className="list-group-item d-flex align-items-center">
                            <FaLaptopCode className="text-success me-3" />
                            <strong>User Registration with Photo Capture:</strong> Seamlessly register users by capturing multiple facial images for accurate recognition.
                        </li>
                    </ul>

                    {/* Technologies Used */}
                    <h5 className="text-primary mt-4">Technologies Used</h5>
                    <div className="d-flex flex-wrap">
                        <span className="badge bg-info text-white me-2 mb-2">
                            <FaLaptopCode className="me-1" /> React.js (Frontend)
                        </span>
                        <span className="badge bg-warning text-dark me-2 mb-2">
                            <FaCogs className="me-1" /> Flask (Backend)
                        </span>
                        <span className="badge bg-success text-white me-2 mb-2">
                            <FaDatabase className="me-1" /> MySQL (Database)
                        </span>
                        <span className="badge bg-danger text-white me-2 mb-2">
                            <FaUserShield className="me-1" /> MediaPipe & OpenCV (Face Recognition)
                        </span>
                        <span className="badge bg-secondary text-white me-2 mb-2">
                            <FaCheckCircle className="me-1" /> Bootstrap (Styling)
                        </span>
                    </div>

                    {/* Application Details */}
                    <h5 className="text-primary mt-4">Application Details</h5>
                    <p>
                        Recognise Me utilizes cutting-edge facial recognition algorithms to provide a reliable and efficient attendance system. By capturing multiple facial images during user registration, the system ensures high accuracy in recognizing and recording attendance. The admin dashboard offers comprehensive tools for monitoring attendance records, generating reports, and managing user data securely.
                    </p>
                    <p>
                        The application is designed with scalability and security in mind, making it suitable for various organizational sizes and ensuring data integrity. With an intuitive user interface and robust backend infrastructure, Recognise Me stands as a dependable solution for modern attendance management needs.
                    </p>

                    {/* Contributors */}
                    <h5 className="text-primary mt-4">Contributors</h5>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <strong>Rajankumar Mandanka:</strong> Project Lead & Backend Development
                        </li>
                        <li className="list-group-item">
                            <strong>Hitest Rabadiya:</strong> Frontend Development & UI/UX Design
                        </li>
                        <li className="list-group-item">
                            <strong>Rushi Lukka:</strong> Database Management & Integration
                        </li>
                    </ul>
                </div>

                {/* Card Footer */}
                <div className="card-footer text-center">
                    <p className="text-muted mb-0">Developed by Rajankumar Mandanka, Hitest Rabadiya, and Rushi Lukka</p>
                    <p className="text-muted">Rajkot, Gujarat, India</p>
                </div>
            </div>
        </div>
    );
};

export default About;
