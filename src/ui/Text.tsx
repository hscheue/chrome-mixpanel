import { ComponentProps, ReactNode, createElement } from "react";
import clsx from "clsx";
import _styles from "./Text.module.scss";

const styles: Record<string, string> = _styles;

type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "small"
  | "note";

type TextProps<T extends keyof JSX.IntrinsicElements = "span"> = {
  as?: T;
  children?: ReactNode | undefined;
  clamp?: 1 | 2 | 3;
  variant?: TextVariant;
} & ComponentProps<T>;

export default function Text<T extends keyof JSX.IntrinsicElements = "span">({
  as,
  children,
  clamp,
  variant,
  className,
  ...props
}: TextProps<T>) {
  const style =
    (variant && styles[variant]) || (as && styles[as]) || styles.body;
  const clampStr = clamp && styles[`clamp-${clamp}`];
  return createElement(
    as || "span",
    { ...props, className: clsx(style, clampStr, className) },
    children
  );
}
