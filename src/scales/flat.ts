import type { TCalcTaxScale } from './type';

const TAX = 0.13;

/**
 * Плоская шкала до 2021 года.
 * * 13%
 */
export const scaleFlat: TCalcTaxScale = (
    paidIncome: number,
    totalIncome: number,
) => {
    const newIncome = totalIncome - paidIncome;

    return [newIncome * TAX, TAX];
};
