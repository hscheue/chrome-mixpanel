import {
  CSSProperties,
  ComponentProps,
  PropsWithChildren,
  ReactNode,
  createElement,
} from "react";

type GapVariant = 4 | 6 | 8 | 12 | 16;

type StackProps<T extends keyof JSX.IntrinsicElements = "span"> = {
  as?: T;
  col?: boolean;
  gap?: GapVariant;
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  children?: ReactNode | undefined;
} & ComponentProps<T>;

export default function Stack<T extends keyof JSX.IntrinsicElements = "div">({
  as,
  col,
  gap,
  alignItems,
  children,
  className,
  ...props
}: StackProps<T>) {
  return createElement(
    as || "div",
    {
      ...props,
      style: {
        display: "flex",
        alignItems: alignItems,
        gap: gap || 0,
        flexDirection: !!col ? "column" : "row",
      },
    },
    children
  );
}
