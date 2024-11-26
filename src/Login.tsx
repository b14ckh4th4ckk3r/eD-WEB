import React, { useState } from 'react';
import './Login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  auth,
  googleProvider,
  facebookProvider,
  twitterProvider,
} from './firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Set persistence to local (keeps users logged in across sessions)
  React.useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.error('Persistence error:', error);
    });
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in user:', userCredential.user);
        setMessage(`Welcome back, ${userCredential.user.email}!`);
        setEmail('');
        setPassword('');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Registered user:', userCredential.user);
        setMessage(`Account created successfully! Welcome, ${userCredential.user.email}`);
        setEmail('');
        setPassword('');
      }
    } catch (error: any) {
      console.error('Error:', error);
      setMessage(error.message || 'An error occurred. Please try again.');
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'twitter') => {
    let authProvider;

    switch (provider) {
      case 'google':
        authProvider = googleProvider;
        break;
      case 'facebook':
        authProvider = facebookProvider;
        break;
      case 'twitter':
        authProvider = twitterProvider;
        break;
      default:
        return;
    }

    try {
      const result = await signInWithPopup(auth, authProvider);
      const user = result.user;
      setMessage(`Welcome, ${user.displayName || user.email || 'user'}!`);
      console.log('Social login user:', user);
    } catch (error: any) {
      console.error('Authentication error:', error);
      setMessage(error.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <div className="login-page" >
      <div className={`wrapper ${isLogin ? '' : 'active'}`}>
        <div className="rotate-bg"></div>
        <div className="rotate-bg2"></div>

        {/* Login Form */}
        <div className={`form-box login ${isLogin ? '' : 'inactive'}`}>
          <div className="animation">
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="input-box">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Email</label>
                <i className="fas fa-envelope"></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label>Password</label>
                <i className="fas fa-lock"></i>
              </div>
              <button type="submit">Login</button>
            </form>
            <div className="status-message">
          {message && <p>{message}</p>}
        </div>

            <div className="social-buttons">
              <button
                className="social-button google"
                onClick={() => handleSocialLogin('google')}
              >
                <i className="fab fa-google"></i>
              </button>
              <button
                className="social-button facebook"
                onClick={() => handleSocialLogin('facebook')}
              >
                <i className="fab fa-facebook"></i>
              </button>
              <button
                className="social-button twitter"
                onClick={() => handleSocialLogin('twitter')}
              >
                <i className="fab fa-twitter"></i>
              </button>
            </div>

            <div className="linkTxt">
              <p>
                Don't have an account?{' '}
                <a onClick={() => setIsLogin(false)}>Sign Up</a>
              </p>
            </div>
          </div>
        </div>

        {/* Register Form */}
        <div className={`form-box register ${isLogin ? 'inactive' : ''}`}>
          <div className="animation">
            <h2>Register</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="input-box">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Email</label>
                <i className="fas fa-envelope"></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label>Password</label>
                <i className="fas fa-lock"></i>
              </div>
              <button type="submit">Sign Up</button>
            </form>
            <div className="status-message">
          {message && <p>{message}</p>}
        </div>
            <div className="social-buttons">
              <button
                className="social-button google"
                onClick={() => handleSocialLogin('google')}
              >
                <i className="fab fa-google"></i>
              </button>
              <button
                className="social-button facebook"
                onClick={() => handleSocialLogin('facebook')}
              >
                <i className="fab fa-facebook"></i>
              </button>
              <button
                className="social-button twitter"
                onClick={() => handleSocialLogin('twitter')}
              >
                <i className="fab fa-twitter"></i>
              </button>
            </div>

            <div className="linkTxt">
              <p>
                Already have an account?{' '}
                <a onClick={() => setIsLogin(true)}>Login</a>
              </p>
            </div>
          </div>
        </div>

        {/* Info Text */}
        <div className={`info-text ${isLogin ? 'login' : 'register'}`}>
          <div className="animation">
            {isLogin ? (
              <>
                <h2>Welcome Back!</h2>
                <p>
                  Login to access your account and continue where you left off.
                </p>
              </>
            ) : (
              <>
                <h2>Join Us Today!</h2>
                <p>
                  Create an account to be a part of our amazing community!
                </p>
              </>
            )}
          </div>
        </div>

        {/* Message Display */}

      </div>
    </div>
  );
};

export default Login;
