import * as React from "react";
import * as PropTypes from "prop-types";
import {
  matchDescriptor,
  matchWidthDescriptor,
  matchPixelDescriptor,
} from "./matcher";

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
  webpSrc?: string;
  webpSrcSet?: any;
  onRef?: (ref: HTMLImageElement) => void;
}

export default class Image extends React.PureComponent<Props> {
  static readonly propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
    srcSet: PropTypes.objectOf((props, propName, componentName) => {
      if (!matchDescriptor(propName)) {
        return new Error(
          `Invalid prop '${propName}' supplied to '${componentName}'. Validation failed.`,
        );
      }
      return null;
    }),
    webpSrcSet: PropTypes.objectOf((props, propName, componentName) => {
      if (!matchDescriptor(propName)) {
        return new Error(
          `Invalid prop '${propName}' supplied to '${componentName}'. Validation failed.`,
        );
      }
      return null;
    }),
    sizes: PropTypes.arrayOf(
      PropTypes.shape({
        size: PropTypes.string.isRequired,
        mediaCondition: PropTypes.string,
      }),
    ),
    webp: PropTypes.bool,
    onRef: PropTypes.func,
  };

  static readonly defaultProps = {
    alt: "", // it indicates this image is not a key part of the content
  };

  readonly widthDescriptorOnly: boolean;

  constructor(props) {
    super(props);

    this.widthDescriptorOnly = Object.keys(props.srcSet).every(descriptor =>
      matchWidthDescriptor(descriptor),
    );
  }

  replaceWithWebp(name: string) {
    return name.replace(/(\.(jpg|jpeg|png|gif))/, ".webp");
  }

  buildSrcSet(webp: boolean = false) {
    const matcher = this.widthDescriptorOnly
      ? matchWidthDescriptor
      : matchPixelDescriptor;
    return (
      Object.keys(this.props.srcSet)
        .filter(matcher)
        .map(
          descriptor =>
            `${
              webp
                ? this.props.webpSrcSet[descriptor] ||
                  this.replaceWithWebp(this.props.srcSet[descriptor])
                : this.props.srcSet[descriptor]
            } ${descriptor}`,
        )
        .join(",") || undefined
    );
  }

  buildSizes() {
    if (this.props.sizes && this.widthDescriptorOnly) {
      return (
        this.props.sizes
          .map(size => {
            if (size.mediaCondition) {
              return `${size.mediaCondition} ${size.size}`;
            }
            return `${size.size}`;
          })
          .join(",") || undefined
      );
    }
    return undefined;
  }

  renderImg() {
    return (
      <img
        alt={this.props.alt}
        className={this.props.className}
        src={this.props.src}
        srcSet={this.buildSrcSet()}
        sizes={this.buildSizes()}
        ref={this.props.onRef}
      />
    );
  }

  renderWebp() {
    return (
      <source
        type="image/webp"
        className={this.props.className}
        src={this.props.webpSrc || this.replaceWithWebp(this.props.src)}
        srcSet={this.buildSrcSet(true)}
        sizes={this.buildSizes()}
      />
    );
  }

  render() {
    if (this.props.webp) {
      return (
        <picture>
          {this.renderWebp()}
          {this.renderImg()}
        </picture>
      );
    }
    return this.renderImg();
  }
}
