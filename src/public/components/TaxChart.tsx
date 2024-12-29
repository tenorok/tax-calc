import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    PointElement,
    BarElement,
    LineElement,
    BarController,
    LineController,
    Tooltip,
    Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { type ITableItem } from '../utils/income';
import { getLabels } from '../utils/labels';

interface IProps {
    items: ITableItem[];
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    PointElement,
    BarElement,
    LineElement,
    BarController,
    LineController,
    Tooltip,
    Legend,
);

type TChartData = Pick<React.ComponentProps<typeof Chart>, 'data'>['data'];

export function TaxChart(props: IProps): React.ReactNode {
    const { items } = props;

    const data = React.useMemo<TChartData>(
        () => ({
            labels: getLabels(items.length),
            datasets: [
                {
                    type: 'bar',
                    label: 'Доход после налога',
                    data: items.map((item) => item.clearIncome),
                    backgroundColor: '#B2D68B',
                },
                {
                    type: 'bar',
                    label: 'Налог',
                    data: items.map((item) => item.taxValue),
                    backgroundColor: '#FF6F61',
                },
                {
                    type: 'line',
                    label: 'Накопленный доход после налога',
                    data: items.map((item) => item.cumulativeClearIncome),
                    borderColor: '#B2D68B',
                    pointBackgroundColor: '#B2D68B',
                },
                {
                    type: 'line',
                    label: 'Накопленный налог',
                    data: items.map((item) => item.cumulativeTaxValue),
                    borderColor: '#FF6F61',
                    pointBackgroundColor: '#FF6F61',
                },
            ],
        }),
        [items],
    );

    if (!items.length) {
        return null;
    }

    return (
        <Chart
            type="line"
            options={{
                aspectRatio: 4 / 3,
                scales: {
                    y: {
                        position: 'right',
                        type: 'logarithmic',
                    },
                },
            }}
            data={data}
        />
    );
}
