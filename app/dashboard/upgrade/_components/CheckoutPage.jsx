"use client";

import React, { useEffect, useState } from "react";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import moment from "moment";
import { toast } from "sonner";

const CheckoutPage = ({ amount }) => {
    const { user } = useUser();

    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [paymentIntentId, setPaymentIntentId] = useState(null);

    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
                setPaymentIntentId(data.paymentIntentId);
            });
    }, [amount]);

    const saveSubscripiton = async (paymentIntentId) => {
        try {
            const result = await db.insert(UserSubscription).values({
                email: user?.primaryEmailAddress?.emailAddress,
                username: user?.fullName,
                active: true,
                paymentId: paymentIntentId,
                joinDate: moment().format("MM-DD-yyyy"),
            });
            if (result) {
                console.log("payment result: " + JSON.stringify(result));
            } else {
                console.log("error saving payment info");
            }
        } catch (error) {
            toast(
                <p className="text-sm text-red-500 font-bold">
                    Internal error occured while saving the payment info
                </p>
            );
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        console.log("saving payment info to database...");
        await saveSubscripiton(paymentIntentId);

        if (!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://localhost:3000/payment-success?amount=${amount}`,
            },
        });

        if (error) {
            // This point is only reached if there's an immediate error when
            // confirming the payment. Show the error to your customer (for example, payment details incomplete)
            setErrorMessage(error.message);
        } else {
            // The payment UI automatically closes with a success animation.
            // Your customer is redirected to your `return_url`.
        }
        setLoading(false);
    };

    if (!clientSecret || !stripe || !elements) {
        return (
            <div className="flex items-center justify-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-white"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-2 rounded-md"
            id="payment-form"
        >
            {clientSecret && <PaymentElement />}

            {errorMessage && <div>{errorMessage}</div>}

            <button
                disabled={!stripe || loading}
                className="text-white w-full p-5 bg-primary mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
            >
                {!loading ? `Pay $${amount}` : "Processing..."}
            </button>
        </form>
    );
};

export default CheckoutPage;