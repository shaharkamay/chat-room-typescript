import { Dispatch, FormEventHandler, SetStateAction } from "react";

export type FormProps = {
  containerClass: string,
  id: string,
  title: string,
  formElements: FormElementType[],
  submitValue: string,
  handleSubmit: FormEventHandler,
};

export type FormElementType = {
  labelValue: string,
  type: string,
  id: string
  placeholder: string,
  state: string,
  setState: Dispatch<SetStateAction<string>>,
  handleBlur: ((e: { target: { value: string; }; }) => void),
};

export type InvalidMessageType = {
  id: string,
  value: string,
};