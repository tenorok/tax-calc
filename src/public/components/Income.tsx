import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Textarea } from '@nextui-org/react';
import type { RootState } from '../store';
import { changeIncome } from '../features/tax/taxSlice';
import { validateIncomeInput } from '../utils/income';
import { lsTextareaValueKey } from '../const/localStorage';
import { Summary, incomeExample } from './Summary';

const textAreaClassNames = {
    input: 'font-mono text-small',
};

export function Income(): React.JSX.Element {
    const dispatch = useDispatch();
    const income = useSelector((state: RootState) => state.tax.income);
    const [focused, setFocused] = React.useState(false);

    const startContent = React.useMemo(() => {
        if (!income && !focused) {
            return ' ';
        }

        const count = income.split('\n').length;
        const content: React.ReactNode[] = [];

        for (let i = 1; i <= count; i++) {
            const number = i.toLocaleString('ru-RU', {
                minimumIntegerDigits: 2,
                useGrouping: false,
            });

            content.push(
                <span key={number}>
                    {number}
                    <br />
                </span>,
            );
        }

        return (
            <span className="text-neutral-400 font-mono text-small">
                {content}
            </span>
        );
    }, [income, focused]);

    const onTextareaChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(changeIncome(event.target.value));
        },
        [],
    );

    const onFocus = React.useCallback(() => {
        setFocused(true);
    }, []);

    const onBlur = React.useCallback(() => {
        setFocused(false);
    }, []);

    const validate = React.useCallback((value: string) => {
        return validateIncomeInput(value) ? true : 'Нужно ввести числа';
    }, []);

    React.useEffect(() => {
        if (income !== incomeExample) {
            localStorage.setItem(lsTextareaValueKey, income);
        }
    }, [income]);

    return (
        <div className="grid gap-2">
            <h1 className="relative text-2xl max-sm:text-xl">Доход</h1>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2 items-start">
                <Textarea
                    startContent={startContent}
                    maxRows={Infinity}
                    label="Доходы за год"
                    className="w-56"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onTextareaChange}
                    value={income}
                    validate={validate}
                    classNames={textAreaClassNames}
                />
                <Summary />
            </div>
        </div>
    );
}
