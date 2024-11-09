import { scaleFlat } from '../../scales/flat';
import { scaleProgressive2021 } from '../../scales/progressive2021';
import { scaleProgressive2024 } from '../../scales/progressive2024';
import { type TCalcTaxScale } from '../../scales/type';

export type TScale = 'flat' | 'progressive2021' | 'progressive2024';

interface IScaleInfo {
    name: string;
    description: string | string[][];
    func: TCalcTaxScale;
}

export const scales: Record<TScale, IScaleInfo> = {
    flat: {
        name: 'Плоская',
        description: '13% с любого дохода',
        func: scaleFlat,
    },
    // https://www.nalog.gov.ru/rn58/news/activities_fts/10414275/
    progressive2021: {
        name: 'Прогрессивная 2021',
        description: [
            ['до 5 млн', '13%'],
            ['от 5 млн', '15%'],
        ],
        func: scaleProgressive2021,
    },
    // https://www.nalog.gov.ru/rn05/news/activities_fts/15068109/
    progressive2024: {
        name: 'Прогрессивная 2025',
        description: [
            ['до 2.4 млн', '13%'],
            ['от 2.4 до 5 млн', '15%'],
            ['от 5 до 20 млн', '18%'],
            ['от 20 до 50 млн', '20%'],
            ['от 50 млн', '22%'],
        ],
        func: scaleProgressive2024,
    },
};

export const defaultScale: TScale = 'progressive2024';
