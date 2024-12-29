import React from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue,
} from '@nextui-org/react';
import { ClassList } from 'cnclasslist';
import { type ITableItem } from '../utils/income';
import { formatRubles, formatPercent } from '../utils/format';
import { getLabels } from '../utils/labels';
import { ButtonCopyColumn } from './ButtonCopyColumn';

interface IProps {
    items: ITableItem[];
}

enum EColumnsKeys {
    Index = 'index',
    ClearIncome = 'clearIncome',
    CumulativeClearIncome = 'cumulativeClearIncome',
    TaxPercent = 'taxPercent',
    TaxValue = 'taxValue',
    CumulativeTaxValue = 'cumulativeTaxValue',
}

const columns = [
    {
        key: EColumnsKeys.Index,
        label: '',
    },
    {
        key: EColumnsKeys.ClearIncome,
        label: (
            <>
                Доход
                <br />
                после налога
            </>
        ),
    },
    {
        key: EColumnsKeys.CumulativeClearIncome,
        label: (
            <>
                Накопленный доход
                <br />
                после налога
            </>
        ),
    },
    {
        key: EColumnsKeys.TaxPercent,
        label: (
            <>
                Налоговая
                <br />
                ставка
            </>
        ),
    },
    {
        key: EColumnsKeys.TaxValue,
        label: <>Налог</>,
    },
    {
        key: EColumnsKeys.CumulativeTaxValue,
        label: (
            <>
                Накопленный
                <br />
                налог
            </>
        ),
    },
];

const maxSmHiddenColumns = [
    EColumnsKeys.Index,
    EColumnsKeys.CumulativeClearIncome,
    EColumnsKeys.CumulativeTaxValue,
];

export function TaxTable(props: IProps): React.JSX.Element {
    const items = React.useMemo(
        () =>
            props.items.map((item, index, list) => ({
                index: getLabels(list.length, index),
                clearIncome: formatRubles(item.clearIncome),
                cumulativeClearIncome: formatRubles(item.cumulativeClearIncome),
                taxPercent: formatPercent(item.taxPercent),
                taxValue: formatRubles(item.taxValue),
                cumulativeTaxValue: formatRubles(item.cumulativeTaxValue),
            })),
        [props.items],
    );

    return (
        <Table aria-label="Таблица доходов и налогов" className="mt-3">
            <TableHeader columns={columns}>
                {columns.map(({ key, label }) => {
                    const classList = new ClassList('text-center px-0.5');
                    if (maxSmHiddenColumns.includes(key)) {
                        classList.add('max-sm:hidden');
                    }

                    return (
                        <TableColumn key={key} className={classList.toString()}>
                            <div className="flex justify-center items-center group/column cursor-default">
                                {label}
                                {key !== EColumnsKeys.Index ? (
                                    <ButtonCopyColumn
                                        values={props.items.map(
                                            (item) => item[key],
                                        )}
                                        className="group-hover/column:opacity-50"
                                    />
                                ) : null}
                            </div>
                        </TableColumn>
                    );
                })}
            </TableHeader>
            <TableBody items={items} emptyContent="Нет доходов для расчёта.">
                {(item) => (
                    <TableRow key={item.index}>
                        {(key) => {
                            const classList = new ClassList('text-center');
                            if (key === EColumnsKeys.Index) {
                                classList.add('text-neutral-400');
                            }

                            if (
                                maxSmHiddenColumns.includes(key as EColumnsKeys)
                            ) {
                                classList.add('max-sm:hidden');
                            }

                            return (
                                <TableCell className={classList.toString()}>
                                    {getKeyValue(item, key)}
                                </TableCell>
                            );
                        }}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
