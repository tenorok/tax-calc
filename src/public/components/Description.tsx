import React from 'react';

interface IProps {
    content: string | string[][];
}

export function Description(props: IProps): React.JSX.Element {
    return (
        <div className="min-w-64 max-w-80 whitespace-pre rounded-medium bg-default-50 px-3 py-2">
            <DescriptionContent {...props} />
        </div>
    );
}

function DescriptionContent(props: IProps): React.JSX.Element | string {
    const { content } = props;

    if (typeof content === 'string') {
        return content;
    }

    const listItems = content.map(([range, percent]) => {
        return (
            <li className="flex justify-between border-b-1 border-dotted mb-1 last:mb-2">
                <span className="relative top-1.5 bg-default-50 pr-0.5">
                    {range}
                </span>
                <span className="relative top-1.5 bg-default-50 pl-0.5">
                    {percent}
                </span>
            </li>
        );
    });

    return <ul>{listItems}</ul>;
}
