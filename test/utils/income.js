import { assert } from 'chai';
import { validateIncomeInput } from '../../src/public/utils/income';

describe('utils/income', () => {
    describe('validateIncomeInput()', () => {
        it('Валидность пустого поля', () => {
            assert.isTrue(validateIncomeInput(''));
        });

        it('Валидность одной строки из числа', () => {
            assert.isTrue(validateIncomeInput('100'));
        });

        it('Валидность одной строки из нескольких чисел', () => {
            assert.isTrue(validateIncomeInput('100,200'));
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
});
