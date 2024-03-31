import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";

/** @type {import('rollup').RollupOptions} */
const devtoolsConfig = {
  input: "./src/Devtools.tsx",
  output: {
    dir: "./dist",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    replace({
      preventAssignment: true,
      values: {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      },
    }),
    postcss({ modules: true, extract: "styles.css" }),
    typescript(),
    terser(),
  ],
};

/** @type {import('rollup').RollupOptions} */
const manifestConfig = {
  input: "./manifest/devtools-page.ts",
  output: {
    dir: "./dist",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    terser(),
    copy({
      targets: [{ src: "public/**/*", dest: "dist" }],
    }),
    // copy({
    //   targets: [{ src: "manifest.json", dest: "dist" }],
    // }),
  ],
};

export default [devtoolsConfig, manifestConfig];
