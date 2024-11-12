import React from 'react';

const StatusBadge = ({ row }) => {
  return (
    <span
      className={`badge rounded p-1 text-white whitespace-nowrap ${
        row.status === 1 ? 'bg-success' : 'bg-danger'
      }`}
    >
      {row.status === 1 ? 'Active' : 'Deactivated'}
    </span>
  );
};

export default StatusBadge;
