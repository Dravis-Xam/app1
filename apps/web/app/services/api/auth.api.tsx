import fetcher from "./root.api";

import Auth from "../../constants/types/auth.type";

function login(auth: Auth): fetcher {
    return new fetcher({
        url: '/api/auth/login',
        options: {
            method: 'POST',
            credentials: 'include',
        },
    });
}

function logout(auth: Auth): fetcher {
    return new fetcher({
        url: '/api/auth/logout',
        options: {
            method: 'POST',
            credentials: 'include',
        },
    });
}

function signup({ username, password }: { username: string; password: string }): fetcher {
    return new fetcher({
        url: '/api/auth/signup',
        options: {
            method: 'POST',
            credentials: 'include',
        },
    });
}

export { login, logout, signup };