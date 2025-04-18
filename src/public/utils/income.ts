import { type IResult } from '../..';

export function validateIncomeInput(value: string): boolean {
    return !value || /^(\d+(,\s*)*\n*)+$/.test(value);
}

export function parseIncomeInput(value: string): number[][] {
    if (!value) {
        return [];
    }

    const result: number[][] = [];

    for (const line of value.split('\n')) {
        const items = line.split(/,\s*/);
        const numbers: number[] = [];

        for (const item of items) {
            const number = parseFloat(item);
            if (!Number.isNaN(number)) {
                numbers.push(number);
            }
        }

        if (numbers.length) {
            result.push(numbers);
        }
    }

    return result;
}

interface ITableData extends IResult {
    income: number[][];
}

export interface ITableItem {
    /** Налог. */
    taxValue: number;
    /** Налоговая ставка. */
    taxPercent: number;
    /** Накопленный налог. */
    cumulativeTaxValue: number;
    /** Доход после налога. */
    clearIncome: number;
    /** Накопленный доход после налога. */
    cumulativeClearIncome: number;
}

export function calcTableData({
    income,
    tax,
    percent,
}: ITableData): ITableItem[] {
    const items: ITableItem[] = [];
    let cumulativeTaxValue: number = 0;
    let cumulativeClearIncome: number = 0;

    for (let i = 0; i < income.length; i++) {
        const incomeItem = income[i].reduce((acc, item) => acc + item, 0);
        const taxValue = Math.floor(tax[i]);
        const taxPercent = percent[i];
        const clearIncome = incomeItem - taxValue;
        cumulativeTaxValue += taxValue;
        cumulativeClearIncome += clearIncome;

        items.push({
            taxValue,
            taxPercent,
            cumulativeTaxValue,
            clearIncome,
            cumulativeClearIncome,
        });
    }

    return items;
}
