import React,{Text} from 'react';
import { ChatFeed, ChatBubble } from 'react-chat-ui';
import { Container, Spinner } from 'react-bootstrap';
import { getMessages } from '../API/apiEducator';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageSeparator
} from '@chatscope/chat-ui-kit-react';

const imgTypes = ['png', 'jpg', 'jpeg', 'gif'];
const fileTypes = ['pdf', 'doc', 'docx'];
const audioTypes = ['mp3', '3gp', 'caf', 'wav', 'wave', 'm4a'];

class Chat extends React.Component {
  state = {
    messages: [],
    duration: 0,
    lang: {
      ar: {
        messageCount: 'عدد الرسائل',
        usageDuration: 'مدة الاستخدام',
      },
    },
  };

  messagesEnd = React.createRef();
  async componentDidMount() {
    let chatId = '1234';
    this.setState({ loading: true });
    await getMessages(
      this.props.chatId,
      this.props.educatorId,
      this.props.token
    )
      .then((data) => {
        if (data) {
          let messages = this.formatMessages(data.reverse());
          this.setDuration(messages);
          this.setState({ messages, loading: false });
        } else {
          this.setState({ loading: false });
          return [];
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log('ERROR GETTING MESSAGES', err);
      });
  }

  setDuration(messages = []) {
    if (messages && messages.length > 0) {
      let first = new Date(messages[0].message.createdOn);
      let last = new Date(messages[messages.length - 1].message.createdOn);
      const diffTime = Math.abs(last - first);
      const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.setState({ duration });
    }
  }

  formatMessages(messages = []) {
    let formatedMessages = [];
    let date
    for (var i in messages) {
      let message = messages[i];
      let id = parseInt(message.user._id) - 1;
      if (message.media) {
        var fileNameArr = message.media.split('.');
        var fileExtension = fileNameArr[fileNameArr.length - 1];
        var isImg = fileExtension.includes('jpg');
        var isFile = fileTypes.includes(fileExtension);
        var isAudio = audioTypes.includes(fileExtension);
        if (isImg) {
        
        if(date !== message.createdOn.split('T')[0]){
          message.message = { image: message.media };
          message.message.date = message.createdOn.split('T')[0]
          date = message.createdOn.split('T')[0]
        }else{
          message.message = { text: message.text };
        }
        delete message.media;
        } else if (isFile) {
          message.message = { text: message.text, file: message.media };
          delete message.media;
        } else if (isAudio) {
          
          message.media = message.media.replace('vnd.wave', 'wav');
          message.message = { audio: message.media };
          delete message.media;
        } else {
          message.message = { text: '' };
        }
      } else if (message.text) {
        
        if(date !== message.createdOn.split('T')[0]){
          message.message = { text: message.text };
          message.message.date = message.createdOn.split('T')[0]
          date = message.createdOn.split('T')[0]
        }
        else
        message.message = { text: message.text };
      } else {
        message.message = { text: '' };
      }
      message.message.createdOn = message.createdOn;
      let userId;
      if (id === 0) userId = 'outgoing';
      else userId = 'incoming';
      const createdOn = message.message.createdOn.split('T')
      message.message.createdOn = createdOn
      let formattedMessage = { userId, message: message.message };

      formatedMessages.push(formattedMessage);
    }
    return formatedMessages;
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: previousState.messages.append(messages),
    }));
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };
  getTimeStamp(dateObject) {
    let date = new Date(dateObject);
    return `${date.getHours()}:${date.getMinutes()} - ${
      date.getMonth() + 1
    }/${date.getDate()}`;
  }
  render() {
    const { loading, messages, duration } = this.state;
    const { messageCount, usageDuration } = this.state.lang.ar;
    return (
      <div>
        {loading ? (
          <Spinner animation="border" />
        ) : !messages.length ? (
          <div>المحادثة فارغة </div>
        ) : null}
        <div>
          {messages.length} :{messageCount} <br />
          {usageDuration}: {duration} {'يوم'}
        </div>
        <div style={{ position: 'relative', height: '750px' }}>
          <MainContainer>
            <ChatContainer>
              <MessageList>
                {messages.map((message) =>(
                  <div>

                    {message.message?.date && (<MessageSeparator content={message.message.date} />)}
                    
                  {message.message?.image ? (
                    <Message.ImageContent
                      src={message.message.image}
                      alt={
                        "The image isn't working link: " +
                        message.message.image
                      }
                      width={400}
                    />
                  ) : (
                    <Message
                      model={{
                        message: message.message.text,
                        sentTime: message.message.createdOn,
                        direction: message.userId,
                      }}
                    >
                      <Message.CustomContent>
                      <text style={{fontSize:17}}>{message.message.text}</text>
                      </Message.CustomContent>
                      <Message.Footer>
                    <text style={{fontSize:10}}>{message.message.createdOn[1].split('.')[0]}</text>
                      </Message.Footer>
                    </Message>)}
                  </div>
                
                  )
                )}
              </MessageList>
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    );
  }
}

export default Chat;

