import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Loader from './Loader'


const LoadingDialog = ({ loading }) => {
    return (
        <AlertDialog open={loading}>
            <AlertDialogContent className='w-1'>
                <AlertDialogHeader>
                    <AlertDialogTitle></AlertDialogTitle>
                    <AlertDialogDescription>
                        <Loader />
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default LoadingDialog