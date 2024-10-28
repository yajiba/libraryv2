import { useState } from 'react';

const useAlert = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [msg, setMessage] = useState('');
    const [bg, setBg] = useState('');

    const displayAlert = (message, status) => {
       
        setMessage(message);
       
        setShowAlert(true);
        if(status == 'success') {
            setBg('bg-green-100 border-green-400 text-green-700');
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }else{
            setBg('bg-red-100 border-red-400 text-red-700');
        }
    
    };

    return { showAlert, msg, bg, displayAlert };
};

export default useAlert;
