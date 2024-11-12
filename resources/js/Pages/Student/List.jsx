import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import useFetchData from '@/hooks/useFetchData';
import useAlert from '@/hooks/useAlert';
import useSubmit from '@/hooks/useSubmit';
import AddModal from './AddModal';
import UpdateModal from './UpdateModal';
import Actions from '@/Components/Actions';
import StatusBadge from '@/Components/StatusBadge';
import { handleDelete } from '@/hooks/handleDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function StudentList({ departments }) {
    const { data, loading, fetchData } = useFetchData('/students/datatable');
    const [searchTerm, setSearchTerm] = useState('');
    const { showAlert, msg, bg, displayAlert } = useAlert();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const toggleAddModal = () => {
        setIsAddModalOpen(!isAddModalOpen)
        if (isAddModalOpen) resetForm();
    };

    const toggleUpdateModal = () => setIsUpdateModalOpen(!isUpdateModalOpen);
    const { formData, handleSubmit, handleChange: handleInputChange } = useSubmit(fetchData, toggleAddModal, displayAlert, '/students/record', "POST");
    // For Update
    const updateUrl = selectedData ? `/students/${selectedData.id}/update` : '';
    const { formData: updateFormData, setFormData: setUpdateFormData, handleSubmit: handleUpdateSubmit, handleChange: handleUpdateInputChange } = useSubmit(
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
        { name: 'Middle Name', selector: row => row.middle_name, sortable: true },
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
            name: "Status",
            cell: (row) => (
                <StatusBadge row={row} />
            ),
        },
        {
            name: 'Actions',
            cell: (row) => (
                <Actions
                    row={row}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    fetchData={fetchData}
                    displayAlert={displayAlert}
                    url={`/students/${row.id}/delete`}
                />
            ),
            width: '90px'
        },

    ];
    const handleEdit = (row) => {
        setSelectedData(row); // Set the student data for editing
        setUpdateFormData(row); // Load the selected student data into updateFormData
        toggleUpdateModal();
    }


    return (
        <AuthenticatedLayout>
            <Head title="Students" />
            <div className="">
                <div className="mx-auto ">
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
                                    className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-center text-white hover:bg-opacity-90 "
                                    onClick={toggleAddModal}
                                >
                                     <FontAwesomeIcon icon={faPlus} /> Add Student
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
                                <div className="m-auto h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent">
                                </div>
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
