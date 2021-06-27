import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageSeparator,
} from '@chatscope/chat-ui-kit-react';
import ReactAudioPlayer from 'react-audio-player';
import { darkStyles, lightStyles } from '../styles/chatStyles';

import { getChatsAction } from '../redux/reducers/chatsReducer';
import { useSelector, useDispatch } from 'react-redux';

const imgTypes = ['png', 'jpg', 'jpeg', 'gif'];
const fileTypes = ['pdf', 'doc', 'docx'];
const audioTypes = ['mp3', '3gp', 'caf', 'wav', 'wave', 'm4a', 'aac'];

const Chat = (props) => {
  const dispatch = useDispatch();
  const [localMessages, setLocalMessages] = useState([]);
  const [duration, setDuration] = useState(0);
  const [lang, setLang] = useState({
    ar: {
      messageCount: 'عدد الرسائل',
      usageDuration: 'مدة الاستخدام',
    },
  });

  const { token, educatorId, darkMode } = useSelector((state) => state.auth);
  const { messages, loading, currentChat } = useSelector(
    (state) => state.chats
  );

  const localStyles = !darkMode ? lightStyles : darkStyles;

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
    setLocalMessages(formatMessages(messages));
  }, [messages]);
  useEffect(() => {
    calcDuration(localMessages);
  }, [localMessages]);

  const calcDuration = (messages = []) => {
    if (messages && messages.length > 0) {
      let first = new Date(messages[0].message.createdOn);
      let last = new Date(messages[messages.length - 1].message.createdOn);
      const diffTime = Math.abs(last - first);
      const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDuration(duration);
    }
  };
  const formatMessages = (messages = []) => {
    let formatedMessages = [];
    let date;
    for (var i in messages) {
      let message = {};
      Object.assign(message, messages[i]);
      let id = parseInt(message.user._id) - 1;
      if (message.media) {
        var fileNameArr = message.media.split('.');
        var fileExtension = fileNameArr[fileNameArr.length - 1];
        var isImg = imgTypes.includes(fileExtension.split('?')[0]);
        var isFile = fileTypes.includes(fileExtension.split('?')[0]);
        var isAudio = audioTypes.includes(fileExtension.split('?')[0]);
        if (isImg) {
          if (date !== message.createdOn.split('T')[0]) {
            message.message = { image: message.media };
            message.message.date = message.createdOn.split('T')[0];
            date = message.createdOn.split('T')[0];
          } else {
            message.message = { image: message.media };
            message.message.text = message.text;
          }
          delete message.media;
        } else if (isFile) {
          message.message = { text: message.text, file: message.media };
          delete message.media;
        } else if (isAudio) {
          message.media = message.media.replace('vnd.wave', 'wav');
          message.message = { audio: message.media };
          message.message.text = message.text;
          delete message.media;
        } else {
          message.message = {
            text: 'this link is corrupted: ' + message.media,
          };
        }
      } else if (message.text) {
        if (date !== message.createdOn.split('T')[0]) {
          message.message = { text: message.text };
          message.message.date = message.createdOn.split('T')[0];
          date = message.createdOn.split('T')[0];
        } else message.message = { text: message.text };
      } else {
        message.message = { text: '' };
      }
      message.message.createdOn = message.createdOn;
      let userId;
      if (id === 0) userId = 'outgoing';
      else userId = 'incoming';
      const createdOn = message.message.createdOn.split('T');
      message.message.createdOn = createdOn;
      let formattedMessage = { userId, message: message.message };

      formatedMessages.push(formattedMessage);
    }
    return formatedMessages;
  };
  const customSeparator = (date) => {
    const d = new Date(date)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (
      <div
        style={localStyles.separatorDiv}
      >
        <div style={localStyles.leftLine} />
        <div style={localStyles.date}>
          {date}, {days[d.getDay()]}
        </div>
        <div
          style={localStyles.rightLine}
        />
      </div>
    );
  };
  return (
    <div style={localStyles.root}>
      {loading ? (
        <Spinner animation="border" />
      ) : !localMessages.length ? (
        <div style={localStyles.emptyMessages}>المحادثة فارغة </div>
      ) : null}
      <div style={localStyles.statsDiv}>
        {localMessages.length} :{lang.ar.messageCount} <br />
        {lang.ar.usageDuration}: {duration} {'يوم'}
      </div>
      <div style={localStyles.chatDiv}>
        <MainContainer >
          <ChatContainer >
            <MessageList style={localStyles.messagelistContent}> 
              <MessageList.Content >
                {localMessages.map((message) => (
                  <div>
                    {message.message?.date && customSeparator(message.message.date)}
                    {message.message?.image ? (
                      <Message.ImageContent
                        src={message.message.image}
                        alt={
                          "The image isn't working link: " +
                          message.message.image
                        }
                        width={400}
                      />
                    ) : message.message?.audio ? (
                      <ReactAudioPlayer src={message.message.audio} controls />
                    ) : message.message?.file ? (
                      <Message
                        model={{
                          message: message.message.text,
                          sentTime: message.message.createdOn,
                          direction: message.userId,
                        }}
                      >
                        <Message.CustomContent>
                          <a
                            href={message.message.file}
                            target="_blank"
                            download
                          >
                            {message.message.text}
                          </a>
                        </Message.CustomContent>
                        <Message.Footer>
                          <text style={localStyles.messageFooter}>
                            {message.message.createdOn[1].split('.')[0]}
                          </text>
                        </Message.Footer>
                      </Message>
                    ) : (
                      <Message
                        model={{
                          message: message.message.text,
                          sentTime: message.message.createdOn,
                          direction: message.userId,
                        }}
                      >
                        <Message.CustomContent>
                          <text style={localStyles.customMessage}>
                            {message.message.text}
                          </text>
                        </Message.CustomContent>
                        <Message.Footer>
                          <text style={localStyles.messageFooter}>
                            {message.message.createdOn[1].split('.')[0]}
                          </text>
                        </Message.Footer>
                      </Message>
                    )}
                  </div>
                ))}
              </MessageList.Content>
            </MessageList>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default Chat;
