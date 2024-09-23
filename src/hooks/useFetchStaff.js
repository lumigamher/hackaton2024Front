import { useState, useEffect } from 'react';
import { staffService } from '../services/staffService';

const useFetchStaff = (projectId = null) => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchStaff = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = projectId
                ? await staffService.getStaffByProject(projectId)
                : await staffService.getAllAvailStaff();

            setStaff(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, [projectId]);

    return { staff, loading, error, refetch: fetchStaff };
};

export default useFetchStaff;
