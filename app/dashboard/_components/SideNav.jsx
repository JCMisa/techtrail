import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LayoutGrid, Settings, Telescope, WalletCards } from "lucide-react";

const SideNav = ({ isShow }) => {

    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: <LayoutGrid />,
            path: "/dashboard",
        },
        {
            id: 2,
            name: "Explore",
            icon: <Telescope />,
            path: "/dashboard/explore",
        },
        {
            id: 3,
            name: "Upgrade",
            icon: <WalletCards />,
            path: "/dashboard/upgrade",
        },
        {
            id: 4,
            name: "Settings",
            icon: <Settings />,
            path: "/dashboard/setting",
        },
    ];

    const path = usePathname();

    return (
        <div>
            {isShow && (
                <div className="h-screen p-5 border shadow-md transition-all relative">
                    <Link href={"/"}>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Image src={"/techtrail-logo.png"} alt="logo" width={50} height={50} />
                            <p className="text-xl font-bold sm:block hidden">
                                <span className="logo-text">TechTrail</span>
                            </p>
                        </div>
                    </Link>
                    <div className="mt-5">
                        {menuList.map((menu, index) => (
                            <Link href={menu.path} key={menu.id || index}>
                                <div>
                                    <h2
                                        className={`flex gap-2 items-center text-white font-medium p-5 cursor-pointer rounded-md hover:text-light hover:bg-primary-300 transition-all mb-2 ${path == menu.path && "text-light linear-bg"
                                            }`}
                                    >
                                        {menu.icon}
                                        {menu.name}
                                    </h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {/* <div className="absolute bottom-10 left-3 w-[80%]">
                        <UsageTrack />
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default SideNav;