/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:node/recommended",
    "prettier",
  ],

  plugins: ["@typescript-eslint", "import", "node"],

  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },

  env: {
    node: true,
    es2020: true,
  },

  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
        paths: {
          "@/*": ["./src/*"],
        },
      },
    },
    node: {
      tryExtensions: [".ts", ".js", ".json", ".node"],
    },
  },

  rules: {
    // Previous rules remain the same
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "@/**",
            group: "internal",
          },
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "no-console": "off",
    "prefer-const": "error",
    "no-var": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^T$",
      },
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 0,
      },
    ],
    eqeqeq: ["error", "always"],
    curly: ["error", "all"],
    "no-throw-literal": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off", // Changed to off since it's used in middleware
    "import/no-default-export": "off", // Changed to off since default exports are used
    "import/no-duplicates": "error",
    // Updated Node.js version target
    "node/no-unsupported-features/es-syntax": [
      "error",
      {
        version: ">=14.0.0",
        ignores: ["modules", "dynamicImport"],
      },
    ],
    "node/no-missing-import": "off",
    "node/no-unpublished-import": "off",
    "@typescript-eslint/no-floating-promises": "error",
    "no-return-await": "off",
    "@typescript-eslint/return-await": ["error", "in-try-catch"],
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": [
      "error",
      {
        allow: ["constructors"],
      },
    ],
    "node/no-process-exit": "error",
    "node/no-path-concat": "error",
    "node/no-new-require": "error",
    "import/no-unresolved": "warn", // TODO: fix this eslint
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          "{}": {
            message: "Use object instead",
            fixWith: "object",
          },
        },
      },
    ],
  },
};
