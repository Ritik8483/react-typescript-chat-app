import React from "react";
import Form from "react-bootstrap/Form";

export interface inputFieldProps {
  name: string;
  placeholder: string;
  controlId: string;
  value: string;
  onChange: string | any;
  isValid: boolean | undefined;
  isInvalid: boolean;
  type: string;
  error: string | undefined;
  label: string;
  className: string;
}

const InputField = (props: inputFieldProps) => {
  const {
    name,
    placeholder,
    value,
    onChange,
    type,
    isValid,
    controlId,
    isInvalid,
    error,
    label,
    className,
  } = props;

  return (
    <div>
      <Form.Group className={className} controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
          isValid={isValid}
          isInvalid={isInvalid}
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

export default InputField;
