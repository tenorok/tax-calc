export type TCalcTaxScale = (
    /** Доход, с которого уже уплачен налог. */
    paidIncome: number,
    /** Совокупный доход. */
    totalIncome: number,
) => [
    /** Абсолютная сумма налога с нового дохода. */
    number,
    /** Процент налога с нового дохода в долях единицы. */
    number,
];
