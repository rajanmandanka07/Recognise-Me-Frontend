import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies  = new Cookies();
const ProtectedRouteAdmin = ({ element }) => {
    const AdminId = cookies.get('AdminID'); // Get the token from cookies

    if (!AdminId) {
        // If no token, redirect to Entry (or your login page)
        return <Navigate to="/attendance/admin" />;
    }

    // If token exists, render the requested component
    return element;
};

export default ProtectedRouteAdmin;