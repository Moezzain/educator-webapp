import React, { Component } from "react";

const DataContext = React.createContext();
class DataProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
       test: "contex works",
       educatorId: "",
       appointments: [],
       chats: []
    };
  }

  saveData = (educatorId, appointments, chats) => this.setState({educatorId, appointments, chats})


  render() {

    
    
    return (
      <DataContext.Provider
        value={{
          ...this.state,
          saveData: this.saveData
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer, DataContext };

