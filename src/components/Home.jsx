import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center max-vh-100">
            <h1 className="display-4 mb-4 text-primary">Face Recognition System</h1>
            <h2 className="text-muted mb-5">Select an Option</h2>
            <div className="row justify-content-center">
                {/* Card for Attendance System */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-lg border-0">
                        <div className="card-body text-center">
                            <h5 className="card-title mb-3">Attendance System</h5>
                            <p className="card-text text-muted">Manage and track attendance using advanced facial recognition technology.</p>
                            <Link to="/attendance" className="btn btn-primary">
                                Go to Attendance
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Card for Segregation */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-lg border-0">
                        <div className="card-body text-center">
                            <h5 className="card-title mb-3">Segregation</h5>
                            <p className="card-text text-muted">Leverage facial recognition to perform user-based segregation for personalized tasks.</p>
                            <Link to="/segregation" className="btn btn-secondary">
                                Go to Segregation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
