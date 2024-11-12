import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Actions = ({ row, handleEdit, handleDelete,fetchData,displayAlert,url }) => {
  return (
    <div className="flex space-x-2">
      {/* Edit Button */}
      <button onClick={() => handleEdit(row)} className="text-black-500 hover:text-black-700">
        <FontAwesomeIcon icon={faEdit} />
      </button>

      {/* Activate / Deactivate Button */}
      <button
         onClick={() =>
            handleDelete(row.status === 1 ? 'deactivate' : 'activate', fetchData, displayAlert, url)
          }
        className={`text-${row.status === 1 ? 'red' : 'green'}-500 hover:text-${row.status === 1 ? 'red' : 'green'}-700`}
      >
        <FontAwesomeIcon icon={row.status === 1 ? faTimesCircle : faCheckCircle} />
      </button>
    </div>
  );
};

export default Actions;
