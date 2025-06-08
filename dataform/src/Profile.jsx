import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

function Profile() {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name');
  const age = searchParams.get('age');
  const sex = searchParams.get('sex');
  const address = searchParams.get('address');

  if (!name) {
    return (
      <div>
        <p>No profile data found in the URL!</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="profile">
      <h2>Profile of {name}</h2>
      <p><b>Age:</b> {age}</p>
      <p><b>Sex:</b> {sex}</p>
      <p><b>Address:</b> {address}</p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
}

export default Profile;
