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

interface IProps {
    items: ITableItem[];
}

const columns = [
    {
        key: 'index',
        label: '',
    },
    {
        key: 'clearIncome',
        label: (
            <>
                Доход
                <br />
                после налога
            </>
        ),
    },
    {
        key: 'cumulativeClearIncome',
        label: (
            <>
                Накопленный доход
                <br />
                после налога
            </>
        ),
    },
    {
        key: 'taxPercent',
        label: (
            <>
                Налоговая
                <br />
                ставка
            </>
        ),
    },
    {
        key: 'taxValue',
        label: <>Налог</>,
    },
    {
        key: 'cumulativeTaxValue',
        label: (
            <>
                Накопленный
                <br />
                налог
            </>
        ),
    },
];

function formatRubles(value: number): React.ReactNode {
    return <>{value.toLocaleString('ru-RU')}&nbsp;₽</>;
}

export function TaxTable(props: IProps): React.JSX.Element {
    const items = React.useMemo(
        () =>
            props.items.map((item, index) => ({
                index: (index + 1).toLocaleString('ru-RU', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                }),
                clearIncome: formatRubles(item.clearIncome),
                cumulativeClearIncome: formatRubles(item.cumulativeClearIncome),
                taxPercent: item.taxPercent.toFixed(2) + '%',
                taxValue: formatRubles(item.taxValue),
                cumulativeTaxValue: formatRubles(item.cumulativeTaxValue),
            })),
        [props.items],
    );

    return (
        <Table aria-label="Таблица доходов и налогов">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key} className="text-center">
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={item.index}>
                        {(columnKey) => {
                            const classList = new ClassList('text-right');
                            if (columnKey === 'index') {
                                classList.add('text-neutral-400');
                            }

                            return (
                                <TableCell className={classList.toString()}>
                                    {getKeyValue(item, columnKey)}
                                </TableCell>
                            );
                        }}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
