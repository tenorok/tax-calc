const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

const monthes = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
];

function formatLabel(index: number): string {
    return (index + 1).toLocaleString('ru-RU', {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
}

export function getLabels(count: number): string[];
export function getLabels(count: number, index: number): string;
export function getLabels(count: number, index?: number): string | string[] {
    if (count === quarters.length) {
        return typeof index === 'number' ? quarters[index] : quarters;
    }

    if (count === monthes.length) {
        return typeof index === 'number' ? monthes[index] : monthes;
    }

    if (typeof index === 'number') {
        return formatLabel(index);
    }

    return new Array(count).fill(0).map((_, index) => formatLabel(index));
}
