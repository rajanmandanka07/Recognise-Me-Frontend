import {Link} from "react-router-dom";

const Segregation = () => {
    return (
        <div className="text-center">
            <h2>Segregation</h2>
            {/* Add your dashboard logic and UI here */}
            <p>Welcome to the Segregation!</p>
            {/* Back button */}
            <div className="mt-4">
                <Link to="/attendance" className="btn btn-secondary">
                    Back to Attendance
                </Link>
            </div>
        </div>

    );
};

export default Segregation;
