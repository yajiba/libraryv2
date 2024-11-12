import axios from 'axios';

// This function handles the delete logic for students
export const handleDelete = async (status, fetchData, displayAlert,url) => {
    console.log(status);
    // Add delete confirmation and API call here
    const confirmed = window.confirm(`Are you sure you want to ${status} this student?`);
    if (confirmed) {
        try {
            // Perform the API call to delete the student or update their status
            await axios.get(url);

            // Call fetchData to refresh the data after deletion
            fetchData();

            // Display success alert
            displayAlert('Student successfully deleted!', 'success');
        } catch (error) {
            // Display error alert in case of an error
            displayAlert('An error occurred while deleting the student', 'error');
        }
    }
};
