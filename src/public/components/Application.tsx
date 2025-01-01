import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NextUIProvider } from '@nextui-org/system';
import type { RootState } from '../store';
import { scales } from '../const/scales';
import { changeSummary } from '../features/tax/summarySlice';
import {
    validateIncomeInput,
    parseIncomeInput,
    calcTableData,
    type ITableItem,
} from '../utils/income';
import { calcTax } from '../../';
import { ScaleSelector } from './ScaleSelector';
import { Header } from './Header';
import { Footer } from './Footer';
import { Income } from './Income';
import { TaxTable } from './TaxTable';
import { TaxChart } from './TaxChart';

export function Application(): React.JSX.Element {
    const { scale, income: incomeInput } = useSelector(
        (state: RootState) => state.tax,
    );
    const dispatch = useDispatch();
    const { func } = scales[scale];

    const tableItems: ITableItem[] = React.useMemo(() => {
        if (!validateIncomeInput(incomeInput)) {
            return [];
        }

        const income = parseIncomeInput(incomeInput);
        const { tax, percent } = calcTax({
            income,
            calcTax: func,
        });
        return calcTableData({
            income,
            tax,
            percent,
        });
    }, [func, incomeInput]);

    React.useEffect(() => {
        const lastTableItem = tableItems.at(-1);
        if (!lastTableItem) {
            dispatch(
                changeSummary({
                    cumulativeClearIncome: 0,
                    cumulativeTaxValue: 0,
                    averageTaxPercent: 0,
                }),
            );
            return;
        }

        const { cumulativeClearIncome, cumulativeTaxValue } = lastTableItem;
        const averageTaxPercent =
            tableItems.reduce((acc, { taxPercent }) => (acc += taxPercent), 0) /
            tableItems.length;

        dispatch(
            changeSummary({
                cumulativeClearIncome,
                cumulativeTaxValue,
                averageTaxPercent,
            }),
        );
    }, [dispatch, tableItems]);

    return (
        <NextUIProvider>
            <div className="container max-w-3xl mx-auto sm:px-11 text-small min-w-80">
                <div className="min-h-svh box-border p-4 flex gap-4 flex-col justify-between">
                    <main className="grid gap-4">
                        <Header />
                        <section>
                            <ScaleSelector />
                        </section>
                        <section>
                            <Income />
                        </section>
                        <section className="max-w-full overflow-auto p-1">
                            <TaxTable items={tableItems} />
                        </section>
                        <section className="max-w-full overflow-auto p-1 h-96">
                            <TaxChart items={tableItems} />
                        </section>
                    </main>
                    <Footer />
                </div>
            </div>
        </NextUIProvider>
    );
}
