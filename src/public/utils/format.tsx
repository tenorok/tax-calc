import React from 'react';

export function formatRubles(value: number): React.ReactNode {
    return <>{value.toLocaleString('ru-RU')}&nbsp;₽</>;
}

export function formatPercent(value: number): string {
    return (value * 100).toFixed(2) + '%';
}
