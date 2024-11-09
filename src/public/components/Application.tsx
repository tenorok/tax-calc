import React from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { ScaleSelector } from './ScaleSelector';
import { Income } from './Income';
import { Header } from './Header';
import { Footer } from './Footer';

export function Application(): React.JSX.Element {
    return (
        <NextUIProvider>
            <div className="container max-w-3xl mx-auto sm:px-11 text-small min-w-80">
                <div className="min-h-svh box-border p-4 flex gap-4 flex-col justify-between">
                    <main className="grid gap-4">
                        <Header />
                        <section>
                            <ScaleSelector />
                        </section>
                        <section>
                            <Income />
                        </section>
                    </main>
                    <Footer />
                </div>
            </div>
        </NextUIProvider>
    );
}
