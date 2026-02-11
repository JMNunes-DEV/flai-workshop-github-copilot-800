import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespace = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = codespace 
          ? `https://${codespace}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';
        
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutList = data.results || data;
        console.log('Processed workouts list:', workoutList);
        
        setWorkouts(workoutList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading workouts...
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

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-success';
      case 'intermediate':
        return 'bg-warning text-dark';
      case 'advanced':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">
        <i className="bi bi-lightning-fill me-2"></i>
        Workout Suggestions
      </h2>
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm border-dark">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0">
                  <i className="bi bi-fire me-2"></i>
                  {workout.name}
                </h5>
              </div>
              <div className="card-body">
                <p className="card-text">{workout.description}</p>
                <div className="mb-2">
                  <span className={`badge ${getDifficultyBadge(workout.difficulty)} me-2`}>
                    {workout.difficulty.toUpperCase()}
                  </span>
                  <span className="badge bg-info">{workout.workout_type}</span>
                </div>
                <p className="mb-1"><strong>Duration:</strong> {workout.duration} minutes</p>
                <p className="mb-0">
                  <strong>Target Muscles:</strong> {' '}
                  {Array.isArray(workout.target_muscles) 
                    ? workout.target_muscles.join(', ') 
                    : workout.target_muscles}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="alert alert-light mt-3" role="alert">
        <strong>Total Workouts:</strong> {workouts.length}
      </div>
    </div>
  );
}

export default Workouts;
