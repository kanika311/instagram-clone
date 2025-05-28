'use client';

import { ImFacebook2 } from "react-icons/im";
import { Formvalidation } from "./Formikvalidation";
import authApi from "@/mocks/auth";
import { useFormik } from "formik";

export default function Signup() {
  const initialValues = {
    name: "",
    email: "",
    username: "",
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
    validationSchema: Formvalidation,
    onSubmit: async (values, action) => {
      const { name, email, password, username } = values;
      const data = { name, email, password, username };
      const result = await authApi.register(data);
      if (result) {
        action.resetForm();
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-md border border-[#dbdbdb]">
        <h1 className="text-center text-3xl font-bold mb-4 italic">Instagram</h1>
        <p className="text-center text-gray-600 mb-4">
          Sign up to see photos and videos from your friends.
        </p>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center mb-4 gap-4">
          <ImFacebook2 />
          Log in with Facebook
        </button>

        <div className="flex items-center mb-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Mobile Number or Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Full Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Username"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />

          <p className="text-xs text-gray-500">
            People who use our service may have uploaded your contact information to Instagram. <a href="#" className="text-blue-600">Learn More</a>
          </p>
          <p className="text-xs text-gray-500">
            By signing up, you agree to our <a href="#" className="text-blue-600">Terms</a>, <a href="#" className="text-blue-600">Privacy Policy</a>, and <a href="#" className="text-blue-600">Cookies Policy</a>.
          </p>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold">
            Sign up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Have an account? <a href="/login" className="text-blue-600">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
