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

const Chat = () => {
  const dispatch = useDispatch();
  const [localMessages, setLocalMessages] = useState([]);
  const [duration, setDuration] = useState(0);
  const [lang, setLang] = useState({
    ar: {
      messageCount: 'عدد الرسائل',
      usageDuration: 'مدة الاستخدام',
      emptyConvo: 'المحادثة فارغة',
    },
  });

  const { token, educatorId, darkMode } = useSelector((state) => state.auth);
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
    dispatch(
      getChatsAction({
        chatId,
        token,
        educatorId,
      })
    );
  }, [currentChat]);
  useEffect(() => {
    const messagesAndDuration = formatMessages(messages)
    setLocalMessages(messagesAndDuration.formatedMessages.reverse());
    setDuration(messagesAndDuration.duration)
  }, [messages]);
  return (
    <div style={localStyles.root}>
      <div style={{display:'flex', flexDirection:'row'}}>

      <div style={localStyles.statsDiv}>
        {localMessages.length} :{lang.ar.messageCount} <br />
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
          {localMessages.map((message) => (
            <div key={message.id}>
              {message.message?.date && (
                <CustomSeparator
                  date={message.message.date}
                  darkMode={darkMode}
                />
              )}
              {message.message?.image ? (
                <Message.ImageContent
                  src={message.message.image}
                  alt={"The image isn't working link: " + message.message.image}
                  width={400}
                />
              ) : message.message?.audio ? (
                <ReactAudioPlayer src={message.message.audio} controls />
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
                      {new Date(Date.parse(message.message.createdOn)).toLocaleTimeString()}
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
                      {new Date(Date.parse(message.message.createdOn)).toLocaleTimeString()}
                    </div>
                  </Message.Footer>
                </Message>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
