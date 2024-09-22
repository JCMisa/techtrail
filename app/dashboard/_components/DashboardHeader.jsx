
"use client";

import { UserButton } from "@clerk/nextjs";
import { AlignJustify, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const routes = [
    {
        name: "home",
        path: "/",
    },
    {
        name: "dashboard",
        path: "/dashboard",
    },
    {
        name: "Explore",
        path: "/dashboard/explore",
    },
    {
        name: "Upgrade",
        path: "/dashboard/upgrade",
    },
    {
        name: "Settings",
        path: "/dashboard/setting",
    },
];

const DashboardHeader = ({ showSideNav }) => {
    const router = useRouter();
    const [searchInput, setSearchInput] = useState("");

    const navigateToRoute = () => {
        const filteredRoutes = routes.filter((route) =>
            route.name.toLowerCase().includes(searchInput.toLowerCase())
        );

        if (filteredRoutes.length === 0) {
            router.push("/dashboard");
            return;
        }
        router.push(filteredRoutes[0].path);
    };

    return (
        <div className="p-5 shadow-md border-b flex justify-between items-center no-print">
            <div className="md:flex flex-row gap-5 items-center hidden">
                <div className="cursor-pointer">
                    <AlignJustify onClick={showSideNav} />
                </div>
                <div className="flex flex-row gap-3 bg-dark-100 items-center border border-light px-5 rounded-lg">
                    <Search
                        className="cursor-pointer"
                        onClick={() => navigateToRoute()}
                    />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="text-light p-2 bg-dark-100 focus:outline-none focus:ring-0"
                        name="searchInput"
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
            </div>

            <Link href={"/"}>
                <div className="flex font-medium items-center text-white mb-4 md:mb-0 md:hidden">
                    <Image src={"/techtrail-logo.png"} alt="logo" width={50} height={50} />
                    <p className="ml-3 text-xl text-light">
                        <span className="logo-text -ml-5">TechTrail</span>
                    </p>
                </div>
            </Link>

            <div>
                <UserButton />
            </div>
        </div>
    );
};

export default DashboardHeader;
