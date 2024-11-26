import React from 'react';
import { useWindowScroll, useCopyToClipboard } from 'react-use';
import { Button, Tooltip } from '@nextui-org/react';
import { ClassList } from 'cnclasslist';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { ClipboardCheckIcon } from './icons/ClipboardCheckIcon';
import { ClipboardXIcon } from './icons/ClipboardXIcon';

interface IProps {
    values: number[];
    className?: string;
}

export function ButtonCopyColumn(props: IProps): React.JSX.Element {
    const { values, className } = props;

    const { y } = useWindowScroll();
    const [copyState, copyToClipboard] = useCopyToClipboard();
    const [showCopyState, setShowCopyState] = React.useState(false);

    const cls = React.useMemo(() => {
        const classList = new ClassList(
            '!size-5 min-w-0 ml-1 opacity-0 hover:!opacity-100',
        );

        if (className) {
            classList.add(...className.split(' '));
        }

        if (!values.length) {
            classList.add('hidden');
        }

        return classList.toString();
    }, [className, values.length]);

    const onClick = React.useCallback(() => {
        copyToClipboard(values.join('\n'));
        setShowCopyState(true);
        setTimeout(() => {
            setShowCopyState(false);
        }, 700);
    }, [copyToClipboard, values]);

    const onMouseLeave = React.useCallback(() => {
        setShowCopyState(false);
    }, []);

    const icon = React.useMemo(() => {
        if (!showCopyState) {
            return <ClipboardIcon width={8} height={8} />;
        }

        if (copyState.value) {
            return <ClipboardCheckIcon width={8} height={8} fill="#052814" />;
        }

        return <ClipboardXIcon width={8} height={8} fill="#F31260" />;
    }, [copyState.value, showCopyState]);

    return (
        <Tooltip
            isOpen={showCopyState}
            placement="bottom"
            showArrow
            offset={y + 10}
            closeDelay={0}
            content={
                copyState.error ? copyState.error.message : 'Столбец скопирован'
            }
        >
            <Button
                isIconOnly
                color="default"
                title="Скопировать значения столбца"
                radius="sm"
                onClick={onClick}
                onMouseLeave={onMouseLeave}
                className={cls}
            >
                {icon}
            </Button>
        </Tooltip>
    );
}
