import React, { useState, useContext, FormEvent } from "react";
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import BASE_URL from "../../index";

function SendMessage() {
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const accessToken = authContext?.accessToken;

  const [sendMessage, setSendMessage] = useState('');
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axios.post(
      `${BASE_URL}/api/chat/message`,
      {
        content: sendMessage,
      },
      {
        headers: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          auth: accessToken || '',
        }
      }
    );
    setSendMessage('');
  };
  return (
    <div className="send-message">
      <form className="send-message__form" onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="Type a message"
          value={sendMessage}
          onChange={e => setSendMessage(e.target.value)}
          className="send-message__input"
        />
        <button className="send-message__button">
          <svg className="send-svg">
            <path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default SendMessage;
