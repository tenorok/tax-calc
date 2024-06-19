import type { TCalcTaxScale } from './type';

const TAX1 = 0.13;
const TAX2 = 0.15;
const threshold = 5_000_000;

/**
 * Прогрессивная шкала от 2021 года.
 * * до 5 млн - 13%
 * * от 5 млн - 15%
 */
export const scaleProgressive2021: TCalcTaxScale = (
    paidIncome: number,
    totalIncome: number,
) => {
    const newIncome = totalIncome - paidIncome;

    if (totalIncome <= threshold) {
        return [newIncome * TAX1, TAX1];
    }

    if (paidIncome < threshold) {
        const tax1Income = (threshold - paidIncome) * TAX1;
        const tax2Income = (totalIncome - threshold) * TAX2;
        const percentTax = (tax1Income + tax2Income) / newIncome;
        return [newIncome * percentTax, percentTax];
    }

    return [newIncome * TAX2, TAX2];
};
