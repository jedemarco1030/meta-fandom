// import typescriptEslint from "@typescript-eslint/eslint-plugin";
// import unusedImports from "eslint-plugin-unused-imports";
// import tailwindcss from "eslint-plugin-tailwindcss";
// import simpleImportSort from "eslint-plugin-simple-import-sort";
// import jest from "eslint-plugin-jest";
// import jestFormatting from "eslint-plugin-jest-formatting";
// import testingLibrary from "eslint-plugin-testing-library";
// import jestDom from "eslint-plugin-jest-dom";
// import path from "node:path";
// import { fileURLToPath } from "node:url";
// import js from "@eslint/js";
// import { FlatCompat } from "@eslint/eslintrc";
// import { fixupPluginRules } from "@eslint/compat";
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//     baseDirectory: __dirname,
//     recommendedConfig: js.configs.recommended,
//     allConfig: js.configs.all
// });
//
// export default [
//     ...compat.extends("airbnb-base", "next/core-web-vitals", "plugin:prettier/recommended"),
//     {
//         rules: {
//             "prettier/prettier": ["error", {
//                 singleQuote: false,
//                 endOfLine: "auto",
//             }],
//         },
//     },
//     ...compat.extends(
//         "plugin:tailwindcss/recommended",
//         "airbnb",
//         "airbnb-typescript",
//         "next/core-web-vitals",
//         "plugin:prettier/recommended",
//     ).map(config => ({
//         ...config,
//         files: ["**/*.ts", "**/*.tsx"],
//     })),
//     {
//         files: ["**/*.ts", "**/*.tsx"],
//
//         plugins: {
//             "@typescript-eslint": typescriptEslint,
//             "unused-imports": unusedImports,
//             tailwindcss,
//             "simple-import-sort": simpleImportSort,
//         },
//
//         languageOptions: {
//             ecmaVersion: 5,
//             sourceType: "script",
//
//             parserOptions: {
//                 project: "./tsconfig.json",
//             },
//         },
//
//         rules: {
//             "prettier/prettier": ["error", {
//                 singleQuote: false,
//                 endOfLine: "auto",
//             }],
//
//             "import/extensions": "off",
//             "react/function-component-definition": "off",
//             "react/destructuring-assignment": "off",
//             "react/require-default-props": "off",
//             "react/jsx-props-no-spreading": "off",
//             "@typescript-eslint/comma-dangle": "off",
//             "@typescript-eslint/consistent-type-imports": "error",
//             "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
//             "import/prefer-default-export": "off",
//             "simple-import-sort/imports": "error",
//             "simple-import-sort/exports": "error",
//             "import/order": "off",
//             "@typescript-eslint/no-unused-vars": "off",
//             "unused-imports/no-unused-imports": "error",
//
//             "unused-imports/no-unused-vars": ["error", {
//                 argsIgnorePattern: "^_",
//             }],
//         },
//     },
//     ...compat.extends(
//         "plugin:jest/recommended",
//         "plugin:jest-formatting/recommended",
//         "plugin:testing-library/react",
//         "plugin:jest-dom/recommended",
//     ).map(config => ({
//         ...config,
//         files: ["**/*.test.ts", "**/*.test.tsx"],
//     })),
//     {
//         files: ["**/*.test.ts", "**/*.test.tsx"],
//
//         plugins: {
//             jest,
//             "jest-formatting": jestFormatting,
//             "testing-library": testingLibrary,
//             "jest-dom": jestDom,
//         },
//     },
// ];
