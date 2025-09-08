import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) {
    return <div className="p-8 text-center">Checking authentication...</div>;
  }
  return <>{children}</>;
}