import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/students/datatable');
            setData(response.data);
        } catch (err) {
            setError(err);
            console.error('Error fetching data:', err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, fetchData };
};

export default useFetchData;
