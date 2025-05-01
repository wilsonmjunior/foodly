import { isBrowser } from '@/utils/browser';
import { StorageKeyType } from './constants';

const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

async function getServerCookie(key: StorageKeyType | string) {
    const { cookies } = await import('next/headers');
    const cookiesStore = await cookies();
    return cookiesStore.get(key)?.value;
}

async function setServerCookie(key: StorageKeyType | string, value: string) {
    const { cookies } = await import('next/headers');
    const cookiesStore = await cookies();
    return cookiesStore.set(key, value);
}

function parseCookies() {
    if (!isBrowser) return {};

    const cookieStr = document.cookie;
    if (!cookieStr) return {};

    return cookieStr.split(';').reduce(
        (acc, cookiePair) => {
            const [key, value] = cookiePair.trim().split('=');
            if (key && value) {
                acc[key] = decodeURIComponent(value);
            }
            return acc;
        },
        {} as Record<string, string>,
    );
}

function setValue<T>(key: StorageKeyType, value: T) {
    try {
        if (!isBrowser) {
            setServerCookie(key, JSON.stringify(value));
        } else {
            const jsonValue = JSON.stringify(value);
            const expires = new Date();
            expires.setTime(expires.getTime() + DEFAULT_MAX_AGE * 1000);

            document.cookie = `${key}=${encodeURIComponent(jsonValue)};path=/;expires=${expires.toUTCString()};samesite=strict;`;
        }
    } catch (error) {
        console.error(`Erro ao salvar no cookie [${key}]:`, error);
    }
}

async function getValue<T>(key: StorageKeyType): Promise<T | null> {
    try {
        if (!isBrowser) {
            const response = await getServerCookie(key);
            if (!response) return null;

            return JSON.parse(response) as T;
        }

        const cookies = parseCookies();
        const value = cookies[key];

        if (!value) return null;

        try {
            return JSON.parse(value) as T;
        } catch (e) {
            console.error(`Error parsing cookie value for [${key}]:`, e);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao obter do cookie [${key}]:`, error);
        return null;
    }
}

function removeValue(key: StorageKeyType) {
    try {
        if (!isBrowser) {
            console.warn('removeValue: Cookies só podem ser removidos no client-side');
            return;
        }

        document.cookie = `${key}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    } catch (error) {
        console.error(`Erro ao remover do cookie [${key}]:`, error);
    }
}

export { setValue, getValue, removeValue };
