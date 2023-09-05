import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import Layout from '../app/layout'
import Router from 'next/router';
import styles from '../../styles/Dashboard.module.css';
import { revokeToken, fetchToken } from '../../utils/tokenUtils';

type UserData = {
    name: string;
    // Add other fields as needed
};

const redirectToLogin = () => {
    revokeToken();
    Router.push('/login');
};

const fetchUserData = async (token: string, setUserData: React.Dispatch<React.SetStateAction<UserData | null>>) => {
    try {
        const res = await fetch('/api/user-data', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (res.status === 200) {
            const data = await res.json();
            setUserData(data);
        } else if (res.status === 401 || res.status === 403) {
            redirectToLogin();
        } else {
            console.log('Failed to fetch user data');
        }
    } catch (error) {
        console.error(`Error fetching data: ${JSON.stringify(error)}`);
    }
};

const Dashboard: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const MIN_LOADING_TIME = 2000; //Fancy fancy loading time

    useEffect(() => {
        const token = fetchToken();
        if (!token) {
            redirectToLogin();
            return;
        }

        Promise.all([
            fetchUserData(token, setUserData),
            new Promise(resolve => setTimeout(resolve, MIN_LOADING_TIME))
        ]).then(() => {
            setLoading(false);
        });
    }, []);

    return (
        <Layout>
            <div className={styles.dashboard}>
                {/* Check if the data is still loading */}
                {loading ? (
                    // Display the loading spinner if data is still loading
                    <Spinner />
                ) : (
                    // Data has finished loading
                    <>
                        {/* Check if user data exists */}
                        {userData ? (
                            <div>
                                {/* Display user data */}
                                <h2>Welcome, {userData.name}</h2>
                                {/* Additional user info can go here */}
                            </div>
                        ) : (
                            // Display an error message if user data doesn't exist
                            <div>Error loading data</div>
                        )}
                    </>
                )}
            </div>
        </Layout>
    );

};

export default Dashboard;
