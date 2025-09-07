type AppError = {
    message: string;
    code?: number;
    details?: string;
    url?: string;
    location?: string;
}

export default AppError;