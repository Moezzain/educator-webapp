export const formatMessages = (messages = []) => {
    const imgTypes = ['png', 'jpg', 'jpeg', 'gif'];
    const fileTypes = ['pdf', 'doc', 'docx'];
    const audioTypes = ['mp3', '3gp', 'caf', 'wav', 'wave', 'm4a', 'aac'];
  
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