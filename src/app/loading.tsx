import React from 'react';

export default function Loading() {
    return (
        <div className="flex flex-col min-h-[100dvh] md:min-h-screen">
            <div className="h-16 bg-neutral-100 animate-pulse w-full mb-4" />{' '}
            <div className="mx-4 flex flex-col gap-4 flex-1">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="h-[72px] flex items-center bg-neutral-200 rounded-lg animate-pulse"
                    >
                        <div className="relative w-[72px] h-full">
                            <div className="rounded-xl bg-neutral-300 w-full h-full" />
                        </div>
                        <div className="flex-1 p-3">
                            <div className="h-4 w-1/2 bg-neutral-300 rounded mb-2" />
                            <div className="flex items-center space-x-2">
                                <div className="h-3 w-10 bg-neutral-300 rounded" />
                                <div className="h-3 w-16 bg-neutral-300 rounded" />
                                <div className="h-3 w-8 bg-neutral-300 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="h-16 bg-neutral-100 animate-pulse w-full mt-4" />
        </div>
    );
}
