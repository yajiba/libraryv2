import { useState } from 'react';
import axios from 'axios';

const useSubmit = (fetchData, toggleModal, displayAlert, url, method = 'POST') => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!url) {
            displayAlert('No valid URL for submission', 'error');
            return;
        }

        try {
            console.log(formData);
            const response = await axios({
                method, // dynamically use POST or PUT
                url,
                data: formData,
            });

            if (response.data && response.data.status === "success") {
                fetchData(); // Refetch data after submission
                displayAlert(response.data.message, 'success');
                setTimeout(() => {
                    toggleModal(); // Close modal
                }, 2000);
                resetForm();
            } else {
                displayAlert(response.data.message || 'Unexpected response from server', 'error');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = Object.values(error.response.data)
                    .flat()
                    .filter(message => typeof message === 'string')
                    .join('\n');
                displayAlert(errors, 'error');
            } else {
                displayAlert('An unexpected error occurred', 'error');
            }
        }
    };

    return {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        resetForm,
    };
};

export default useSubmit;

