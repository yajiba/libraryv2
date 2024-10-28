import { useState } from 'react';

const useForm = (initialValues) => {
    const [formData, setFormData] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const resetForm = () => setFormData(initialValues);

    return { formData, handleInputChange, resetForm };
};

export default useForm;
