import type { TCalcTaxScale } from './scales/type';

interface IOptions {
    /** Доходы по интервалам. */
    income: number[][];
    /** Функция расчёта налога. */
    calcTax: TCalcTaxScale;
}

interface IResult {
    /** Абсолютные суммы налогов по интервалам. */
    tax: number[];
    /** Процент налогов по интервалам. */
    percent: number[];
    /** Накопленная абсолютная сумма налога по интервалам. */
    cumulative: number[];
}

export function calcTax(options: IOptions): IResult {
    const { income, calcTax } = options;

    const tax: number[] = [];
    const percent: number[] = [];
    const cumulative: number[] = [];

    let paidIncome: number = 0;
    let totalIncome: number = 0;
    let cumulativeTax: number = 0;

    for (const interval of income) {
        for (const incomeItem of interval) {
            totalIncome += incomeItem;
        }

        const [absTax, percentTax] = calcTax(paidIncome, totalIncome);
        cumulativeTax += absTax;

        tax.push(absTax);
        percent.push(percentTax);
        cumulative.push(cumulativeTax);

        paidIncome = totalIncome;
    }

    return {
        tax,
        percent,
        cumulative,
    };
}
