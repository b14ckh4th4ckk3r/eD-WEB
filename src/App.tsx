import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Login'; // Import the Login component
import Home from './Home';
import ProblemSet from './ProblemSet';
import ProblemSolve from './SolveProblem';
import AddProblem from './AddProblem';

const App: React.FC = () => {
  // Custom hook to access the current route
  const location = useLocation();

  // Determine if the current route is the login page
  const pageClass = location.pathname.replace('/', '') || 'home';

  return (
    <div className={`App ${pageClass}`}>
      <header className={`header ${pageClass}-header`}>
        <div className="logo"><a href="/">eD.WEB</a></div>
        <nav>
          <ul>
            <li><a href="/problem-set">Problem Set</a></li>
            <li><a href="/login">Login</a></li> {/* Link to the login page */}
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="/add-problem">Add problem</a></li>
          </ul>
        </nav>
      </header>

      {/* Set up routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/problem-set" element={<ProblemSet />} />
        <Route path="/solve/:id" element={<ProblemSolve />} />
        <Route path="/add-problem" element={<AddProblem />} />
      </Routes>

      {/* Show footer only on the home page */}
      {location.pathname === "/" && (
        <footer className="footer">
          <div className="social-links">
            <a href="https://www.instagram.com" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.x.com" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </footer>
      )}
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
