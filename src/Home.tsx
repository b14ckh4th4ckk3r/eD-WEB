// src/Home.tsx
import React, {useEffect, useState} from 'react';
import './Home.css'
const Home: React.FC = () => {
  const title = "eD.WEB";
  const words = title.split(""); // Split the word into individual letters
  const [flickerActive, setFlickerActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlickerActive((prev) => !prev); // Toggle flickering every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);
  const getRandomSpeed = () => Math.random() * 2 + 0.5; // Random speed between 0.5s to 2.5s
  const getRandomDelay = () => Math.random() * 3; // Random delay between 0s to 3s

  return (
    
    <div className="background">
      <div className="scattered-letters">
        <span>A</span><span>PLACE</span><span>WHERE</span><span>YOU</span><span>CODE</span><span>EFFICIENTLY</span>
      </div>
      <main className="main-content">
        <div className={`title ${flickerActive ? "flicker-active" : "flicker-paused"}`}>
        {words.map((char, index) => (
            <span
              key={index}
              className="flicker-random"
              style={{
                '--random-speed': getRandomSpeed(),
                '--random-delay': getRandomDelay(),
              } as React.CSSProperties} // Apply random values for each letter
            >
              {char}
            </span>
          ))}
        </div>
        {/* You can uncomment the tagline below if you want to display it */}
        {/* <p className="tagline">A Creative web Studio, that loves to make you look good</p> */}
        <button className="about-button">About Us</button>
      </main>
    </div>
  );
};

export default Home;
