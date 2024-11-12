import React from "react";
import Alerts from "@/Components/Alerts";

const UpdateModal = ({
    isOpen,
    toggleModal,
    handleSubmit,
    formData,
    handleInputChange,
    showAlert,
    msg,
    bg,
}) => {
    return (
        <>
            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center modals">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-8/12">
                       
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                Update Department Form
                            </h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={toggleModal}
                            >
                                ✖
                            </button>
                        </div>
                        <Alerts showAlert={showAlert} msg={msg} bg={bg} />
                        {/* Modal Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Form Fields */}
                                <div className="mb-4">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        placeholder="ex. BSIT"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        placeholder="ex. Bachelor of Science in Information Technology"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                >
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

export default UpdateModal;
