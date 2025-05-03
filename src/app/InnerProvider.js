'use client';
import { useSelector } from "react-redux";
import { SocketProvider } from "@/Content/socketContext";
import { AuthProvider } from "@/authentication/userauth";

export function InnerProviders({ children }) {
  const user = useSelector((state) => state.auth.user);
  const currentUserId = user?.id; // optional chaining in case user is null

  return (
    <SocketProvider userId={currentUserId}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SocketProvider>
  );
}
