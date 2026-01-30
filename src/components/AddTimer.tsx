import { useRef, type FC } from "react";
import Form, { type FormApi } from "../ui/Form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useTimersContext } from "../store/timers-context";

const AddTimer: FC = function () {
  const form = useRef<FormApi>(null);
  const { addTimer } = useTimersContext();

  function handleSaveTimer(data: unknown) {
    const extractedData = data as { name: string; duration: string };
    addTimer({
      name: extractedData.name,
      duration: Number(extractedData.duration),
    });
    form.current?.clear();
  }

  return (
    <Form ref={form} onSave={handleSaveTimer} id="add-timer">
      <Input type="text" label="Name" id="name" name="name" />
      <Input type="number" label="Duration" id="duration" name="duration" />
      <p>
        <Button>Add Timer</Button>
      </p>
    </Form>
  );
};

export default AddTimer;
