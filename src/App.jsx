import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Attendance from './components/Attendance/Attendance.jsx';
import Segregation from './components/Segregation/Segregation.jsx';
import Home from './components/Home';
import UserLogin from './components/Attendance/User/UserLogin.jsx';
import AdminLogin from './components/Attendance/Admin/AdminLogin.jsx';
import UserDashboard from "./components/Attendance/User/UserDashboard.jsx";
import AdminDashboard from "./components/Attendance/Admin/AdminDashboard.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import UserRegistration from "./components/Attendance/User/UserRegistration.jsx";
import TakeAttendance from "./components/Attendance/User/TakeAttendance.jsx";
import AdminPanel from "./components/Attendance/Admin/AdminPanel.jsx";
import About from "./components/About.jsx";
import GroupAttendance from "./components/Attendance/User/GroupAttendance.jsx";
// import ProtectedRouteUser from "./Authencation/ProtectedRouteUser.jsx";
// import ProtectedRouteAdmin from "./Authencation/ProtectedRouteAdmin.jsx";

function App() {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                {/* Header */}
                < Navbar />

                {/* Main content area */}
                <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                    <div className="container text-center">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/attendance" element={<Attendance />} />
                            <Route path="/attendance/user" element={<UserLogin />} /> {/* User Route */}
                            {/*<Route path="/attendance/user/user-dashboard" element={ <ProtectedRouteUser element={<UserDashboard />} />} />*/}
                            {/*<Route path="/attendance/user/user-ragistration" element={ <ProtectedRouteAdmin element={< UserRegistration />} /> } />*/}
                            {/*<Route path="/attendance/user/take-attendance" element={<ProtectedRouteAdmin element={< TakeAttendance /> } />} />*/}
                            {/*<Route path="/attendance/user/group-attendance" element={<ProtectedRouteAdmin element={<GroupAttendance />} /> } />*/}
                            <Route path="/attendance/user/user-dashboard" element={<UserDashboard />} />
                            <Route path="/attendance/user/user-ragistration" element={<UserRegistration />} />
                            <Route path="/attendance/user/take-attendance" element={<TakeAttendance />} />
                            <Route path="/attendance/user/group-attendance" element={<GroupAttendance />} />
                            <Route path="/attendance/admin" element={<AdminLogin />} />
                            {/*<Route path="/attendance/admin/admin-dashboard" element={ <ProtectedRouteAdmin element={<AdminDashboard />} />} />*/}
                            {/*<Route path="/attendance/admin/admin-panel" element={<ProtectedRouteAdmin element={<AdminPanel/>} /> } />*/}
                            <Route path="/attendance/admin/admin-dashboard" element={<AdminDashboard />} />
                            <Route path="/attendance/admin/admin-panel" element={<AdminPanel />} />
                            <Route path="/segregation" element={<Segregation />} />
                        </Routes>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
