import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [education, setEducation] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/students/${id}`)
      .then(response => {
        setFirstname(response.data.firstname);
        setLastname(response.data.lastname);
        setLocation(response.data.location);
        setEmail(response.data.email);
        setDob(response.data.dob);
        setEducation(response.data.education);
      })
      .catch(error => {
        console.error('There was an error fetching the student data!', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/students/${id}`, { firstname, lastname, location, email, dob, education })
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error updating the student!', error);
      });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Update Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Firstname</label>
          <input type="text" className="form-control" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Lastname</label>
          <input type="text" className="form-control" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input type="date" className="form-control" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Education</label>
          <input type="text" className="form-control" value={education} onChange={(e) => setEducation(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Update Student</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
