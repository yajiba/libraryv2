import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
export default function DepartmentList() {
    return (
        <AuthenticatedLayout>
            <Head title="Departments" />
            <div className="">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        </div>
                    </div></div>
            </div>
        </AuthenticatedLayout>
    )
}
