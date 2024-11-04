import React from 'react';

const ModalForm = ({
    isOpen,
    toggleModal,
    handleSubmit,
    formData,
    handleInputChange,
    departments,
    showAlert,
    displayAlert,
    msg,
    bg,
}) => {
    return (
        <>
            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center modals">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-8/12">
                        {showAlert && (
                            <div className={`border px-4 py-3 rounded relative ${bg}`}>
                                <span className="block sm:inline">{msg}</span>
                                <button
                                    onClick={() => displayAlert('', '')}
                                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                                >
                                    <svg
                                        className={`fill-current h-6 w-6 ${bg}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414l3.536 3.536-3.536 3.536a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414l-3.536-3.536 3.536-3.536a1 1 0 000-1.414z" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Student Form</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={toggleModal}
                            >
                                ✖
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Form Fields */}
                                <div className="mb-4">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        placeholder="ex. Juan"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        placeholder="ex. Dela Cruz"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Middle Name
                                    </label>
                                    <input
                                        type="text"
                                        name="middle_name"
                                        value={formData.middle_name}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        placeholder="ex. P."
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        placeholder="ex. juandela@example.com"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Department
                                    </label>
                                    <select
                                        name="department_id"
                                        value={formData.department_id}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        required
                                    >
                                        <option value="">Select a department</option>
                                        {departments.map((department) => (
                                            <option key={department.id} value={department.id}>
                                                {department.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        name="date_of_birth"
                                        value={formData.date_of_birth}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Gender
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        placeholder="ex. Barangay 1, City"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="text"
                                        name="mobile_number"
                                        value={formData.mobile_number}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        placeholder="ex. 09123456789"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalForm;
