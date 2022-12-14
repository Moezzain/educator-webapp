import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Message } from '@chatscope/chat-ui-kit-react';
import ReactAudioPlayer from 'react-audio-player';
import { darkStyles, lightStyles } from '../../styles/chatStyles';
import { formatMessages } from './helpers';
import CustomSeparator from '../../components/CustomSeparator';
import Linkify from 'react-linkify';

import { getChatsAction } from '../../redux/reducers/chatsReducer';
import { useSelector, useDispatch } from 'react-redux';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import { IconButton } from '@material-ui/core';
const Chat = () => {
  const dispatch = useDispatch();
  const [localMessages, setLocalMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lang, setLang] = useState({
    ar: {
      messageCount: 'عدد الرسائل',
      usageDuration: 'مدة الاستخدام',
      emptyConvo: 'المحادثة فارغة',
    },
  });

  const { token, educatorId, darkMode, admin } = useSelector(
    (state) => state.auth
  );
  const { messages, loading, currentChat } = useSelector(
    (state) => state.chats
  );

  const localStyles = !darkMode ? lightStyles : darkStyles;
  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
  useEffect(() => {
    let chatId = currentChat;
    if (admin) {
      dispatch(
        getChatsAction({
          chatId,
          token,
          educatorId,
          adminId: educatorId,
        })
      );
    } else {
      dispatch(
        getChatsAction({
          chatId,
          token,
          educatorId,
        })
      );
    }
  }, [currentChat]);
  useEffect(() => {
    if (messages) {
      const allMessagesAndDuration = formatMessages(messages);
      setDuration(allMessagesAndDuration.duration);
      const messagesAndDuration = formatMessages(messages.slice(messages.length - 30, messages.length));
      setLocalMessages(messagesAndDuration.formatedMessages.reverse());
      setPage(1)
    }
  }, [messages]);

  const olderMessages = () => {
    const messagesAndDuration = formatMessages(messages.slice(messages.length - 30 - (30 * page), messages.length - (30 * page)));
    let tempLocalMessages = JSON.parse(JSON.stringify(messagesAndDuration.formatedMessages.reverse()));
    setLocalMessages(tempLocalMessages);
    setPage(page + 1)
  }

  const newerMessages = () => {
    const messagesAndDuration = formatMessages(messages.slice(messages.length - 30 - (30 * (page - 2)), messages.length - (30 * (page - 2))));
    let tempLocalMessages = JSON.parse(JSON.stringify(messagesAndDuration.formatedMessages.reverse()));
    setLocalMessages(tempLocalMessages);
    setPage(page - 1)
  }

  return (
    <div style={localStyles.root}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={localStyles.statsDiv}>
          {messages.length} :{lang.ar.messageCount} <br />
          {lang.ar.usageDuration}: {duration} {'يوم'}
        </div>
        {loading ? (
          <CircularProgress animation="border" />
        ) : !localMessages.length ? (
          <div style={localStyles.emptyMessages}>{lang.ar.emptyConvo} </div>
        ) : null}
      </div>
      <div style={localStyles.chatDiv}>
        <div style={localStyles.chatScrollDiv}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
              style={localStyles.iconsButton}
              aria-label="newer"
              onClick={() => {
                if (page != 1)
                  newerMessages();
              }}
            >
              <NavigateBeforeIcon style={styles.icons} fontSize="large" />
            </IconButton>
            <div style={localStyles.emptyMessages}>{page} - {Math.ceil(messages.length / 30)} </div>
            <IconButton
              style={localStyles.iconsButton}
              aria-label="older"
              onClick={() => {
                olderMessages();
              }}
            >
              <NavigateNextIcon style={styles.icons} fontSize="large" />
            </IconButton>
          </div>
          {localMessages.map((message) => (
            <div key={message.id}>
              {message.message?.date && (
                <CustomSeparator
                  date={message.message.date}
                  darkMode={darkMode}
                />
              )}
              {message.message?.image ? (
                <Message
                  model={{
                    message: message.message.text,
                    direction: message.userId,
                  }}
                >
                  <Message.ImageContent
                    src={message.message.image}
                    alt={
                      "The image isn't working link: " + message.message.image
                    }
                    width={400}
                  />
                </Message>
              ) : message.message?.audio ? (
                <Message
                  model={{
                    message: message.message.text,
                    direction: message.userId,
                    type: 'image',
                  }}
                >
                  <Message.CustomContent>
                    <ReactAudioPlayer src={message.message.audio} controls />
                  </Message.CustomContent>
                </Message>
              ) : message.message?.file ? (
                <Message
                  model={{
                    message: message.message.text,
                    direction: message.userId,
                  }}
                >
                  <Message.CustomContent>
                    <a
                      href={message.message.file}
                      target="_blank"
                      download
                      rel="noreferrer"
                    >
                      {message.message.text}
                    </a>
                  </Message.CustomContent>
                  <Message.Footer>
                    <div style={localStyles.messageFooter}>
                      {new Date(
                        Date.parse(message.message.createdOn)
                      ).toLocaleTimeString()}
                    </div>
                  </Message.Footer>
                </Message>
              ) : (
                <Message
                  model={{
                    message: message.message.text,
                    direction: message.userId,
                  }}
                >
                  <Message.CustomContent>
                    <div style={localStyles.customMessage}>
                      <Linkify componentDecorator={componentDecorator}>
                        {message.message.text}
                      </Linkify>
                    </div>
                  </Message.CustomContent>
                  <Message.Footer>
                    <div style={localStyles.messageFooter}>
                      {new Date(
                        Date.parse(message.message.createdOn)
                      ).toLocaleTimeString()}
                    </div>
                  </Message.Footer>
                </Message>
              )}
            </div>
          ))}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
              style={localStyles.iconsButton}
              aria-label="newer"
              onClick={() => {
                if (page != 1)
                  newerMessages();
              }}
            >
              <NavigateBeforeIcon style={styles.icons} fontSize="large" />
            </IconButton>
            <div style={localStyles.emptyMessages}>{page} - {Math.ceil(messages.length / 30)} </div>
            <IconButton
              style={localStyles.iconsButton}
              aria-label="older"
              onClick={() => {
                olderMessages();
              }}
            >
              <NavigateNextIcon style={styles.icons} fontSize="large" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
