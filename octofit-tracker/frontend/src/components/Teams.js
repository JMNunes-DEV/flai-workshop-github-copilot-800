import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const baseUrl = codespace 
    ? `https://${codespace}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  useEffect(() => {
    fetchTeams();
    fetchUsers();
  }, []);

  const fetchTeams = async () => {
    try {
      const apiUrl = `${baseUrl}/teams/`;
      console.log('Fetching teams from:', apiUrl);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Teams data received:', data);
      
      const teamList = data.results || data;
      console.log('Processed teams list:', teamList);
      
      setTeams(teamList);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const apiUrl = `${baseUrl}/users/`;
      console.log('Fetching users from:', apiUrl);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const userList = data.results || data;
      console.log('Users fetched:', userList);
      
      setUsers(userList);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleViewMembers = (team) => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedTeam(null);
  };

  const getTeamMembers = (teamId) => {
    return users.filter(user => user.team_id === teamId);
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading teams...
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

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">
        <i className="bi bi-shield-fill me-2"></i>
        OctoFit Teams
      </h2>
      <div className="row">
        {teams.map((team) => {
          const members = getTeamMembers(team.id);
          return (
            <div key={team.id} className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm border-primary">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-trophy-fill me-2"></i>
                    {team.name}
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{team.description}</p>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="mb-0">
                      <strong>Members:</strong>{' '}
                      <span className="badge bg-google-green">{members.length}</span>
                    </p>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleViewMembers(team)}
                    >
                      👥 View Members
                    </button>
                  </div>
                  <p className="text-muted small mb-0">
                    <i className="bi bi-calendar-check me-1"></i>
                    Created: {new Date(team.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="alert alert-light mt-3" role="alert">
        <strong>Total Teams:</strong> {teams.length}
      </div>

      {/* Team Members Modal */}
      {showModal && selectedTeam && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-google-blue text-white">
                <h5 className="modal-title">
                  <i className="bi bi-people-fill me-2"></i>
                  {selectedTeam.name} - Team Members
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                {getTeamMembers(selectedTeam.id).length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Joined</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getTeamMembers(selectedTeam.id).map((member) => (
                          <tr key={member.id}>
                            <td>
                              <strong>{member.name}</strong>
                            </td>
                            <td>{member.email}</td>
                            <td className="text-muted small">
                              {new Date(member.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="alert alert-info" role="alert">
                    <i className="bi bi-info-circle me-2"></i>
                    No members in this team yet.
                  </div>
                )}
                <div className="alert alert-light mb-0 mt-3" role="alert">
                  <strong>Total Members:</strong> {getTeamMembers(selectedTeam.id).length}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;
