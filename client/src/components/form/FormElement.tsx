// import React, { useState } from "react";
import React from "react";

import { FormElementType } from "../../types/form";
// import InvalidMessage from "./InvalidMessage";

function FormElement({ labelValue, type, id, placeholder, state, setState, handleBlur }: FormElementType) {
  // const [error, setError] = useState();
  return (
    <div className="form-element">
      <label htmlFor={id}>{labelValue}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={state}
        onChange={e => setState(e.target.value)}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        // onBlur={e => handleBlur(e, setError)}
        onBlur={e => handleBlur(e)}
      />
      {/* <InvalidMessage id={`${id}-invalid-message`} value={error} /> */}
    </div>
  );
}

export default FormElement;
