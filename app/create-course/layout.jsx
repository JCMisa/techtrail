'use client'

import React, { useEffect, useState } from 'react'
import CreateCourseHeader from './_components/CreateCourseHeader'
import { UserInputContext } from '../_context/UserInputContext';
import { db } from '@/utils/db';
import { Course, UserSubscription } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import LoadingDialog from '../_components/LoadingDialog';
import { useRouter } from 'next/navigation';

const CreateCourseLayout = ({ children }) => {
    const { user } = useUser();
    const router = useRouter();

    const [userCourseInput, setUserCourseInput] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isUserSubscribed, setIsUserSubscribed] = useState(false);
    const [isLimitReached, setIsLimitReached] = useState(false);

    const checkIfUserSubscribed = async () => {
        setLoading(true);
        try {
            const result = await db.select()
                .from(UserSubscription)
                .where(eq(UserSubscription?.email, user?.primaryEmailAddress?.emailAddress))

            if (result.length > 0) {
                setIsUserSubscribed(true);
            }
        } catch (error) {
            toast(
                <p className='text-sm font-bold text-red-500'>Internal error occured while fetching user</p>
            )
        } finally {
            setLoading(false);
        }
    }

    const checkIfLimitReached = async () => {
        setLoading(true);
        try {
            const result = await db.select()
                .from(Course)
                .where(eq(Course?.createdBy, user?.primaryEmailAddress?.emailAddress))

            if (result.length >= 5) {
                setIsLimitReached(true);
            }
        } catch (error) {
            toast(
                <p className='text-sm font-bold text-red-500'>Internal error occured while fetching user</p>
            )
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        user && checkIfUserSubscribed();
        user && checkIfLimitReached();
    }, [user])

    return (
        <div>
            <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
                <>
                    <CreateCourseHeader />
                    {
                        // naka subscribe na(false) || hindi pa reach ang limit(true) = true
                        // naka subscribe na(false) || hindi pa reach ang limit(false) = false
                        // naka subscribe na(true) || hindi pa reach ang limit(true) = true
                        // naka subscribe na(true) || hindi pa reach ang limit(false) = true
                        (isUserSubscribed || isLimitReached == false) ? children : router?.push('/dashboard/upgrade')
                    }
                </>
            </UserInputContext.Provider>
            <LoadingDialog loading={loading} />
        </div>
    )
}

export default CreateCourseLayout