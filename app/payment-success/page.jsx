import { CheckCircle } from "lucide-react";

export default function PaymentSuccess({
    searchParams: { amount },
}) {
    return (
        <div className="max-w-3xl mx-auto p-10 text-white border m-10 rounded-lg bg-dark-200 text-center">
            <div className="mb-10 flex flex-col items-center justify-center">
                <CheckCircle className="w-14 h-14 text-green-500" />
                <h1 className="text-4xl font-extrabold mb-2">Payment successful</h1>
                <h2 className="text-xl text-gray-400">
                    Your ${amount} payment was successful. Enjoy!
                </h2>
            </div>
        </div>
    );
}