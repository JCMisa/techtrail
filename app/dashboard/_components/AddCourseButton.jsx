'use client'

import { TotalUsageContext } from '@/app/_context/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/_context/UserSubscriptionContext';
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react';
import Link from 'next/link'
import React, { useContext } from 'react'

const AddCourseButton = () => {
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
    const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);

    return (
        <div>
            {
                (!userSubscription && totalUsage >= 5) ? (
                    <div>
                        <Link href={'/dashboard/upgrade'}><Button className='hidden sm:block bg-red-600 hover:bg-red-500 hover:border-red-500'>Limit Reached</Button></Link>
                        <Link href={'/dashboard/upgrade'}><Button className='block sm:hidden text-center rounded-full'><Wallet /></Button></Link>
                    </div>
                ) : (
                    <div>
                        <Link href={'/create-course'}><Button className='hidden sm:block'>+ Create Course</Button></Link >
                        <Link href={'/create-course'}><Button className='block sm:hidden text-center rounded-full'>+</Button></Link>
                    </div >
                )
            }

        </div>
    )
}

export default AddCourseButton