import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="header">
        <div className="logo">eD.WEB</div>
        <nav>
          <ul>
            <li><a href="#services">Problem Set</a></li>
            <li><a href="#portfolio">Login</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <div className="background">
        <div className="scattered-letters">
          <span>A</span><span>PLACE</span><span>WHERE</span><span>YOU</span><span>CODE</span><span>EFFICIENTLY</span>
        </div>
        <main className="main-content">
          <div className="title">eD.WEB</div>
          {/* <p className="tagline">A Creative web Studio, that loves to make you look good</p> */}
          <button className="about-button">About Us</button>
        </main>
      </div>

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
    </div>
  );
};

export default App;

