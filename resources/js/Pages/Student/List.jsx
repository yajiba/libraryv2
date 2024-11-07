import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import useFetchData from '@/hooks/useFetchData';
import useAlert from '@/hooks/useAlert';
import useSubmit from '@/hooks/useSubmit';
import AddModal from './AddModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import UpdateModal from './UpdateModal';

export default function StudentList({ departments }) {
    const { data, loading, fetchData } = useFetchData('/students/datatable');
    const [searchTerm, setSearchTerm] = useState('');
    const { showAlert, msg, bg, displayAlert } = useAlert();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const toggleAddModal = () => {
        setIsAddModalOpen(!isAddModalOpen)
        if (isAddModalOpen) resetForm();
    };

    const toggleUpdateModal = () => setIsUpdateModalOpen(!isUpdateModalOpen);
    const { formData, handleSubmit, handleChange: handleInputChange } = useSubmit(fetchData, toggleAddModal, displayAlert, '/students/record', "POST");
    // For Update
   const updateUrl = selectedStudent ? `/students/${selectedStudent.id}/update` : '';
    const { formData: updateFormData, setFormData: setUpdateFormData, handleSubmit: handleUpdateSubmit, handleUpdateChange: handleUpdateInputChange } = useSubmit(
        fetchData,
        toggleUpdateModal,
        displayAlert,
        updateUrl,
        'PUT'
    );

    const fieldsToSearch = ['first_name', 'last_name', 'middle_name', 'email'];
    const filteredData = data.filter(item =>
        fieldsToSearch.some(field =>
            item[field] && item[field].toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true, width: '60px' },
        { name: 'First Name', selector: row => row.first_name, sortable: true },
        { name: 'Last Name', selector: row => row.last_name, sortable: true },
        { name: 'Middle Initial', selector: row => row.middle_name, sortable: true },
        { name: 'Email', selector: row => row.email, sortable: true, width: '250px' },
        { name: 'Department', selector: row => row.department ? row.department.name : 'N/A', sortable: true, width: '115px' },
        {
            name: 'Birthdate',
            selector: row => {
                const date = new Date(row.date_of_birth);
                return new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }).format(date);
            },
            sortable: true
        },
        { name: 'Gender', selector: row => row.gender, sortable: true, width: '90px' },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex space-x-2">
                    <button onClick={() => handleEdit(row)} className="text-blue-500">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDelete(row.id)} className="text-red-500">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            ),
            width: '90px'
        },

    ];
    const handleEdit = (row) => {
        setSelectedStudent(row); // Set the student data for editing
        setUpdateFormData(row); // Load the selected student data into updateFormData
        toggleUpdateModal();
    }

    const handleDelete = async (id) => {
        // Add delete confirmation and API call here
        const confirmed = window.confirm('Are you sure you want to delete this student?');
        if (confirmed) {
            try {
                await axios.delete(`/students/${id}`);
                fetchData(); // Refresh the table data
                displayAlert('Student successfully deleted!', 'success');
            } catch (error) {
                displayAlert('An error occurred while deleting the student', 'error');
            }
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Students" />
            <div className="">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='flex justify-between'>
                                <input
                                    type="text"
                                    className=' rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                                    placeholder="Search student"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    style={{ marginBottom: '10px', padding: '5px' }}
                                />
                                <button
                                    className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-center text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                    onClick={toggleAddModal}
                                >
                                    <i className="mdi mdi-account-plus menu-icon"></i> Add Student
                                </button>
                            </div>
                            <AddModal
                                isOpen={isAddModalOpen}
                                toggleModal={toggleAddModal}
                                handleSubmit={handleSubmit}
                                formData={formData}
                                handleInputChange={handleInputChange}
                                departments={departments}
                                showAlert={showAlert}
                                msg={msg}
                                bg={bg}
                            />
                            <UpdateModal
                                isOpen={isUpdateModalOpen}
                                toggleModal={toggleUpdateModal}
                                handleSubmit={handleUpdateSubmit}
                                formData={updateFormData} // Use updateFormData instead of selectedStudent
                                handleInputChange={handleUpdateInputChange}
                                departments={departments}
                                showAlert={showAlert}
                                msg={msg}
                                bg={bg}
                            />


                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <DataTable
                                    className='w-full table-auto'
                                    columns={columns}
                                    data={filteredData}
                                    pagination
                                    striped
                                    highlightOnHover
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
