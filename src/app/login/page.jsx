'use client';

import { useState } from "react";
import { ImFacebook2 } from "react-icons/im";
import authApi from "@/mocks/auth";
import { useFormik } from "formik";
import { useRouter } from 'next/navigation';
import { Loginvalidation } from "./Loginvalidation";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const [isForgetPassword, setIsForgetPassword] = useState(false);

  const handleForgetPassword = () => {
    setIsForgetPassword(true);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched
  } = useFormik({
    initialValues,
    validationSchema: Loginvalidation,
    onSubmit: async (values, action) => {
      try {
        const { email, password } = values;
        const data = { email, password };
        const result = await authApi.Login(data);
        if (result.status === 'SUCCESS') {
          localStorage.setItem('token', result?.data?.token);
          action.resetForm();
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  });

  if (isForgetPassword) {
    router.push('/resetpassword');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg border border-[#dbdbdb]">
        <h1 className="text-center text-3xl font-bold mb-4 italic">Instagram</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Phone number, username, or email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <span
              className="absolute right-3 top-2 cursor-pointer text-blue-500"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "Hide" : "Show"}
            </span>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold">
            Log in
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center mb-4 gap-4">
          <ImFacebook2 />
          Log in with Facebook
        </button>

        <p onClick={handleForgetPassword} className="text-center text-blue-600 cursor-pointer">
          Forgot password?
        </p>

        <div className="text-center mt-4 border-t pt-4">
          <p className="text-sm">
            Don&apos;t have an account? <a href="/signup" className="text-blue-600">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
