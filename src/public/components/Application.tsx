import React from 'react';
import { useSelector } from 'react-redux';
import { NextUIProvider } from '@nextui-org/system';
import type { RootState } from '../store';
import { scales } from '../const/scales';
import { ScaleSelector } from './ScaleSelector';
import { Header } from './Header';
import { Footer } from './Footer';
import { Income } from './Income';
import { TaxTable } from './TaxTable';
import {
    validateIncomeInput,
    parseIncomeInput,
    calcTableData,
    type ITableItem,
} from '../utils/income';
import { calcTax } from '../../';

export function Application(): React.JSX.Element {
    const { scale, income: incomeInput } = useSelector(
        (state: RootState) => state.tax,
    );
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
                        <section>
                            <TaxTable items={tableItems} />
                        </section>
                    </main>
                    <Footer />
                </div>
            </div>
        </NextUIProvider>
    );
}
