import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import '../../assets/styles/chat.scss';
import ChatAside from './ChatAside';
import ChatBox from './ChatBox';
import { EventSourcePolyfill } from 'event-source-polyfill';
import BASE_URL from '../../index';
import { Message as MessageType } from '../../types/message';

function Chat() {
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const loggedIn = authContext?.loggedIn;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const accessToken = authContext?.accessToken;

  const [messages, setMessages] = useState<MessageType[]>([]);

  const [online, setOnline] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) navigate('/');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const source = new EventSourcePolyfill(`${BASE_URL || ''}/api/chat/message`, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      headers: { "Content-Type": "text/event-stream", auth: accessToken || '' },
    });

    source.onopen = function () {
      console.log("connection to stream has been opened");
    };
    source.onerror = function (error) {
      console.log("An error has occurred while receiving stream", error);
    };
    source.onmessage = function (event) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = JSON.parse(event.data);
      if (data.messages) {
        setMessages(data.messages);
      }
      if (data.newMessage) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        setMessages(messages => [...messages, data.newMessage]);
      }
      if (data.online) {
        setOnline(data.online);
      }
    };
  }, [accessToken, loggedIn, navigate]);

  return (
    <div className="chat">
      <div className="chat-container row-large">
        <ChatAside online={online} />
        <ChatBox messages={messages} />
      </div>
    </div>
  );
}

export default Chat;
