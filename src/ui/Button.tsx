import type { ComponentPropsWithoutRef, FC } from "react";

function isAnchorProps(props: AnchorProps | ButtonProps): props is AnchorProps {
  return "href" in props;
}

type AnchorProps = {
  type?: never;
  disabled?: never;
} & ComponentPropsWithoutRef<"a">;

type ButtonProps = {
  href?: never;
  disabled?: boolean;
} & ComponentPropsWithoutRef<"button">;

const Button: FC<ButtonProps | AnchorProps> = function (props) {
  if (isAnchorProps(props)) return <a className="button" {...props}></a>;
  return <button className="button" {...props}></button>;
};

export default Button;
