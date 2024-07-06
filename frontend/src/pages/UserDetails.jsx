import { useEffect, useState } from 'react';
import { BASE_URL } from '../../config';
import classes from '../styles/UserDetails.module.css';

function UserDetails() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user-details`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          console.log('Failed to fetch:', response.statusText);
          throw new Error('You must be logged in to view your details.');
        }
        const data = await response.json();

        setUser(data.user);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      {user && (
        <div className={classes.details}>
          <h1 className={classes.title}>My Details</h1>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
        </div>
      )}

      {error && <h2 className={classes.errorDetails}>{error}</h2>}
    </>
  );
}

export default UserDetails;
