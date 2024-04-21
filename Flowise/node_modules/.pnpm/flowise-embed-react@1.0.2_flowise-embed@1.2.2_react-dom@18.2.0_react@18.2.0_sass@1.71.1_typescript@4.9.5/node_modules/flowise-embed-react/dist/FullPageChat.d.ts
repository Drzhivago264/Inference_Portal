/// <reference types="react" />
import type { BotProps } from 'flowise-embed';
type Props = BotProps & {
    style?: React.CSSProperties;
    className?: string;
};
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'flowise-fullchatbot': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                class?: string;
            };
        }
    }
}
export declare const FullPageChat: ({ style, className, ...assignableProps }: Props) => JSX.Element;
export {};
//# sourceMappingURL=FullPageChat.d.ts.map