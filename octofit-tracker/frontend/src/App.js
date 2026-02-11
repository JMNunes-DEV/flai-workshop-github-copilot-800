import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function Home() {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace 
    ? `https://${codespace}-8000.app.github.dev/api/`
    : 'http://localhost:8000/api/';

  return (
    <div className="container mt-5">
      <div className="jumbotron bg-light p-5 rounded">
        <h1 className="display-4 text-google-blue mb-3">
          <img 
            src="/octofitapp-small.png" 
            alt="OctoFit" 
            height="60" 
            className="me-3"
            style={{ verticalAlign: 'middle' }}
          />
          Welcome to OctoFit Tracker!
        </h1>
        <p className="lead text-google-green">
          <strong>Track your fitness journey</strong> with superhero teams, compete on the leaderboard, 
          and achieve your wellness goals!
        </p>
        <hr className="my-4" style={{ borderTop: '3px solid #4285F4' }} />
        <div className="row mt-4">
          <div className="col-md-3 mb-3">
            <div className="p-3 text-center bg-white rounded shadow-sm">
              <h3 className="text-google-blue">🏃</h3>
              <p className="mb-0"><strong>Activities</strong></p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="p-3 text-center bg-white rounded shadow-sm">
              <h3 className="text-google-red">🏆</h3>
              <p className="mb-0"><strong>Teams</strong></p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="p-3 text-center bg-white rounded shadow-sm">
              <h3 className="text-google-yellow">📊</h3>
              <p className="mb-0"><strong>Leaderboard</strong></p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="p-3 text-center bg-white rounded shadow-sm">
              <h3 className="text-google-green">💪</h3>
              <p className="mb-0"><strong>Workouts</strong></p>
            </div>
          </div>
        </div>
        <p className="mt-4">
          OctoFit Tracker is powered by <span className="text-google-blue"><strong>Django REST Framework</strong></span> and <span className="text-google-green"><strong>React</strong></span>. 
          Use the navigation menu above to explore all features.
        </p>
        <p className="text-muted small">
          <strong>API Backend:</strong> <code>{apiUrl}</code>
        </p>
        <div className="mt-4">
          <Link className="btn btn-primary btn-lg me-2 mb-2" to="/leaderboard" role="button">
            🏆 View Leaderboard
          </Link>
          <Link className="btn btn-success btn-lg mb-2" to="/workouts" role="button">
            💪 Get Workouts
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-google-blue">
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img 
                src="/octofitapp-small.png" 
                alt="OctoFit Logo" 
                height="40" 
                className="me-2"
              />
              <strong>OctoFit Tracker</strong>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-google-blue text-white text-center py-3 mt-5">
          <p className="mb-0">
            <strong>OctoFit Tracker</strong> © 2026 | Built with React & Django REST Framework
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
