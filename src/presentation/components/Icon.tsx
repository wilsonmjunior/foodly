'use client';

import React from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';
import Image from 'next/image';

import FoodTrash from '../assets/icons/trash.svg';
import FoodPencil from '../assets/icons/pencil.svg';

const CustomIcons = {
    FoodPencil,
    FoodTrash,
};

type PhosphorIconType = keyof typeof PhosphorIcons;

type CustomIconType = keyof typeof CustomIcons;

export type IconProps = {
    name: PhosphorIconType | CustomIconType;
    size?: number;
    className?: string;
    weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
};

export function Icon({ name, size = 24, className = '', weight = 'regular' }: IconProps) {
    if (Object.keys(CustomIcons).includes(name)) {
        return (
            <Image src={CustomIcons[name as CustomIconType]} alt="" width={size} height={size} />
        );
    }

    const IconComponent = PhosphorIcons[name as PhosphorIconType] as React.ElementType;

    if (!IconComponent) return null;

    return <IconComponent size={size} className={className} weight={weight} />;
}
