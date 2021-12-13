import React from "react";
import { Link } from "react-router-dom"; // Link will switch <a> tag

function Item({ linkName, link }: Record<string, string>) {
  return (
    <li className="nav__item">
      <Link className="nav__link" to={link}>{linkName}</Link>
    </li>
  );
}

export default Item;