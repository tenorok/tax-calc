import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, SelectItem } from '@nextui-org/react';
import type { RootState } from '../store';
import { changeScale } from '../features/tax/taxSlice';
import { type TScale, scales, defaultScale } from '../const/scales';
import { Description } from './Description';

export function ScaleSelector(): React.JSX.Element {
    const scale = useSelector((state: RootState) => state.tax.scale);
    const dispatch = useDispatch();

    const handleSelectionChange = React.useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch(changeScale(event.target.value as TScale));
        },
        [],
    );

    return (
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2">
            <Select
                label="Шкала налогооблажения"
                defaultSelectedKeys={[defaultScale]}
                onChange={handleSelectionChange}
                className="w-56"
            >
                {Object.entries(scales).map(([scale, { name }]) => (
                    <SelectItem key={scale}>{name}</SelectItem>
                ))}
            </Select>
            <Description content={scales[scale].description} />
        </div>
    );
}
