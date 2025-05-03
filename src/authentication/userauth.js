'use client';
import authApi from "@/mocks/auth";
import { getUser } from "@/redux/slices/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem("token");
        }
        return null;
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const updatedToken = localStorage.getItem("token");
            setToken(updatedToken);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                if (!token) {
                    if (pathname !== "/login" && pathname !== "/signup") {
                        router.push("/login");
                    }
                    return;
                }

                const response = await dispatch(getUser());
                if (response?.data) {
                    setUser(response.data);
                    if (pathname === "/login" || pathname === "/signup") {
                        router.push('/');
                    }
                } else {
                    localStorage.removeItem("token");
                    setToken(null);
                    router.push("/login");
                }
            } catch (error) {
                console.error("Authentication failed:", error);
                localStorage.removeItem("token");
                setToken(null);
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token, pathname, router, dispatch]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, loading, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);