// Stylelint config rules
module.exports = {
    "plugins": [
        "stylelint-order"
    ],
    "rules": {

        "order/order": [
            {
                "type": "at-rule",
                "name": "include"
            },
            "custom-properties",
            "declarations",
            "rules",
            {
                "type": "at-rule",
                "name": "media",
                "hasBlock": true
            },
        ],
        "order/properties-order": [
            {
                "emptyLineBefore": "never",
                "properties": [
                    "content",
                    "font-awesome"
                ]
            },
            {
                "emptyLineBefore": "never",
                "properties": [
                    "position",
                    "top",
                    "right",
                    "bottom",
                    "left",
                    "z-index"
                ]
            },
            {
                "emptyLineBefore": "never",
                "properties": [
                    "flex-basis",
                    "flex-grow",
                    "flex-shrink",
                    "flex",
                    "flex-direction",
                    "flex-flow",
                    "flex-wrap",
                    "justify-content",
                    "align-content",
                    "align-items",
                    "align-self",
                    "order"
                ]
            },
            {
                "emptyLineBefore": "never",
                "properties": [
                    "box-sizing",
                    "display",
                    "table-layout",
                    "clear",
                    "float",
                    "margin",
                    "margin-top",
                    "margin-right",
                    "margin-bottom",
                    "margin-left",
                    "padding",
                    "padding-top",
                    "padding-right",
                    "padding-bottom",
                    "padding-left",
                    "width",
                    "min-width",
                    "max-width",
                    "height",
                    "min-height",
                    "max-height",
                ]
            },
            {
                "emptyLineBefore": "never",
                "properties": [
                    "border",
                    "border-color",
                    "border-top",
                    "border-right",
                    "border-bottom",
                    "border-left",
                    "border-radius",
                    "border-top-left-radius",
                    "border-top-right-radius",
                    "border-bottom-right-radius",
                    "border-bottom-left-radius",
                    "box-shadow",
                ]
            },
            {
                "emptyLineBefore": "never",
                "properties": [
                    "appearance",
                    "background",
                    "background-attachment",
                    "background-blend-mode",
                    "background-color",
                    "background-image",
                    "background-position",
                    "background-repeat",
                    "background-size",
                ]
            },
            {
                "emptyLineBefore": "never",
                "properties": [
                    "font-family",
                    "font-size",
                    "font-style",
                    "font-weight",
                    "letter-spacing",
                    "list-style",
                    "list-style-position",
                    "line-height",
                    "text-align",
                    "text-decoration",
                    "text-indent",
                    "text-overflow",
                    "text-transform"
                ]
            },
            {
                "emptyLineBefore": "never",
                "properties": [
                    "clip",
                    "color",
                    "cursor",
                    "fill",
                    "mix-blend-mode",
                    "opacity",
                    "overflow",
                    "overflow-x",
                    "overflow-y",
                    "overflow-scrolling",
                    "visibility",
                    "will-change"
                ]
            },
            {
                "emptyLineBefore": "never",
                "properties": [
                    "animation",
                    "animation-delay",
                    "animation-direction",
                    "animation-duration",
                    "animation-fill-mode",
                    "animation-iteration-count",
                    "animation-name",
                    "animation-play-state",
                    "animation-timing-function",
                    "transform",
                    "transition"
                ]
            }
        ],




        "color-hex-case": "lower",
        "color-hex-length": "long",
        "color-no-invalid-hex": true,

        "font-family-name-quotes": "always-unless-keyword",
        "font-family-no-duplicate-names": true,
        "font-family-no-missing-generic-family-keyword": true,

        "function-calc-no-unspaced-operator": true,
        "function-comma-newline-after": "always-multi-line",
        "function-comma-newline-before": "never-multi-line",
        "function-comma-space-after": "always",
        "function-comma-space-before": "never",
        "function-linear-gradient-no-nonstandard-direction": true,
        "function-max-empty-lines": 0,
        "function-name-case": "lower",
        "function-parentheses-space-inside": "never",
        "function-url-quotes": "always",
        "function-whitespace-after": "always",

        // "number-leading-zero": "always",
        // "number-no-trailing-zeros": true,
        // "length-zero-no-unit": true,

        "string-no-newline": true,
        "string-quotes": "double",

        "unit-case": "lower",
        "unit-no-unknown": true,

        "value-keyword-case": "lower",
        "value-list-comma-newline-after": "always-multi-line",
        "value-list-comma-newline-before": "never-multi-line",
        "value-list-comma-space-after": "always-single-line",
        "value-list-comma-space-before": "never",
        "value-list-max-empty-lines": 0,
        "value-no-vendor-prefix": true,

        "property-case": "lower",
        "property-no-vendor-prefix": true,

        "keyframe-declaration-no-important": true,

        "declaration-bang-space-after": "never",
        "declaration-bang-space-before": "always",
        "declaration-colon-space-after": "always-single-line",
        "declaration-colon-space-before": "never",

        "declaration-block-no-duplicate-properties": true,
        "declaration-block-no-shorthand-property-overrides": true,
        "declaration-block-semicolon-newline-after": "always",
        "declaration-block-semicolon-newline-before": "never-multi-line",
        "declaration-block-semicolon-space-after": "always-single-line",
        "declaration-block-semicolon-space-before": "never",
        "declaration-block-trailing-semicolon": "always",

        "block-closing-brace-empty-line-before": "never",
        "block-closing-brace-newline-after": "always",
        "block-closing-brace-newline-before": "always",
        "block-closing-brace-space-after": "always-single-line",
        "block-closing-brace-space-before": "always-single-line",
        "block-no-empty": true,
        "block-opening-brace-newline-after": "always",
        "block-opening-brace-space-after": "always-single-line",
        "block-opening-brace-space-before": "always",

        "selector-attribute-brackets-space-inside": "never",
        "selector-attribute-operator-space-after": "never",
        "selector-attribute-operator-space-before": "never",
        "selector-attribute-quotes": "always",
        "selector-combinator-space-after": "always",
        "selector-combinator-space-before": "always",
        "selector-descendant-combinator-no-non-space": true,
        "selector-max-id": 1,
        "selector-pseudo-class-case": "lower",
        "selector-pseudo-class-no-unknown": true,
        "selector-pseudo-class-parentheses-space-inside": "never",
        "selector-pseudo-element-case": "lower",
        "selector-pseudo-element-colon-notation": "double",
        "selector-pseudo-element-no-unknown": true,
        "selector-type-case": "lower",
        "selector-type-no-unknown": true,
        "selector-max-empty-lines": 0,

        "selector-list-comma-newline-after": "always",
        "selector-list-comma-newline-before": "never-multi-line",
        "selector-list-comma-space-after": "always-single-line",
        "selector-list-comma-space-before": "never",

        "rule-empty-line-before": ["always", {
             "except": ["first-nested"],
             "ignore": ["after-comment"]
         }],

        "media-feature-colon-space-after": "always",
        "media-feature-colon-space-before": "never",
        "media-feature-name-case": "lower",
        "media-feature-name-no-unknown": true,
        "media-feature-name-no-vendor-prefix": true,
        "media-feature-parentheses-space-inside": "never",
        "media-feature-range-operator-space-after": "always",
        "media-feature-range-operator-space-before": "always",

        "media-query-list-comma-newline-after": "always-multi-line",
        "media-query-list-comma-newline-before": "never-multi-line",
        "media-query-list-comma-space-after": "always-single-line",
        "media-query-list-comma-space-before": "never-single-line",

        "at-rule-empty-line-before": ["always", {
             "except": [
                 "first-nested",
                 "blockless-after-blockless"
             ],
             "ignore": ["after-comment"]
         }],
        "at-rule-name-case": "lower",
        "at-rule-name-space-after": "always",
        "at-rule-no-unknown": [true, {
            "ignoreAtRules": [
                "mixin",
                "define-mixin",
                "include",
                "content",
                "rules"
            ]
        }],
        "at-rule-no-vendor-prefix": true,
        "at-rule-semicolon-newline-after": "always",

        "comment-no-empty": true,

        "indentation": 2,

        "max-empty-lines": 2,
        "no-duplicate-selectors": true,
        "no-duplicate-at-import-rules": true,
        "no-empty-source": true,
        "no-eol-whitespace": true,
        "no-extra-semicolons": true,
        // "no-invalid-double-slash-comments": true,
        // "no-missing-end-of-source-newline": true
    }
}