import type { TCalcTaxScale } from './type';

interface IRules {
    /** До какой суммы. */
    to: number;
    /** Размер налога. */
    tax: number;
}

const RULES: IRules[] = [
    { to: 2_400_000, tax: 0.13 },
    { to: 5_000_000, tax: 0.15 },
    { to: 20_000_000, tax: 0.18 },
    { to: 50_000_000, tax: 0.2 },
    { to: Infinity, tax: 0.22 },
];

/**
 * Прогрессивная шкала от 2024 года.
 * * до 2.4 млн - 13%
 * * от 2.4 до 5 млн - 15%
 * * от 5 до 20 млн - 18%
 * * от 20 до 50 млн - 20%
 * * от 50 млн - 22%
 */
export const scaleProgressive2024: TCalcTaxScale = (
    initPaidIncome: number,
    totalIncome: number,
) => {
    let newIncomeSum = 0;
    let taxSum = 0;
    let paidIncome = initPaidIncome;

    for (const { to, tax } of RULES) {
        const newIncome = Math.max(Math.min(to, totalIncome) - paidIncome, 0);
        newIncomeSum += newIncome;
        taxSum += newIncome * tax;
        paidIncome += newIncome;
    }

    return [taxSum, taxSum / newIncomeSum];
};
