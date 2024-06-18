import { assert } from 'chai';
import { calcTax } from '../src/index.ts';
import { scaleFlat } from '../src/scales/flat.ts';

describe('tax-calc', () => {
    describe('flat', () => {
        it('Зарплата с премией', () => {
            const result = calcTax({
                income: [
                    [80_000],
                    [80_000],
                    [80_000],
                    [80_000],
                    [80_000, 100_000],
                    [80_000],
                    [80_000],
                    [80_000],
                    [80_000],
                    [80_000],
                    [80_000, 100_000],
                    [80_000],
                ],
                calcTax: scaleFlat,
            });
            assert.deepEqual(result, {
                tax: [
                    10_400, 10_400, 10_400, 10_400, 23_400, 10_400, 10_400,
                    10_400, 10_400, 10_400, 23_400, 10_400,
                ],
                percent: [
                    0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13,
                    0.13, 0.13,
                ],
                cumulative: [
                    10_400, 20_800, 31_200, 41_600, 65_000, 75_400, 85_800,
                    96_200, 106_600, 117_000, 140_400, 150_800,
                ],
            });
        });
    });

    describe('progressive2021', () => {});

    describe('progressive2024', () => {});
});
