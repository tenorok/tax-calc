import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { changeIncome } from '../features/tax/taxSlice';
import { validateIncomeInput } from '../utils/income';

export const incomeExample = [
    '120000,25000',
    '120000',
    '120000,25000',
    '120000',
].join('\n');

export function Summary(): React.JSX.Element {
    const dispatch = useDispatch();
    const income = useSelector((state: RootState) => state.tax.income);

    const onExampleClick = React.useCallback(() => {
        dispatch(changeIncome(incomeExample));
    }, []);

    if (!income || !validateIncomeInput(income)) {
        return (
            <div>
                <div className="relative px-3 py-2 max-sm:pl-0">
                    <div className="pr-2 text-2xl max-sm:hidden absolute sm:-left-6">
                        👈
                    </div>
                    <div className="pr-2 text-2xl sm:hidden inline-block sm:-left-10 relative -top-1.5">
                        👆
                    </div>
                    <p className="max-sm:inline-block">
                        Начните вводить ваши доходы,
                        <br />
                        поквартальный{' '}
                        <button
                            className="text-blue-600 underline decoration-dotted decoration-blue-300"
                            onClick={onExampleClick}
                        >
                            пример
                        </button>
                        :
                    </p>
                </div>
                <code className="block text-tiny ml-3 pl-3 border-solid border-l-2 max-sm:ml-8 whitespace-pre">
                    {incomeExample}
                </code>
            </div>
        );
    }

    return <>TODO: сводная информация</>;
}
