import React from "react";
import { BookOpen, LayoutGrid, Settings, Telescope, WalletCards } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ButtomNav = () => {
    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: <LayoutGrid />,
            path: "/dashboard",
        },
        {
            id: 2,
            name: "Courses",
            icon: <BookOpen />,
            path: "/dashboard/courses",
        },
        {
            id: 3,
            name: "Explore",
            icon: <Telescope />,
            path: "/dashboard/explore",
        },
        {
            id: 4,
            name: "Upgrade",
            icon: <WalletCards />,
            path: "/dashboard/upgrade",
        },
        {
            id: 5,
            name: "Settings",
            icon: <Settings />,
            path: "/setting",
        },
    ];

    const path = usePathname();

    return (
        <div className="shadow-lg min-h-20 border-t bg-dark">
            <div className="flex gap-3 sm:gap-10 md:hidden justify-center items-center text-center">
                {menuList.map((menu, index) => (
                    <Link href={menu.path} key={menu.id || index}>
                        <div className="py-3">
                            <h2
                                className={`flex gap-1 sm:gap-5 items-center text-gray-400 font-medium p-1 sm:p-5 cursor-pointer rounded-md hover:text-light hover:bg-primary-300 transition-all mb-2 ${path == menu.path && "text-light linear-bg"
                                    }`}
                            >
                                {menu.icon}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ButtomNav;