import axios, { AxiosError } from 'axios';

import { AppError } from '@/domain/errors/AppError';

export function ApiError(error: unknown, defaultMessageError: string) {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Erro ao buscar produtos:', axiosError);

        const appError: AppError = {
            message: error.message || defaultMessageError,
            statusCode: axiosError.response?.status || 500,
        };

        return appError;
    }

    // Caso não seja um erro do Axios
    const appError: AppError = {
        message: defaultMessageError,
        statusCode: 500,
    };

    return appError;
}
