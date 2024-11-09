import React from 'react';
import { Link } from '@nextui-org/react';
import githubIcon from '../assets/github-mark.svg';

export function Footer(): React.JSX.Element {
    return (
        <footer className="flex gap-3">
            <Link href="https://github.com/tenorok/tax-calc" target="_blank">
                <img src={githubIcon} alt="GitHub icon" className="size-9" />
            </Link>
            <div>
                <div>
                    Налоговый калькулятор для РФ ©{new Date().getFullYear()}
                </div>
                <div>
                    Создан{' '}
                    <Link href="https://tenorok.ru" target="_blank">
                        Артёмом Курбатовым
                    </Link>
                </div>
            </div>
        </footer>
    );
}
