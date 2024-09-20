import { CalendarDays } from "lucide-react"
import moment from "moment"
import Image from "next/image"

export default function Certificate({ user, course }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden">
                <div className="p-8 sm:p-12 border-8 border-double border-gray-200 m-4 sm:m-8 space-y-6 text-center">
                    <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4">Certificate of Achievement</h1>
                    <p className="text-lg sm:text-xl text-gray-600">This certificate is awarded to</p>
                    <p className="text-2xl sm:text-4xl font-semibold text-primary">{user?.fullName}</p>
                    <p className="text-lg sm:text-xl text-gray-600">for successful completion of the course</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-800">{course?.courseOutput?.course?.name}</p>
                    <div className="flex items-center justify-center text-gray-600">
                        <CalendarDays className="w-5 h-5 mr-2" />
                        <p>Issued on {moment().format('MMM DD, YYYY')}</p>
                    </div>
                    <div className="pt-8">
                        <div className="w-64 mx-auto border-b-2 border-gray-400">
                            <Image src={'/signature.png'} width={1000} height={1000} alt="signature" />
                        </div>
                        <p className="pt-2 text-gray-600">Issuer Signature</p>
                    </div>
                </div>
            </div>
        </div>
    )
}