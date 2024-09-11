import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
    return (
        <div className="container-in">
            <div className="input-container-in">
                <div className="input-content-in">
                    <div className="input-dist-in p-5">
                        <SignIn />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage