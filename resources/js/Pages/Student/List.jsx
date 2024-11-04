import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import useFetchData from './hooks/useFetchData';
import useForm from './hooks/useForm';
import useAlert from '@/Components/Alert';
import axios from 'axios';
import ModalForm from './hooks/ModalForm';

export default function StudentList({ departments }) {
    const { data, loading, fetchData } = useFetchData();
    const [searchTerm, setSearchTerm] = useState('');
    const { formData, handleInputChange, resetForm } = useForm({
        first_name: '',
        last_name: '',
        middle_name: '',
        email: '',
        department_id: '',
        date_of_birth: '',
        gender: '',
        address: '',
        mobile_number: '',
    });
    const { showAlert, msg, bg, displayAlert } = useAlert();
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        if (isOpen) resetForm(); // Reset form on modal close
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/students/record', formData);
            fetchData(); // Refetch data after submission
            displayAlert('Student successfully added!', 'success');
            setTimeout(() => {
                toggleModal(); // Close modal
            }, 2000);
            resetForm();
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = Object.values(error.response.data)
                    .flat()
                    .filter(message => typeof message === 'string') // Ensure we're only including strings
                    .join('\n'); // Join all messages with newline

                displayAlert(errors, 'error');
            } else {
                displayAlert('An unexpected error occurred', 'error');
            }
        }
    };
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
        { name: 'Department', selector: row => row.department ? row.department.name : 'N/A', sortable: true, width: '120px' },
        {
            name: 'Birthdate',
            selector: row => {
                const date = new Date(row.date_of_birth);
                return new Intl.DateTimeFormat('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                }).format(date);
            },
            sortable: true
        },
        { name: 'Gender', selector: row => row.gender, sortable: true, width: '100px' },
    ];

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
                                    onClick={toggleModal}
                                >
                                    <i className="mdi mdi-account-plus menu-icon"></i> Add Student
                                </button>
                            </div>
                            <ModalForm
                                isOpen={isOpen}
                                toggleModal={toggleModal}
                                handleSubmit={handleSubmit}
                                formData={formData}
                                handleInputChange={handleInputChange}
                                departments={departments}
                                showAlert={showAlert}
                                displayAlert={displayAlert}
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
