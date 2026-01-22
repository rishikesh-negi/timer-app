import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerProps<T extends ElementType> = {
  asElement?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

function Container<C extends ElementType>({
  children,
  asElement,
  ...props
}: ContainerProps<C>) {
  const Container = asElement || "div";

  return <Container {...props}>{children}</Container>;
}

export default Container;
