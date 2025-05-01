import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    title?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'base' | 'lg';
    loading?: boolean;
    children?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            title,
            variant = 'primary',
            size = 'base',
            disabled = false,
            loading = false,
            children,
            className,
            ...props
        },
        ref,
    ) => {
        const sizes = {
            sm: 'h-10 text-sm',
            base: 'h-11 text-sm',
            lg: 'h-12 text-sm',
        };

        const isDisabled = disabled || loading;
        const base = `flex items-center justify-center px-6 rounded-lg ${sizes[size]} font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2`;
        const style = clsx(
            base,
            {
                'bg-neutral-500 text-white cursor-not-allowed': isDisabled,
                'bg-purple-700 text-white hover:bg-purple-800':
                    !isDisabled && variant === 'primary',
                'bg-white text-purple-700 border border-purple-700 hover:bg-purple-50':
                    !isDisabled && variant === 'secondary',
                'border border-teal-500 text-teal-600 bg-transparent hover:bg-teal-50 py-1 px-2 font-normal rounded-full flex-none':
                    !isDisabled && variant === 'outline',
            },
            className,
        );

        return (
            <button
                ref={ref}
                className={style}
                disabled={isDisabled}
                aria-label={props['aria-label'] || title}
                {...props}
            >
                {loading ? (
                    <span className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : null}

                {children || title}
            </button>
        );
    },
);

Button.displayName = 'Button';
