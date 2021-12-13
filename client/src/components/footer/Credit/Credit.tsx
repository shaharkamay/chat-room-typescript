import React from 'react';
import ghLogo from '../../../assets/images/GitHub-Mark-32px.png';

function Credit({ ghName, ghLink }: Record<string, string>) {
  return (
    <a className="copyright-link" href={ghLink} target="_blank" rel="noopener noreferrer">
      <span>{ghName}</span>
      <img src={ghLogo} className="github-img" alt="" />
    </a>
  );
}

export default Credit;