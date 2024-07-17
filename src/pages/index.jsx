import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YourComponent = () => {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get('https://yourapiurl.com/api/your-endpoint', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
        </div>
    );
};

export default YourComponent;
