"use client";
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';

const Auth = () => {
    const [existingUser, setExistingUser] = useState(false);
    const [forgotPass, setForgotPass] = useState(false);
    return (
        <>
            {!forgotPass ? (
                !existingUser ? (
                    <div>
                        <Login />
                        <button className='bg-black text-white' onClick={() => setExistingUser(true)}>New Account</button>
                        <button className='bg-black text-white mx-2' onClick={() => setForgotPass(true)}>Forgot Password</button>
                    </div>
                ) : (
                    <div>
                        <Register />
                        <button className='bg-black text-white' onClick={() => setExistingUser(false)}>Existing Account</button>
                    </div>
                )
            ) : (
                <div>
                    <ForgotPassword />
                    <button className='bg-black text-white' onClick={() => {
                        setForgotPass(false)
                        setExistingUser(false)
                    }
                    }>Go Back</button>
                </div>
            )}
        </>
    );
};

export default Auth;
