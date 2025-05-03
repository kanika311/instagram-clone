'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import authApi from '@/mocks/auth';

export default function ResetPasswordForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      code: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().required('OTP is required'),
      newPassword: Yup.string().min(6, 'Must be at least 6 characters').required('New password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const result = await authApi.newPassword(values); // Your API call
        if (result.status === 'SUCCESS') {
          alert('Password reset successful');
          router.push('/login');
        } else {
          alert('Invalid OTP or something went wrong.');
        }
      } catch (error) {
        console.error('Reset error:', error);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-lg font-semibold mb-4">Reset Your Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="code"
            placeholder="Enter OTP"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 mb-2 border rounded-md text-sm"
          />
          {formik.touched.code && formik.errors.code && (
            <div className="text-red-500 text-sm mb-2">{formik.errors.otp}</div>
          )}

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 mb-2 border rounded-md text-sm"
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className="text-red-500 text-sm mb-4">{formik.errors.newPassword}</div>
          )}

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md text-sm">
            Reset Password
          </button>
        </form>

        <div className="mt-4">
          <Link href="/login" className="text-sm text-gray-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
