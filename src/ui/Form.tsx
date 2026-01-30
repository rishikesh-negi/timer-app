import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ComponentPropsWithoutRef,
  type FormEvent,
} from "react";

export type FormApi = {
  clear: () => void;
};

type FormProps = ComponentPropsWithoutRef<"form"> & {
  onSave: (value: unknown) => void;
};

const Form = forwardRef<FormApi, FormProps>(function (
  { children, id, onSave },
  ref,
) {
  const formElementRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    clear: () => formElementRef.current?.reset(),
  }));

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data);
  }

  return (
    <form ref={formElementRef} onSubmit={handleSubmit} id={id}>
      {children}
    </form>
  );
});

export default Form;
