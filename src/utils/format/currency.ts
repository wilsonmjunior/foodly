export function formatCurrency(
    value: number,
    currency: string = 'BRL',
    locale: string = 'pt-BR',
): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    }).format(value);
}
