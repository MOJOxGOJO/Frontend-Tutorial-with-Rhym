import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
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

  useEffect(() => {
    localStorage.setItem('peopleData', JSON.stringify(people));
  },[people]);

  function handleChange(event) {
    const name  = event.target.name;
    const value = event.target.value;
    setFormData({
      ...formData, [name]: value          // copy all old fields, then overwrite the one you changed. 
    })
  }

  function handleSubmit(event){
    event.preventDefault();
    setPeople([...people, formData]);
    setFormData({
      name: '',
      age: '',
      sex: '',
      address: ''
    })
  }

  return (
    <>
    <div className='container'>
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            />
        </div>

        <div>
          <label>Age:</label>
          <input
            type='text'
            name='age'
            value={formData.age}
            onChange={handleChange}
            required
            />
        </div>

        <div>
          <label>Sex:</label>
          <select
            name='sex'
            value={formData.sex}
            onChange={handleChange}
            required
            >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            </select>
        </div>

        <div>
          <label>Address:</label>
          <input
            type='text'
            name='address'
            value={formData.address}
            onChange={handleChange}
            required
            />
        </div>

        <button type='submit'>Submit</button>
      </form>

      <div className='entries'>
        <h2>Entries:</h2>
        {people.map((person,index) => (
          <div key={index} className='entry'>
            <p><b>Name:</b>{person.name}</p>
            <p><b>Age:</b>{person.age}</p>
            <p><b>Sex:</b>{person.sex}</p>
            <p><b>Address:</b>{person.address}</p>
          </div>
        ))}
      </div>
      </div>
      </div>
    </>
  )
}

export default App
