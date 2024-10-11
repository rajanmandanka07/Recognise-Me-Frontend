# Recognise Me - Frontend

This is the frontend repository for the **Recognise Me** project. It provides an interface for user registration, attendance capture, and other interactions. The frontend is built using **React**, **Vite**, and **JavaScript**, with **Bootstrap** for styling.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributors](#contributors)
- [License](#license)

## Features

- **User Registration**: Allows users to register by entering their details and capturing a photo via the webcam.
- **Take Attendance**: The admin can capture user images and mark attendance using facial recognition.
- **Webcam Integration**: Capture images for registration and attendance using the webcam.
- **Responsive Design**: A mobile-friendly, responsive UI using Bootstrap.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast development build tool.
- **JavaScript**: Programming language for the frontend logic.
- **Bootstrap**: For responsive styling.
- **Axios**: For making HTTP requests to the backend API.

## Usage

- **User Registration**: Navigate to the registration page, fill in the details, and capture the photo using the webcam.
- **Take Attendance**: Admins can use the 'Take Attendance' feature to capture images for attendance marking.

## Project Structure

The key folders and files in the frontend project are:
```
├── public/
│   ├── Recognise Me.png       # Publicly available logo
│
├── src/
│   ├── assets/                # Application assets like logos
│   │   ├── Main Logo.png
│   │   └── Recognise Me.png
│   ├── components/            # Main components of the app
│   │   ├── Attendance/
│   │   │   ├── Admin/
│   │   │   │   ├── Admin.jsx
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminLogin.jsx
│   │   │   │   └── AdminPanel.jsx
│   │   │   ├── User/
│   │   │   │   ├── TakeAttendance.jsx
│   │   │   │   ├── UserDashboard.jsx
│   │   │   │   ├── UserLogin.jsx
│   │   │   │   └── UserRegistration.jsx
│   │   │   └── Attendance.jsx
│   │   ├── Segregation/
│   │   │   └── Segregation.jsx
│   │   ├── About.jsx
│   │   ├── Footer.jsx
│   │   ├── Home.jsx
│   │   ├── Navbar.jsx
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # Entry point for the React app
│
├── .gitignore                 # Git ignore file
├── eslint.config.js           # Linter configuration
├── index.html                 # Main HTML file
├── package.json               # Project dependencies and scripts
├── package-lock.json          # Detailed dependency tree
├── README.md                  # Project README file
└── vite.config.js             # Vite configuration
```

## Contributors

This project is maintained by:

- **Rajankumar Mandanka**
- **Hitest Rabadiya**
- **Rushi Lukka**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
