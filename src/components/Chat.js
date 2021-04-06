import React from "react";
import { ChatFeed, Message, ChatBubble } from 'react-chat-ui'
import { Container, Spinner } from 'react-bootstrap'
import { getMessages } from '../API/apiEducator'

const imgTypes = ['png', 'jpg', 'jpeg', 'gif'];
const fileTypes = ['pdf', 'doc', 'docx'];
const audioTypes = ['mp3', '3gp', 'caf', 'wav', 'wave', 'm4a'];

class Chat extends React.Component {

    state = {
        messages: [],
        duration: 0,
        lang:{
            ar: {
                messageCount: 'عدد الرسائل',
                usageDuration: 'مدة الاستخدام'
            }
        }
    };

    messagesEnd = React.createRef();
    async componentDidMount() {
        let chatId = '1234'
        this.setState({ loading: true })
        await getMessages(this.props.chatId, this.props.educatorId, this.props.token)
            .then((data) => {
                if (data) {
                    let messages = this.formatMessages(data)
                    this.setDuration(messages)
                    this.setState({ messages, loading: false })
                    // this.scrollToBottom()
                }
                else {
                    this.setState({ loading: false })
                    return []
                }
            }).catch(err => {
                this.setState({ loading: false })
                console.log("ERROR GETTING MESSAGES", err)
            })

    }

    setDuration(messages =[]){
        if(messages && messages.length >0){
            let first = new Date(messages[0].message.createdOn)
            let last = new Date(messages[messages.length-1].message.createdOn)
            const diffTime = Math.abs(last - first);
            const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            this.setState({duration})
            
        }

    }

    formatMessages(messages = []) {
        let formatedMessages = []
        for (var i in messages) {
            let message = messages[i];
            let id = parseInt(message.user._id) - 1;
            if (message.media) {
                var fileNameArr = message.media.split('.');
                var fileExtension = fileNameArr[fileNameArr.length - 1];
                var isImg = imgTypes.includes(fileExtension);
                var isFile = fileTypes.includes(fileExtension);
                var isAudio = audioTypes.includes(fileExtension);
                if (isImg) {
                    message.message = { image: message.media };
                    delete message.media;
                } else if (isFile) {
                    message.message = { text: message.text, file: message.media };
                    delete message.media;
                } else if (isAudio) {
                    message.media = message.media.replace('vnd.wave', 'wav');
                    message.message = { audio: message.media };
                    delete message.media;
                }
                else {
                    message.message = { text: '', }
                }
            } else if (message.text) {
                message.message = { text: message.text }
            }
            else {
                message.message = { text: '', }
            }
            message.message.createdOn = message.createdOn
            let formattedMessage = new Message({ id, message: message.message })

            formatedMessages.push(formattedMessage)
        }
        return formatedMessages;
    }


    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: previousState.messages.append(messages),
        }));
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
    }
    getTimeStamp(dateObject) {
        let date = new Date(dateObject)
        return `${date.getHours()}:${date.getMinutes()} - ${date.getMonth() + 1}/${date.getDate()}`
    }
    bubble(props) {
        let { message } = props;
        let container, colors;
        if (message.id == 0) {
            colors = styles.senderBubble;
            container = styles.senderContainer;
        } else {
            colors = styles.receiverBubble;
            container = styles.receiverContainer;
        }
        if (!message.message)
            return null;

        return (
            // <ChatBubble message={new Message({id: 1, message:'hi'})} />
            <div style={container}>
                <div style={{ ...styles.bubble, ...colors }}>
                    {
                        message.message.image ? (
                            <img src={message.message.image} />
                        ) : message.message.file ? (
                            <a href={message.message.file} target="_blank">{message.message.text}</a>
                        ) : message.message.text ? (
                            message.message.text
                            // null
                        ) : null}
                    <br />
                    {this.getTimeStamp(message.message.createdOn)}
                </div>
            </div>
        );
    }
    render() {
        const { loading, messages, duration } = this.state;
        const {messageCount, usageDuration} = this.state.lang.ar
        return (
            <div style={{ paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0, width: '100vh', maxHeight: '80vh', overflowY: 'auto' }}>
                {loading ?
                    <Spinner animation="border" />
                    :
                    !messages.length ?
                        <div>المحادثة فارغة </div>
                        : null
                }
                <div>
                {messages.length} :{messageCount} <br />
                {usageDuration}: {duration} {"يوم"}
                    
                </div>
                <ChatFeed
                    messages={messages} // Boolean: list of message objects
                    isTyping={this.state.is_typing} // Boolean: is the recipient typing
                    hasInputField={false} // Boolean: use our input, or use your own
                    showSenderName // show the name of the user who sent the message
                    bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                    chatBubble={ChatBubble}
                    chatBubble={this.bubble.bind(this)}
                />
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }} />
            </div>


        );
    }

}

export default Chat

const styles = {
    bubble: {
        borderRadius: 15,
        padding: 20,
        backgroundColor: "#3680E5",
        display: "inline-block",
        color: "white"
    },
    senderBubble: {
        backgroundColor: "#3680E5",
        color: "white",
    },
    receiverBubble: {
        backgroundColor: "#D8D8D8",
        color: "black",
    },
    senderContainer: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 5,
    },
    receiverContainer: {
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: 5,
    },
    // timestamp: {
    //     margin: 0,
    //     color: '#ccc',
    //     fontSize: 11
    // }
};
