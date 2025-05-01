'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

type ToastErrorProps = {
    message: string;
};

export function ToastError({ message }: ToastErrorProps) {
    useEffect(() => {
        if (message) {
            toast.error(message);
        }
    }, [message]);

    return null;
}
