import Header from "@/app/_components/Header";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const SettingPage = () => {
    return (
        <div>
            <Header />
            <div className="flex items-center justify-center h-full p-5">
                <div className="flex flex-col gap-3">
                    <Link href={'/dashboard'}><Button variant='outline'>Go Back</Button></Link>
                    <UserProfile />
                </div>
            </div>
        </div>
    );
};

export default SettingPage;