'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';

export const useGetHistory = () => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchHistory = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/orders');

            if (response.data.success) {
                setHistory(response.data.data);
            }
        } catch (error) {
            console.error("Gagal mengambil riwayat:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return { history, isLoading };
};

export default useGetHistory;