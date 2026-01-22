import { forwardRef, type ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  id: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function (
  { label, type, id, name, ...props },
  ref,
) {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} name={name} ref={ref} {...props} />
    </p>
  );
});

export default Input;
