/* eslint-disable react-hooks/exhaustive-deps */
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

import { getChatsAction } from '../redux/reducers/chatsReducer';
import { useSelector, useDispatch } from 'react-redux';

const imgTypes = ['png', 'jpg', 'jpeg', 'gif'];
const fileTypes = ['pdf', 'doc', 'docx'];
const audioTypes = ['mp3', '3gp', 'caf', 'wav', 'wave', 'm4a', 'aac'];

const Chat = (props) => {
  const dispatch = useDispatch();
  const [localMessages, setLocalMessages] = useState([]);
  const [duration, setDuration] = useState(0);
  // const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState({
    ar: {
      messageCount: 'عدد الرسائل',
      usageDuration: 'مدة الاستخدام',
    },
  });

  const { messages, loading } = useSelector((state) => state.chats);
  const { chatId, token, educatorId } = props;
  useEffect(() => {
    dispatch(
      getChatsAction({
        chatId,
        token,
        educatorId,
      })
    );
  }, []);
  useEffect(() => {
    setLocalMessages(formatMessages(messages));
  }, [messages]);
  useEffect(() => {
    calcDuration(localMessages);
  }, [localMessages]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

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
    console.log('messages that reached formatedMessages: ', messages);

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

  return (
    <div>
      {loading ? (
        <Spinner animation="border" />
      ) : !localMessages.length ? (
        <div>المحادثة فارغة </div>
      ) : null}
      <div>
        {localMessages.length} :{lang.ar.messageCount} <br />
        {lang.ar.usageDuration}: {duration} {'يوم'}
      </div>
      <div style={{ position: 'relative', height: '750px' }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {localMessages.map((message) => (
                <div>
                  {message.message?.date && (
                    <MessageSeparator content={message.message.date} />
                  )}

                  {message.message?.image ? (
                    <Message.ImageContent
                      src={message.message.image}
                      alt={
                        "The image isn't working link: " + message.message.image
                      }
                      width={400}
                    />
                  ) : (
                    message.message?.audio ? <ReactAudioPlayer 
                    src={message.message.audio}  controls />
                    :
                    <Message
                      model={{
                        message: message.message.text,
                        sentTime: message.message.createdOn,
                        direction: message.userId,
                      }}
                    >
                      <Message.CustomContent>
                        <text style={{ fontSize: 17 }}>
                          {message.message.text}
                        </text>
                      </Message.CustomContent>
                      <Message.Footer>
                        <text style={{ fontSize: 10 }}>
                          {message.message.createdOn[1].split('.')[0]}
                        </text>
                      </Message.Footer>
                    </Message>
                  )}
                </div>
              ))}
            </MessageList>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default Chat;
