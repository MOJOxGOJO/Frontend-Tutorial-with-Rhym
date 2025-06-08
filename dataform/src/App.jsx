import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Profile from './Profile';
import './App.css';

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: '',
    address: ''
  });

  const [people, setPeople] = useState(() => {
    const saved = localStorage.getItem('peopleData');
    return saved ? JSON.parse(saved) : [];
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('peopleData', JSON.stringify(people));
  }, [people]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
  
    if (editIndex !== null) {
      const updatedPeople = [...people];
      updatedPeople[editIndex] = formData;
      setPeople(updatedPeople);
      setEditIndex(null);
    } else {
      const nameExists = people.some(p => p.name === formData.name);
      if (nameExists) {
        alert('This name already exists. Please use a different name.');
        return;
      }
      setPeople([...people, formData]);  
    }
  
    setFormData({ name: '', age: '', sex: '', address: '' });
  }
  
  function handleDelete(index) {
    const updatedPeople = people.filter((_, i) => i !== index);
    setPeople(updatedPeople);
  }
  
  function handleEdit(index) {
    setFormData(people[index]);
    setEditIndex(index);
  }
  
  return (
    <div className="container">
      <div className="App">
        <form onSubmit={handleSubmit}>
          <div><label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div><label>Age:</label>
            <input type="text" name="age" value={formData.age} onChange={handleChange} required />
          </div>
          <div><label>Sex:</label>
            <select name="sex" value={formData.sex} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div><label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <button type="submit">{editIndex !== null ? 'Update' : 'Submit'}</button>
        </form>

        <div className="entries">
          <h2>People:</h2>
          {people.map((person, index) => (
            <div key={index} className="entry">
            <p>
            <Link 
              to={`/profile?name=${encodeURIComponent(person.name)}&age=${encodeURIComponent(person.age)}&sex=${encodeURIComponent(person.sex)}&address=${encodeURIComponent(person.address)}`}>
              {person.name}  
            </Link>
            </p>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
