
const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start">
            <div className="container p-3">
                <div className="row">
                    {/* About Section */}
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">About Us</h5>
                        <p>
                            Welcome to Recognise Me, a facial recognition-based platform for secure attendance management and segregation features. feel free to contact us!
                        </p>

                    </div>

                     {/*Social Media Section*/}
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Follow Us</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="https://facebook.com" className="text-dark">Facebook</a>
                            </li>
                            <li>
                                <a href="https://linkedin.com" className="text-dark">LinkedIn</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info Section */}
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Contact</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="mailto:support@example.com" className="text-dark">admin@recogniseme.com</a>
                            </li>
                            <li>
                                <p className="text-dark">+91 8866720805</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2024 Your Company. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
