'use client';
import { useRouter } from "next/navigation";
import { useAuth } from "./userauth";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth() || {};
  const router = useRouter();

  console.log("PrivateRoute - user:", user, "loading:", loading);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;
  return user ? children : null;
};
export default PrivateRoute;
