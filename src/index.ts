import type { TCalcTaxScale } from './scales/type';

interface IOptions {
    /** Доходы по интервалам. */
    income: number[][];
    /** Функция расчёта налога. */
    calcTax: TCalcTaxScale;
}

export interface IResult {
    /** Абсолютные суммы налогов по интервалам. */
    tax: number[];
    /** Налоговые ставки по интервалам. */
    percent: number[];
}

export function calcTax(options: IOptions): IResult {
    const { income, calcTax } = options;

    const tax: number[] = [];
    const percent: number[] = [];

    let paidIncome: number = 0;
    let totalIncome: number = 0;

    for (const interval of income) {
        for (const incomeItem of interval) {
            totalIncome += incomeItem;
        }

        const [absTax, percentTax] = calcTax(paidIncome, totalIncome);

        tax.push(absTax);
        percent.push(percentTax);

        paidIncome = totalIncome;
    }

    return {
        tax,
        percent,
    };
}
