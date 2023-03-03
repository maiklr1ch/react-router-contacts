import { useState } from "react";

export function useInput(initialValue, ...onInputCallbacks) {
  const [value, setValue] = useState(initialValue ?? '');
  const onInput = (e) => {
    setValue(e.target.value);
    onInputCallbacks.forEach(func => func());
  }
  return { value, onInput };
}