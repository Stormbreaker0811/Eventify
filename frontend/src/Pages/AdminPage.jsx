import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AdminPage.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons from react-icons

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="section-content">
            <h2>Dashboard</h2>
            <div className="dashboard-cards">
              <div className="card">
                <h3>Live Users</h3>
                <p>123</p>
              </div>
              <div className="card">
                <h3>Revenue Today</h3>
                <p>$456</p>
              </div>
              <div className="card">
                <h3>Total Users</h3>
                <p>789</p>
              </div>
            </div>
          </div>
        );
      case 'event-review':
        return (
          <div className="section-content">
            <h2>Event Review</h2>
            <table className="event-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Event Name</th>
                  <th>Organizer</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Concert</td>
                  <td>John Doe</td>
                  <td>2024-06-21</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Comedy Show</td>
                  <td>Jane Smith</td>
                  <td>2024-07-15</td>
                  <td>Approved</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'list-users':
        return (
          <div className="section-content">
            <h2>List of Users</h2>
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Alice</td>
                  <td>alice@example.com</td>
                  <td>User</td>
                  <td>
                    <FaEdit className="icon edit-icon" />
                    <FaTrashAlt className="icon delete-icon" />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Bob</td>
                  <td>bob@example.com</td>
                  <td>User</td>
                  <td>
                    <FaEdit className="icon edit-icon" />
                    <FaTrashAlt className="icon delete-icon" />
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Charlie</td>
                  <td>charlie@example.com</td>
                  <td>Admin</td>
                  <td>
                    <FaEdit className="icon edit-icon" />
                    <FaTrashAlt className="icon delete-icon" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'admin-profile':
        return (
          <div className="section-content">
            <h2>Admin Profile</h2>
            <div className="profile-details">
              <p><strong>Name:</strong> Admin Name</p>
              <p><strong>Email:</strong> admin@example.com</p>
              <p><strong>Role:</strong> Administrator</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-page-container">
      <div className="sidebar">
        <h1>Admin Panel</h1>
        <button onClick={() => setActiveSection('dashboard')} className={`sidebar-button ${activeSection === 'dashboard' ? 'active' : ''}`}>Dashboard</button>
        <button onClick={() => setActiveSection('event-review')} className={`sidebar-button ${activeSection === 'event-review' ? 'active' : ''}`}>Event Review</button>
        <button onClick={() => setActiveSection('list-users')} className={`sidebar-button ${activeSection === 'list-users' ? 'active' : ''}`}>List of Users</button>
        <button onClick={() => setActiveSection('admin-profile')} className={`sidebar-button ${activeSection === 'admin-profile' ? 'active' : ''}`}>Admin Profile</button>
        <button className="sidebar-button logout">Log out</button>
      </div>
      <div className="content">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminPage;
