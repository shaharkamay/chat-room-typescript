import React from "react";
import { InvalidMessageType } from "../../types/form";

function InvalidMessage({ id, value }: InvalidMessageType) {
  return (
    <span className="invalid-message" id={id}>{value || ''}</span>
  );
}

export default InvalidMessage;