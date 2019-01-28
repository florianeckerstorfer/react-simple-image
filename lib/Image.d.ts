import * as React from "react";
import * as PropTypes from "prop-types";
export interface Size {
    size: string;
    mediaCondition?: string;
}
export interface Props {
    src: string;
    alt?: string;
    className?: string;
    srcSet?: any;
    sizes?: Size[];
    webp?: boolean;
    webpSrcSet?: any;
    onRef?: (ref: HTMLImageElement) => void;
}
export default class Image extends React.PureComponent<Props> {
    static readonly propTypes: {
        src: PropTypes.Validator<string>;
        alt: PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
        srcSet: PropTypes.Requireable<{
            [x: string]: {};
        }>;
        webpSrcSet: PropTypes.Requireable<{
            [x: string]: {};
        }>;
        sizes: PropTypes.Requireable<(PropTypes.InferProps<{
            size: PropTypes.Validator<string>;
            mediaCondition: PropTypes.Requireable<string>;
        }> | null)[]>;
        webp: PropTypes.Requireable<boolean>;
        onRef: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static readonly defaultProps: {
        alt: string;
    };
    readonly widthDescriptorOnly: boolean;
    constructor(props: any);
    replaceWithWebp(name: string): string;
    buildSrcSet(webp?: boolean): string | undefined;
    buildSizes(): string | undefined;
    renderImg(): JSX.Element;
    renderWebp(): JSX.Element;
    render(): JSX.Element;
}
