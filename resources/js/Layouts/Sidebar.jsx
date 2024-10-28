
import NotificationAndChat from '@/Components/NotificationAndChat';
import ProfileDropdown from '@/Components/ProfileDropdown';
import { Link,usePage  } from '@inertiajs/react';
import { useState } from 'react';

const Sidebar = ({ children }) => {
    const [sidebarToggle, setSidebarToggle] = useState(false);

    const handleSidebarToggle = () => {
        setSidebarToggle(!sidebarToggle);
    };
    const user = usePage().props.auth.user;
    const { url } = usePage(); // Get current page URL
    const routeNames = {
        '/dashboard': 'Dashboard',
        '/students/list': 'Students',
      
        // Add other routes as needed
    };

    return (
        <><aside
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarToggle ? 'translate-x-0' : '-translate-x-full'}`}
            onClick={(e) => e.stopPropagation()}
        >
            {/* SIDEBAR HEADER */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <Link href={route('Dashboard')}>
                    <img src="/assets/images/dashboard_logo.png" alt="Logo" />
                </Link>

                <button className="block lg:hidden" onClick={handleSidebarToggle}>
                    <svg
                        className="fill-current text-white"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                        />
                    </svg>
                </button>
            </div>
            {/* SIDEBAR HEADER */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                {/* Sidebar Menu */}
                <nav>
                    <ul className="mb-6 flex flex-col gap-1.5">
                        {/* Menu Item Dashboard */}
                        <li>
                            <Link
                                className={`group relative flex items-center gap-2.5 px-4 py-2 font-medium duration-300 ease-in-out hover:bg-white hover:text-black dark:hover:bg-meta-4 ${window.location.pathname === '/dashboard' ? 'bg-white dark:bg-meta-4 text-black' : 'text-white'
                                    }`}
                                href={route('Dashboard')}
                            >
                                <svg
                                    className="fill-current"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                                    />
                                    <path
                                        d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                                    />
                                    <path
                                        d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                                    />
                                    <path
                                        d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                                    />
                                </svg>
                                <span className="whitespace-nowrap">Dashboard</span>
                            </Link>
                        </li>
                        {/* Menu Item Dashboard */}

                        {/* Additional Menu Items */}
                        {/* Example Menu Item */}
                        <li>
                            <Link
                                className={`group relative flex items-center gap-2.5 px-4 py-2 font-medium duration-300 ease-in-out hover:bg-white hover:text-black dark:hover:bg-meta-4 ${window.location.pathname === '/students/list' ? 'bg-white dark:bg-meta-4 text-black' : 'text-white'
                                    }`}
                                href={route('Students')}
                            >
                                <svg className="fill-current dark:fill-white" width="22" height="18"
                                    viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                                        fill=""></path>
                                    <path
                                        d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                                        fill=""></path>
                                    <path
                                        d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                                        fill=""></path>
                                </svg>
                                <span className="whitespace-nowrap">Students</span>
                            </Link>
                        </li>
                        {/* Additional Menu Items */}
                    </ul>
                </nav>
                {/* Sidebar Menu */}
            </div>
        </aside>
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

                <header
                    className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
                    <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                            {/* Hamburger Toggle Button */}
                            <button
                                className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSidebarToggle(!sidebarToggle);
                                }}
                            >
                                <span className="relative block h-5.5 w-5.5 cursor-pointer">
                                    <span className="absolute right-0 h-full w-full">
                                        <span
                                            className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black dark:bg-white transition-all duration-200 ease-in-out ${!sidebarToggle ? '!w-full delay-300' : 'w-0'}`}
                                        ></span>
                                        <span
                                            className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black dark:bg-white transition-all duration-200 ease-in-out delay-150 ${!sidebarToggle ? '!w-full delay-400' : 'w-0'}`}
                                        ></span>
                                        <span
                                            className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black dark:bg-white transition-all duration-200 ease-in-out delay-200 ${!sidebarToggle ? '!w-full delay-500' : 'w-0'}`}
                                        ></span>
                                    </span>
                                    <span className="absolute right-0 h-full w-full rotate-45">
                                        <span
                                            className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black dark:bg-white transition-all duration-200 ease-in-out ${!sidebarToggle ? 'h-0 delay-0' : 'h-full delay-300'}`}
                                        ></span>
                                        <span
                                            className={`absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black dark:bg-white transition-all duration-200 ease-in-out delay-400 ${!sidebarToggle ? 'h-0 delay-200' : 'h-full'}`}
                                        ></span>
                                    </span>
                                </span>
                            </button>
                            {/* Hamburger Toggle Button */}

                            {/* Logo Link */}
                            <Link href={route('Dashboard')} className="block flex-shrink-0 lg:hidden">
                                <img src="./assets/images/book.png" alt="Logo" className="w-15" />
                            </Link>
                        </div>
                        <div className="hidden sm:block">
                            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                {routeNames[url] || 'Unknown Page'}
                            </h2>
                        </div>
                        <div className="flex items-center gap-3 2xsm:gap-7">
                            <NotificationAndChat />
                            <ProfileDropdown />
                        </div>
                    </div>
                </header>
                <main>{children}</main>
            </div></>


    );
};

export default Sidebar;
