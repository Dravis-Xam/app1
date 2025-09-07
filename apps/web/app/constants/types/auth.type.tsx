type Auth = {
    username: string;
    password: string;
    rememberMe: boolean;
    role: 'user' | 'admin';
}

export default Auth;