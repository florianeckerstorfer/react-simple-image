"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REGEXP_DECIMAL_NUMBER = /\d+(?:\.\d+)?/;
var REGEXP_DESCRIPTOR_WIDTH = new RegExp("^" + REGEXP_DECIMAL_NUMBER.source + "w$");
var REGEXP_DESCRIPTOR_PIXEL = new RegExp("^" + REGEXP_DECIMAL_NUMBER.source + "x$");
var REGEXP_DESCRIPTOR_WIDTH_AND_PIXEL = new RegExp("^" + REGEXP_DECIMAL_NUMBER.source + "[wx]$");
function matchWidthDescriptor(str) {
    return REGEXP_DESCRIPTOR_WIDTH.test(str);
}
exports.matchWidthDescriptor = matchWidthDescriptor;
function matchPixelDescriptor(str) {
    return REGEXP_DESCRIPTOR_PIXEL.test(str);
}
exports.matchPixelDescriptor = matchPixelDescriptor;
function matchDescriptor(str) {
    return REGEXP_DESCRIPTOR_WIDTH_AND_PIXEL.test(str);
}
exports.matchDescriptor = matchDescriptor;
//# sourceMappingURL=matcher.js.map