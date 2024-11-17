import { assert } from 'chai';
import {
    validateIncomeInput,
    parseIncomeInput,
    calcTableData,
} from '../../src/public/utils/income';

describe('utils/income', () => {
    describe('validateIncomeInput()', () => {
        it('Валидность пустого поля', () => {
            assert.isTrue(validateIncomeInput(''));
        });

        it('Валидность одной строки из числа', () => {
            assert.isTrue(validateIncomeInput('100'));
        });

        it('Невалидность одной строки из нескольких чисел через пробел', () => {
            assert.isFalse(validateIncomeInput('100 200'));
        });

        it('Валидность одной строки из нескольких чисел через запятую', () => {
            assert.isTrue(validateIncomeInput('100,200'));
        });

        it('Валидность одной строки из нескольких чисел через запятую с пробелом', () => {
            assert.isTrue(validateIncomeInput('100, 200'));
        });

        it('Валидность одной строки из нескольких чисел через запятую с несколькими пробелами', () => {
            assert.isTrue(validateIncomeInput('100,   200'));
        });

        it('Валидность одной строки с висящей запятой', () => {
            assert.isTrue(validateIncomeInput('100,'));
        });

        it('Невалидность одной строки из букв', () => {
            assert.isFalse(validateIncomeInput('foo'));
        });

        it('Валидность нескольких строк из чисел', () => {
            assert.isTrue(validateIncomeInput('100\n200'));
        });

        it('Невалидность нескольких строк, среди которых есть буквы', () => {
            assert.isFalse(validateIncomeInput('100\nfoo'));
        });
    });

    describe('parseIncomeInput()', () => {
        it('Пустое поле', () => {
            assert.deepEqual(parseIncomeInput(''), []);
        });

        it('Одна строка из числа', () => {
            assert.deepEqual(parseIncomeInput('100'), [[100]]);
        });

        it('Одна строка из нескольких чисел', () => {
            assert.deepEqual(parseIncomeInput('100,200'), [[100, 200]]);
        });

        it('Одна строка из нескольких чисел через запятую с пробелом', () => {
            assert.deepEqual(parseIncomeInput('100, 200'), [[100, 200]]);
        });

        it('Одна строка из нескольких чисел через запятую с несколькими пробелами', () => {
            assert.deepEqual(parseIncomeInput('100,   200'), [[100, 200]]);
        });

        it('Несколько строк из чисел', () => {
            assert.deepEqual(parseIncomeInput('100\n200'), [[100], [200]]);
        });

        it('Несколько строк из нескольких чисел', () => {
            assert.deepEqual(parseIncomeInput('100,200\n300,400'), [
                [100, 200],
                [300, 400],
            ]);
        });
    });

    // Расчёты проверены в таблице
    // https://docs.google.com/spreadsheets/d/e/2PACX-1vQFRUkDpzMO5jT3Kyzlq1I-CaceXwKWLWKRK_2bGwWEg_PTx7lLnhr0vt1D3PpVhD_OhpMbDHRei9fj/pubhtml
    describe('calcTableData()', () => {
        it('progressive2024 → Доход свыше 5 млн', () => {
            const result = calcTableData({
                income: [
                    [420_000],
                    [420_000],
                    [420_000],
                    [420_000],
                    [420_000, 500_000],
                    [420_000],
                    [420_000],
                    [420_000],
                    [420_000],
                    [420_000],
                    [420_000, 500_000],
                    [420_000],
                ],
                tax: [
                    54_600, 54_600, 54_600, 54_600, 123_600, 63_000, 63_000,
                    63_000, 63_000, 63_000, 156_600, 75_600,
                ],
                percent: [
                    0.13, 0.13, 0.13, 0.13, 0.13434782608695653, 0.15, 0.15,
                    0.15, 0.15, 0.15, 0.17021739130434782, 0.18,
                ],
            });

            assert.deepEqual(result, [
                {
                    taxValue: 54_600,
                    taxPercent: 0.13,
                    cumulativeTaxValue: 54_600,
                    clearIncome: 365_400,
                    cumulativeClearIncome: 365_400,
                },
                {
                    taxValue: 54_600,
                    taxPercent: 0.13,
                    cumulativeTaxValue: 109_200,
                    clearIncome: 365_400,
                    cumulativeClearIncome: 730_800,
                },
                {
                    taxValue: 54_600,
                    taxPercent: 0.13,
                    cumulativeTaxValue: 163_800,
                    clearIncome: 365_400,
                    cumulativeClearIncome: 1_096_200,
                },
                {
                    taxValue: 54_600,
                    taxPercent: 0.13,
                    cumulativeTaxValue: 218_400,
                    clearIncome: 365_400,
                    cumulativeClearIncome: 1_461_600,
                },
                {
                    taxValue: 123_600,
                    taxPercent: 0.13434782608695653,
                    cumulativeTaxValue: 342_000,
                    clearIncome: 796_400,
                    cumulativeClearIncome: 2_258_000,
                },
                {
                    taxValue: 63_000,
                    taxPercent: 0.15,
                    cumulativeTaxValue: 405_000,
                    clearIncome: 357_000,
                    cumulativeClearIncome: 2_615_000,
                },
                {
                    taxValue: 63_000,
                    taxPercent: 0.15,
                    cumulativeTaxValue: 468_000,
                    clearIncome: 357_000,
                    cumulativeClearIncome: 2_972_000,
                },
                {
                    taxValue: 63_000,
                    taxPercent: 0.15,
                    cumulativeTaxValue: 531_000,
                    clearIncome: 357_000,
                    cumulativeClearIncome: 3_329_000,
                },
                {
                    taxValue: 63_000,
                    taxPercent: 0.15,
                    cumulativeTaxValue: 594_000,
                    clearIncome: 357_000,
                    cumulativeClearIncome: 3_686_000,
                },
                {
                    taxValue: 63_000,
                    taxPercent: 0.15,
                    cumulativeTaxValue: 657_000,
                    clearIncome: 357_000,
                    cumulativeClearIncome: 4_043_000,
                },
                {
                    taxValue: 156_600,
                    taxPercent: 0.17021739130434782,
                    cumulativeTaxValue: 813_600,
                    clearIncome: 763_400,
                    cumulativeClearIncome: 4_806_400,
                },
                {
                    taxValue: 75_600,
                    taxPercent: 0.18,
                    cumulativeTaxValue: 889_200,
                    clearIncome: 344_400,
                    cumulativeClearIncome: 5_150_800,
                },
            ]);
        });
    });
});
