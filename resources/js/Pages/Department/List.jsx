import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import useFetchData from "@/hooks/useFetchData";
import useAlert from "@/hooks/useAlert";
import useSubmit from "@/hooks/useSubmit";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faCheckCircle,
    faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function DepartmentList() {
    const { data, loading, fetchData } = useFetchData("/department/datatable");
    const [searchTerm, setSearchTerm] = useState("");
    const { showAlert, msg, bg, displayAlert } = useAlert();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
            width: "60px",
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        { name: "Full Name", selector: (row) => row.full_name, sortable: true },
        {
            name: "Status",
            cell: (row) =>
                row.status === 1 ? (
                    <span className="badge bg-success rounded p-1 text-white whitespace-nowrap">
                        Active
                    </span>
                ) : (
                    <span className="badge bg-danger rounded p-1 text-white whitespace-nowrap">
                        Deactivated
                    </span>
                ),
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEdit(row)}
                        className="text-blue-500"
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </button>

                    <button
                        onClick={() =>
                            handleDelete(
                                row.id,
                                row.status == 1 ? "deactivate" : "activate",
                            )
                        }
                        className="text-red-500"
                    >
                        <FontAwesomeIcon
                            icon={
                                row.status == 1 ? faTimesCircle : faCheckCircle
                            }
                        />
                    </button>
                </div>
            ),
            width: "90px",
        },
    ];

    const fieldsToSearch = ["name", "full_name"];
    const filteredData = data.filter((item) =>
        fieldsToSearch.some(
            (field) =>
                item[field] &&
                item[field].toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );

    const handleDelete = async (id, status) => {
        console.log(status);
        // Add delete confirmation and API call here
        const confirmed = window.confirm(
            `Are you sure you want to ${status} this department?`,
        );
        if (confirmed) {
            try {
                await axios.get(`/department/${id}/delete`);
                fetchData(); // Refresh the table data
                displayAlert(`Department successfully  ${status}!`, "success");
            } catch (error) {
                displayAlert(
                    "An error occurred while deleting the student",
                    "error",
                );
            }
        }
    };
    const handleEdit = (row) => {
        setSelectedData(row); // Set the student data for editing
        setUpdateFormData(row); // Load the selected student data into updateFormData
        toggleUpdateModal();
    };
    const toggleAddModal = () => {
        setIsAddModalOpen(!isAddModalOpen);
        if (isAddModalOpen) resetForm();
    };

    const toggleUpdateModal = () => setIsUpdateModalOpen(!isUpdateModalOpen);
    const {
        formData,
        handleSubmit,
        handleChange: handleInputChange,
    } = useSubmit(
        fetchData,
        toggleAddModal,
        displayAlert,
        "/department/record",
        "POST",
    );
    // For Update
    const updateUrl = selectedData
        ? `/department/${selectedData.id}/update`
        : "";
    const {
        formData: updateFormData,
        setFormData: setUpdateFormData,
        handleSubmit: handleUpdateSubmit,
        handleChange: handleUpdateInputChange,
    } = useSubmit(fetchData, toggleUpdateModal, displayAlert, updateUrl, "PUT");

    return (
        <AuthenticatedLayout>
            <Head title="Departments" />
            <div className="">
                <div className="mx-auto">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between">
                                <input
                                    type="text"
                                    className=" rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    placeholder="Search department"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    style={{
                                        marginBottom: "10px",
                                        padding: "5px",
                                    }}
                                />
                                 <button
                                    className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-center text-white hover:bg-opacity-90 "
                                    onClick={toggleAddModal}
                                >
                                    <i className="mdi mdi-account-plus menu-icon"></i>{" "}
                                    Add Department
                                </button>
                               
                            </div>
                            <AddModal
                                isOpen={isAddModalOpen}
                                toggleModal={toggleAddModal}
                                handleSubmit={handleSubmit}
                                formData={formData}
                                handleInputChange={handleInputChange}
                                showAlert={showAlert}
                                msg={msg}
                                bg={bg}
                            />
                              <UpdateModal
                                isOpen={isUpdateModalOpen}
                                toggleModal={toggleUpdateModal}
                                handleSubmit={handleUpdateSubmit}
                                formData={updateFormData} 
                                handleInputChange={handleUpdateInputChange}
                                showAlert={showAlert}
                                msg={msg}
                                bg={bg}
                            />
                            <DataTable
                                className="w-full table-auto"
                                columns={columns}
                                data={filteredData}
                                pagination
                                striped
                                highlightOnHover
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
