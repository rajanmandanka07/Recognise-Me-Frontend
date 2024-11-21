import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies  = new Cookies();
const ProtectedRouteUser = ({ element }) => {
    const UserId = cookies.get('userID'); // Get the token from cookies

    if (!UserId) {
        // If no token, redirect to Entry (or your login page)
        return <Navigate to="/attendance/user" />;
    }

    // If token exists, render the requested component
    return element;
};

export default ProtectedRouteUser;