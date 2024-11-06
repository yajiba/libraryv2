import React from 'react'

export default function Alerts({ showAlert, msg, bg }) {
    return (
        <>
            {showAlert && (
                <div className={`border px-4 py-3 rounded relative ${bg}`}>
                    <span className="block sm:inline">{msg}</span>
                </div>
            )}
        </>
    )
}
