import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GrFormClose } from 'react-icons/gr';

import MessageInput from './messageinput';
import NameInput from './nameinput';
import MessageFormatter from './messageformatter';
import useShoutBoxAndVideo from '../../hooks/useShoutboxAndVideo';

const wsURL = process.env.NEXT_PUBLIC_SHOUTBOX_SOURCE || 'ws://localhost:3030';

interface ShoutBoxProps {
  limit: number;
  isOpen: boolean;
}

export const ChatWrapper = () => {
  const { shoutboxOpen, setShoutboxOpen } = useShoutBoxAndVideo();

  const handleClose = () => {
    setShoutboxOpen(false);
  };

  return (
    <div
      className={`w-full flex-col items-center ${
        shoutboxOpen ? 'flex' : 'hidden'
      }`}
    >
      <div className="flex w-full max-w-6xl items-end justify-end">
        <button
          onClick={handleClose}
          title="chat"
          className="mr-5 mt-5 h-10 w-10 rounded-full bg-coral"
        >
          <GrFormClose size="1.7rem" className="mx-auto" />
        </button>
      </div>

      <Chat limit={100} isOpen={true} />
    </div>
  );
};

const Chat = ({ limit, isOpen }: ShoutBoxProps) => {
  const [name, setName] = useState('');
  const [isAdmin, setAdmin] = useState(false);
  const [messages, setMessages] = useState([]);
  const [wsConnected, setWsConnected] = useState(false);
  const webSocket = useRef<WebSocket>(null);
  const messagesViewport = useRef(null);

  const addMessage = useCallback(
    (message: any) => {
      setMessages((messages) => [...messages, message].slice(-limit));
      scrollToBottom();
    },
    [limit]
  );

  useEffect(() => {
    // Connect client
    webSocket.current = new WebSocket(wsURL);
    webSocket.current.onopen = () => {
      webSocket.current.send(
        JSON.stringify({
          type: 'reload',
        })
      );

      if (!!name) {
        handleSubmitName(name);
      }

      setWsConnected(true);
    };

    // When receiving a message
    webSocket.current.onmessage = (e: any) => {
      if (e.data === 'PING') {
        return webSocket.current.send('PONG');
      }

      const { type, name, message } = JSON.parse(e.data);

      if (type === 'message' && name && message) {
        addMessage({ name, message });
      } else if (type === 'admin') {
        setAdmin(true);
      }
      // delete all messages from the banned person, unless this is them
      else if (type === 'ban' && name === 'Toimitus' && message !== name) {
        setMessages(messages.filter((m) => m.name !== message));
      }
      // load 20 newest messages on connect
      else if (type === 'reload' && name === 'Palvelin' && message) {
        message.forEach((m: any) => {
          addMessage(m);
        });
      }
    };

    // When connection closes
    webSocket.current.onclose = () => {
      const timer = setTimeout(() => setWsConnected(false), 5000);
      return () => clearTimeout(timer);
    };

    // scrollToBottom();
  }, [addMessage, messages, name]);

  function submitMessage(messageString: string) {
    // on submitting the MessageSend form, send the message, add it to the list and reset the input
    const message = {
      type: 'message',
      name: name,
      message: messageString,
    };
    webSocket.current.send(JSON.stringify(message));
  }

  function handleSubmitName(name: string) {
    const message = {
      type: 'init',
      name,
    };

    webSocket.current.send(JSON.stringify(message));
  }

  function handleBanClick(name: string) {
    const message = {
      type: 'ban',
      name: name,
      message: name,
    };

    webSocket.current.send(JSON.stringify(message));
  }

  function scrollToBottom() {
    const el = messagesViewport.current;
    if (el) {
      el.scrollTo(0, el.scrollHeight);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="mx-auto flex h-96 w-full max-w-6xl py-6 px-[25px] md:h-[38rem]">
      <div className="my-0 mx-auto h-auto w-full flex-wrap overflow-auto overflow-x-hidden shadow-md">
        <div
          className="h-[81%] overflow-auto overflow-x-hidden py-2 px-0 text-white md:h-[85%]"
          ref={messagesViewport}
        >
          {messages.map((message, index) => (
            <MessageFormatter
              key={index}
              message={message.message}
              name={message.name}
              color={index % 2 === 0 ? 'bg-blue' : 'bg-blue-light'}
              isAdmin={isAdmin}
              onBanClick={handleBanClick}
            />
          ))}
          {!wsConnected && (
            <div className=" m-4 text-center text-white">
              Ei yhteyttä chat-palvelimeen
            </div>
          )}
        </div>
        <div className="h-[4rem] w-full">
          {name ? (
            <MessageInput
              name={isAdmin ? 'Toimitus' : name}
              onSubmitMessage={(messageString: string) =>
                submitMessage(messageString)
              }
            />
          ) : (
            <NameInput
              onSubmitName={(name: string) => {
                handleSubmitName(name);
                setName(name);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWrapper;
