import { Link } from '@inertiajs/react';
import { useState } from 'react';
import NavbarToggle from '@/Components/NavbarToggle';
import NotificationAndChat from '@/Components/NotificationAndChat';
import ProfileDropdown from '@/Components/ProfileDropdown';

const Header = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false);

    const handleSidebarToggle = () => {
        setSidebarToggle(!sidebarToggle);
    };

    return (
        <header
            className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <NavbarToggle/>
                <div className="flex items-center gap-3 2xsm:gap-7">
                    <NotificationAndChat/>
                    <ProfileDropdown/>
                </div>
            </div>
        </header>
    );
};

export default Header;
