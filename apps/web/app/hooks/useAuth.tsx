import { createContext, useContext, useState, useMemo } from "react";
import AppError from "../constants/types/error.type";
import { login } from "../services/api/auth.api";

type User = {
    id: string;
    username: string;
    role?: 'user' | 'admin';
};

type AuthContextType = {
    user: User | null;
    login: (username: string, password: string, rememberMe: boolean) => Promise<void>;
    logout: () => void;
    error:  any | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
};

import Auth from "../constants/types/auth.type";

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<AppError | null>(null);

    const value = useMemo(
        () => ({
            user,
            login: async (username: string, password: string, rememberMe: boolean) => {
                try {
                    const loginData: Auth = { username, password, rememberMe, role: 'user' };
                    const userData = await login(loginData).fetchData();
                    setUser(userData);
                    setError(null);
                } catch (err: any) {
                    setError({
                        message: err.message || 'Login failed',
                        details: err.details,
                        code: err.code,
                    });
                    throw err;
                }
            },
            logout: () => {
                setUser(null);
                setError(null);
            }, 
            error
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}



    
    