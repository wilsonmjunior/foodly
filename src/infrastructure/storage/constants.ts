const BASE = '@FOODLY';

const FAVORITE_PRODUCTS = `${BASE}:FAVORITE_PRODUCTS`;
const TICKET = `${BASE}:TICKET`;

export const STORAGE_KEYS = {
    FAVORITE_PRODUCTS,
    TICKET,
} as const;

export type StorageKeyType = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
