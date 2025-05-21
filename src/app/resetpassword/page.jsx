'use client';
import { useFormik } from 'formik';
import Link from 'next/link';
import { ResetValidation } from './ResetValidation';
import authApi from '@/mocks/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
    const router=useRouter();
    const initialValues = {
        email: ""
       
        };
    const {values,handleBlur,handleChange,handleSubmit,errors,touched}=useFormik({
initialValues,
validationSchema:ResetValidation,
onSubmit:async(values,action)=>{
    console.log("Submitted values:", values); 
    const{email}=values;

    const  data={email};
    const result =await authApi.resetPassword(data);
    if(result.status==='SUCCESS'){
        console.log("otp successfullt sent",result);
    }
    else{
        console.log("otp not send")
    }
}


    })
    // change password
    const[isChange,setIsChange]=useState(false);
    const handleChangePassword=()=>{
setIsChange(!isChange);
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 p-4 rounded-full">
            <svg className="h-8 w-8 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zM4 6v12c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2V6c0-1.104-.896-2-2-2H6c-1.104 0-2 .896-2 2z" />
            </svg>
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-2">Trouble logging in?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Enter your email, phone or username and we&apos;ll send you a link to get back into your account.
        </p>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          name='email'
          value={values.email} 
          onChange={handleChange}
           onBlur={handleBlur}
          placeholder="Email or Phone"
          className="w-full p-2 mb-4 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button onClick={handleChangePassword} type='submit' className="w-full bg-blue-300 text-white py-2 rounded-md text-sm cursor-pointer" >
          Send Otp
        </button>
        {isChange &&(
            router.push('/changepassword')
        )}
        </form>
        <p className="text-xs text-blue-500 mt-2 mb-4 cursor-pointer hover:underline">Can't reset your password?</p>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>

        <Link href="/signup" className="text-sm text-black font-semibold hover:underline">
          Create new account
        </Link>

        <div className="mt-6 border-t pt-4">
          <Link href="/login" className="text-sm text-gray-500 hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
