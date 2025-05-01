'use client';

import React from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';

export type IconProps = {
    name: keyof typeof PhosphorIcons;
    size?: number;
    className?: string;
    weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
};

export function Icon({ name, size = 24, className = '', weight = 'regular' }: IconProps) {
    const IconComponent = PhosphorIcons[name] as React.ElementType;

    if (!IconComponent) return null;

    return <IconComponent size={size} className={className} weight={weight} />;
}
