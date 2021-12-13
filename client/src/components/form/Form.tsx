import React from 'react';
import FormElement from './FormElement';
import '../../assets/styles/form.scss';
import { FormElementType, FormProps } from '../../types/form';

function Form({ containerClass, id, title, formElements, submitValue, handleSubmit }: FormProps) {

  return (
    <div className={containerClass}>
      <form id={id} className="form" onSubmit={handleSubmit}>
        <h2>{title}</h2>
        {formElements.map(({ labelValue, type, id, placeholder, state, setState, handleBlur }: FormElementType, i) =>
          <FormElement
            labelValue={labelValue}
            type={type}
            id={id}
            placeholder={placeholder}
            key={`${i}`}
            state={state}
            setState={setState}
            handleBlur={handleBlur}
          />
        )}
        <div className="form-element">
          <button className="default--button">{submitValue}</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
