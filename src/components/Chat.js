import React from "react";
import { GiftedChat } from 'react-gifted-chat';
import { ChatFeed, Message, ChatBubble } from 'react-chat-ui'
import { Container, Spinner } from 'react-bootstrap'
import { getMessages } from '../API/apiAuth'

const imgTypes = ['png', 'jpg', 'jpeg', 'gif'];
const fileTypes = ['pdf', 'doc', 'docx'];
const audioTypes = ['mp3', '3gp', 'caf', 'wav', 'wave', 'm4a'];

class Chat extends React.Component {

    state = {
        messages: [],
    };

    messagesEnd = React.createRef();
    async componentDidMount() {
        // this.setState({
        //     messages: [
        //         new Message({
        //             id: 1,
        //             message: "I'm the recipient! (The person you're talking to)",
        //         }), // Gray bubble
        //         new Message({ id: 0, message: "I'm you -- the blue bubble!" }),
        //         new Message({
        //             id: 1,
        //             message: "I'm the recipient! (The person you're talking to)",
        //         }), // Gray bubble
        //         new Message({ id: 0, message: "I'm you -- the blue bubble!" }),
        //         new Message({
        //             id: 1,
        //             message: "I'm the recipient! (The person you're talking to)",
        //         }), // Gray bubble
        //         new Message({ id: 0, message: "I'm you -- the blue bubble!" }),
        //         new Message({
        //             id: 1,
        //             message: "I'm the recipient! (The person you're talking to)",
        //         }), // Gray bubble
        //         new Message({ id: 0, message: "I'm you -- the blue bubble!" }),
        //         new Message({
        //             id: 1,
        //             message: "I'm the recipient! (The person you're talking to)",
        //         }), // Gray bubble
        //         new Message({ id: 0, message: "I'm you -- the blue bubble!" }),
        //     ],
        // });

        let chatId = '1234'
        this.setState({ loading: true })
        await getMessages(this.props.chatId)
            .then(({ data }) => {
                if (data) {
                    let parsedMessages = data.map((element) => { return JSON.parse(element) })
                    // return parsedMessages
                    let messages = this.formatMessages(parsedMessages)
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
        const { loading, messages } = this.state;

        return (
            <div style={{ paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0, width: '100vh', maxHeight: '80vh', overflowY: 'auto' }}>
                {loading ?
                    <Spinner animation="border" />
                    :
                    !messages.length ?
                        <div>المحادثة فارغة </div>
                        : null
                }
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