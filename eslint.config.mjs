import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // 1) Define ignored files first
  {
    ignores: [
      // Adjust path as needed; for example if it's "components/ui/*.tsx":
      "components/ui/*.tsx",
    ],
  },
  // 2) Spread in core Next.js + TypeScript configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // 3) Optionally override or add rules after
  {
    rules: {
      // Allow apostrophes and quotes in JSX without escaping
      "react/no-unescaped-entities": "off",
    },
  },
];
