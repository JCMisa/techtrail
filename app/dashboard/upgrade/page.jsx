"use client";

import React, { useContext } from "react";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UserSubscriptionContext } from "@/app/_context/UserSubscriptionContext";
import { Button } from "@/components/ui/button";
import PlanFeaturesCard from "./_components/PlanFeaturesCard";
import CheckoutPage from "./_components/CheckoutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const UpgradePage = () => {
    const router = useRouter();
    const { userSubscription, setUserSubscription } = useContext(
        UserSubscriptionContext
    );

    const amount = 38;
    return (
        <div>
            <section className="text-gray-400 bg-dark rounded-lg body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
                            Pricing
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Upgrade your plan to enjoy more AI generated courses.
                        </p>
                        <div className="flex mx-auto border-2 border-dark-500 rounded overflow-hidden mt-6">
                            <button className="py-1 px-4 bg-dark-500 text-white focus:outline-none">
                                Monthly
                            </button>
                            <button className="py-1 px-4 text-gray-300 focus:outline-none">
                                Annually
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap -m-4 mb-3">
                        <div className="p-4  md:w-1/2 w-full">
                            <div className="h-full p-6 rounded-lg border-2 border-gray-700 flex flex-col relative overflow-hidden">
                                <h2 className="text-sm tracking-widest text-gray-400 title-font mb-1 font-medium">
                                    START
                                </h2>
                                <h1 className="text-5xl text-white pb-4 mb-4 border-b border-gray-800 leading-none">
                                    Free
                                </h1>
                                <PlanFeaturesCard feature={'5 Courses Limit'} />
                                <PlanFeaturesCard feature={'AI Generated Content'} />
                                <PlanFeaturesCard feature={'AI Generated Questions'} />
                                <button
                                    className="flex items-center mt-auto text-white bg-gray-800 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-700 rounded"
                                    onClick={() => router.push("/dashboard")}
                                >
                                    Continue
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-4 h-4 ml-auto"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                                <p className="text-xs text-gray-400 mt-3">
                                    Continue with free plan.
                                </p>
                            </div>
                        </div>
                        <div className="p-4  md:w-1/2 w-full">
                            <div className="h-full p-6 rounded-lg border-2 border-primary flex flex-col relative overflow-hidden">
                                <span className="bg-primary text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                                    POPULAR
                                </span>
                                <h2 className="text-sm tracking-widest text-gray-400 title-font mb-1 font-medium">
                                    PRO
                                </h2>
                                <h1 className="text-5xl text-white leading-none flex items-center pb-4 mb-4 border-b border-primary-100">
                                    <span>$38</span>
                                </h1>
                                <PlanFeaturesCard feature={'20 Courses Limit'} />
                                <PlanFeaturesCard feature={'AI Generated Content'} />
                                <PlanFeaturesCard feature={'AI Generated Questions'} />
                                <PlanFeaturesCard feature={'Course Completion Certificate'} />
                                <PlanFeaturesCard feature={'Points Activation'} />
                                <Dialog>
                                    <DialogTrigger asChild className="flex">
                                        <button
                                            disabled={userSubscription}
                                            className="flex items-center mt-auto text-white bg-primary border-0 py-2 px-4 w-full focus:outline-none hover:bg-primary-100 rounded"
                                            onClick={() => router.push("#payment-form")}
                                        >
                                            {userSubscription ? "Active Plan" : "Get Started"}
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="w-4 h-4 ml-auto"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                <h2 className="mb-3 text-lg font-bold">Upgrade Plan</h2>
                                            </DialogTitle>
                                            <DialogDescription>
                                                <Elements
                                                    stripe={stripePromise}
                                                    options={{
                                                        mode: "payment",
                                                        amount: convertToSubcurrency(amount),
                                                        currency: "usd",
                                                    }}
                                                >
                                                    <CheckoutPage amount={amount} />
                                                </Elements>
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter className="sm:justify-start">
                                            <DialogClose asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className="mt-5 w-full flex items-end self-end"
                                                >
                                                    Close
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <p className="text-xs text-gray-400 mt-3">
                                    Continue with PRO and enjoy more services and achievements.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UpgradePage;