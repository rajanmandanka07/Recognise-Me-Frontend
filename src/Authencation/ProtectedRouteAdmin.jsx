import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies  = new Cookies();
// eslint-disable-next-line react/prop-types
const ProtectedRouteAdmin = ({ element }) => {
    const AdminId = cookies.get('AdminID');
    console.log(AdminId);

    if (!AdminId) {
        return <Navigate to="/attendance/admin" />;
    }

    // If token exists, render the requested component
    return element;
};

export default ProtectedRouteAdmin;