import React from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { ScaleSelector } from './ScaleSelector';
import { Income } from './Income';

export function Application(): React.JSX.Element {
    return (
        <NextUIProvider>
            <div className="container max-w-3xl mx-auto sm:px-11 text-small min-w-96">
                <div className="min-h-screen p-4 flex flex-col justify-between">
                    <div className="grid gap-4">
                        <header>
                            <h1 className="relative text-3xl max-sm:text-2xl">
                                <div className="sm:absolute sm:-left-10 inline-block pr-2">
                                    💸
                                </div>
                                Налоговый калькулятор
                            </h1>
                        </header>
                        <section>
                            <ScaleSelector />
                        </section>
                        <section>
                            <Income />
                        </section>
                    </div>
                    <footer>
                        <div>
                            Налоговый калькулятор для РФ ©
                            {new Date().getFullYear()}
                        </div>
                        <div>Создан Артёмом Курбатовым </div>
                    </footer>
                </div>
            </div>
        </NextUIProvider>
    );
}
