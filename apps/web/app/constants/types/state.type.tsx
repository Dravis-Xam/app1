import AppError from "./error.type";

type State = {
    isLoading: boolean;
    data?: any;
    error: AppError | null;
    next?: string | null;
}

export default State;