export function validateIncomeInput(value: string): boolean {
    return !value || /^[\d,\n]+$/.test(value);
}
