"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require("prop-types");
var matcher_1 = require("./matcher");
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image(props) {
        var _this = _super.call(this, props) || this;
        _this.widthDescriptorOnly = Object.keys(props.srcSet).every(function (descriptor) {
            return matcher_1.matchWidthDescriptor(descriptor);
        });
        return _this;
    }
    Image.prototype.buildSrcSet = function () {
        var _this = this;
        var matcher = this.widthDescriptorOnly
            ? matcher_1.matchWidthDescriptor
            : matcher_1.matchPixelDescriptor;
        return (Object.keys(this.props.srcSet)
            .filter(matcher)
            .map(function (descriptor) { return _this.props.srcSet[descriptor] + " " + descriptor; })
            .join(",") || undefined);
    };
    Image.prototype.buildSizes = function () {
        if (this.props.sizes && this.widthDescriptorOnly) {
            return (this.props.sizes
                .map(function (size) {
                if (size.mediaCondition) {
                    return size.mediaCondition + " " + size.size;
                }
                return "" + size.size;
            })
                .join(",") || undefined);
        }
        return undefined;
    };
    Image.prototype.render = function () {
        return (React.createElement("img", { alt: this.props.alt, className: this.props.className, src: this.props.src, srcSet: this.buildSrcSet(), sizes: this.buildSizes(), ref: this.props.onRef }));
    };
    Image.propTypes = {
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
        className: PropTypes.string,
        srcSet: PropTypes.objectOf(function (props, propName, componentName) {
            if (!matcher_1.matchDescriptor(propName)) {
                return new Error("Invalid prop '" + propName + "' supplied to '" + componentName + "'. Validation failed.");
            }
            return null;
        }),
        sizes: PropTypes.arrayOf(PropTypes.shape({
            size: PropTypes.string.isRequired,
            mediaCondition: PropTypes.string,
        })),
        webp: PropTypes.bool,
        onRef: PropTypes.func,
    };
    Image.defaultProps = {
        alt: "",
    };
    return Image;
}(React.PureComponent));
exports.default = Image;
//# sourceMappingURL=Image.js.map