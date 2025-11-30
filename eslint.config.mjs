import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Enforce absolute imports using @/ alias - disallow parent directory traversal
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message: "Please use absolute imports with @/ alias instead of relative imports (e.g., '@/app/components/MyComponent' instead of '../components/MyComponent'). Same-folder imports (e.g., './MyComponent') are allowed.",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
