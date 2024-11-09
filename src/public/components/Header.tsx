import React from 'react';

export function Header(): React.JSX.Element {
    return (
        <header>
            <h1 className="relative text-3xl max-sm:text-2xl">
                <div className="sm:absolute sm:-left-10 inline-block pr-2">
                    💸
                </div>
                Налоговый калькулятор
            </h1>
        </header>
    );
}
