import { useState } from "react";

type ValidateProps = {
  email: { regex: RegExp; message: string };
  password: { regex: RegExp; message: string };
};

type TypeProps = "email" | "password" | "notRequired";

const types: ValidateProps = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "E-mail inválido",
  },
  password: {
    regex:
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[A-Z])(?=.*\d).{6,}$/,
    message:
      "Mínimo 6 caracteres, um caractere especial, uma letra maiúscula e um número",
  },
};

export const useForm = (type?: TypeProps) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  function validate(value: string) {
    if (type === "notRequired") return true;

    if (value.length === 0) {
      setError("Preencha um valor");
      return false;
    } else if (
      value.length !== 0 &&
      types[type!] &&
      !types[type!].regex.test(value)
    ) {
      setError(types[type!].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    error,
    setValue,
    onChange,
    onBlur: () => validate(value),
    validate: () => validate(value),
  };
};
