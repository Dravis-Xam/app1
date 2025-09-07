import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import State from "../constants/types/state.type";
import { signup } from "./api/auth.api";

export default function SignupRedirect() {
    const { user } = useAuth();
    const router = useRouter();
    const [state, setState] = useState<State>({ isLoading: true, error: null });
    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        } else {
            const performSignup = async () => {
                setState({ isLoading: true, error: null });
                try {
                    await signup().fetchData();
                    router.push('/login');
                } catch (err: any) {
                    setState({
                        isLoading: false,
                        error: {
                            message: err.message || 'Signup failed',
                            details: err.details,
                            code: err.code,
                        }
                    });
                }
            };
            performSignup();
        }
    }, [user, router]);

    if (state.isLoading) {
        return <div>Signing up...</div>;
    }
    if (state.error) {
        return <div>Error: {state.error.message}</div>;
    }
    return null;
}
