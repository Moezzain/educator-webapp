import React, { Component } from "react";

const DataContext = React.createContext();
class DataProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
       educatorId: "",
       appointments: [],
       chats: [],
       userLang: "en",
       lang: {
         ar: {},
         en: {
           usernameText: "Username",
           enterUsernameText: "Enter Username",
           passwordText: "Password",
           submitText: "Submit"
         }
       }
    };
  }

  saveData = (educatorId, appointments, chats) => this.setState({educatorId, appointments, chats})
  setUserLang = (userLang) => this.setState({userLang})

  render() {

    
    
    return (
      <DataContext.Provider
        value={{
          ...this.state,
          saveData: this.saveData,
          setUserLang: this.setUserLang
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer, DataContext };

