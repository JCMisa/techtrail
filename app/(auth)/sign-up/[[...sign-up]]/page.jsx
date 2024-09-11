import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
    return (
        <div className="container-in">
            <div className="input-container-in">
                <div className="input-content-in">
                    <div className="input-dist-in p-5">
                        <SignUp />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage