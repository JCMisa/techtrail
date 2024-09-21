
"use client";

import { TotalUsageContext } from "@/app/_context/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/_context/UserSubscriptionContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { db } from "@/utils/db";
import { Course, UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const UsageTrack = () => {
    const { user } = useUser();
    const router = useRouter();

    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
    const { userSubscription, setUserSubscription } = useContext(
        UserSubscriptionContext
    );
    const [maxCourse, setMaxCourse] = useState(5);

    const isUserSubscribed = async () => {
        const result = await db
            .select()
            .from(UserSubscription)
            .where(
                eq(UserSubscription?.email, user?.primaryEmailAddress?.emailAddress)
            );

        if (result.length != 0) {
            // if yung current user is in the UserSubscription schema, then he is subscribed and paid already
            setUserSubscription(true);
            setMaxCourse(20);
        }
        if (user?.primaryEmailAddress?.emailAddress === 'johncarlomisa399@gmail.com') {
            setUserSubscription(true);
            setMaxCourse(100000);
        }
    };

    const getTotalUsage = async () => {
        const result = await db
            .select()
            .from(Course)
            .where(
                eq(
                    Course?.createdBy,
                    user?.primaryEmailAddress?.emailAddress
                )
            );

        if (result.length > 0) {
            setTotalUsage(result.length);
        }
    };

    useEffect(() => {
        user && getTotalUsage();
        user && isUserSubscribed();
    }, [user]);

    return (
        <div className="m-5 w-full">
            <div className="bg-dark-100 text-white rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-medium">Credits</h2>
                    <Button
                        variant={"outline"}
                        size={"sm"}
                        className="text-primary border-primary hover:bg-dark-100 hover:text-primary"
                        onClick={() => getTotalUsage()}
                    >
                        Refresh
                    </Button>
                </div>

                <Progress value={(totalUsage / maxCourse) * 100} />
                <h2 className="text-xs my-2">
                    {totalUsage}/{maxCourse} courses created
                </h2>
            </div>
            <Button
                onClick={() => router.push("/dashboard/upgrade")}
                className="w-full my-3 linear-bg"
            >
                Upgrade
            </Button>
        </div>
    );
};

export default UsageTrack;