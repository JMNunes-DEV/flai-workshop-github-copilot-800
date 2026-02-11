import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespace = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = codespace 
          ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
          : 'http://localhost:8000/api/leaderboard/';
        
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardList = data.results || data;
        console.log('Processed leaderboard list:', leaderboardList);
        
        setLeaderboard(leaderboardList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading leaderboard...
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  const getRankBadge = (rank) => {
    if (rank === 1) return 'bg-warning text-dark';
    if (rank === 2) return 'bg-secondary';
    if (rank === 3) return 'bg-danger';
    return 'bg-primary';
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">
        <i className="bi bi-trophy me-2"></i>
        Fitness Leaderboard
      </h2>
      <div className="table-responsive shadow-sm">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Total Points</th>
              <th>Activities</th>
              <th>Total Duration (min)</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry.id}>
                <td>
                  <span className={`badge ${getRankBadge(entry.rank)}`}>
                    #{entry.rank}
                  </span>
                </td>
                <td><strong>{entry.user_name}</strong></td>
                <td>{entry.team_name || 'N/A'}</td>
                <td><strong>{entry.total_points}</strong></td>
                <td>{entry.total_activities}</td>
                <td>{entry.total_duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="alert alert-light mt-3" role="alert">
        <strong>Total Participants:</strong> {leaderboard.length}
      </div>
    </div>
  );
}

export default Leaderboard;
