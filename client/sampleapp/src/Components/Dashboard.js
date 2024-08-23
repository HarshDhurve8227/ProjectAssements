import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/auth/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.email}</h1>
                    {user.profileImage && (
                        <img
                            src={`http://localhost:8000/uploads/${user.profileImage}`} // Correct path to image
                            alt="Profile"
                            style={{ width: '150px', height: '150px', borderRadius: '50%' }} // Optional styling
                        />
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Dashboard;
