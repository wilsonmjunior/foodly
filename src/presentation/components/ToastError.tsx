'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

type ToastErrorProps = {
    message: string;
};

export function ToastError({ message }: ToastErrorProps) {
    useEffect(() => {
        toast.error(message);
    }, [message]);

    return null;
}
