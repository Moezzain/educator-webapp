import React, { Component } from "react";
import { getEducatorChats } from '../API/apiEducator'

const DataContext = React.createContext();
class DataProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "contex works",
      educatorId: '8bd3c7e1-c6ec-48bf-8ac8-80bf1f013eef',
      loading: false,
      appointments: [],
      educators: {},
      chats: [
        { id: 1, patientName: 'w' }
      ]
    };
  }

  saveData = (educatorId, appointments, chats) => {
    this.setState({ educatorId, appointments, chats })
    if (educatorId == '8bd3c7e1-c6ec-48bf-8ac8-80bf1f013eef')
      this.getEducatorChats();

  }

  getEducatorChats = async () => {
    this.setState({ loading: true })
    let educators = await getEducatorChats();
    if (educators) {
      this.setState({ educators, loading: false })
      return educators
    }
    else {
      this.setState({ loading: false })
    }
  }

  setEducatorId = educatorId => {
    this.setState({
      educatorId,
      chats: this.state.educators[educatorId].chats
    })

  }
  setChats = chats => this.setState({ chats })

  render() {

    return (
      <DataContext.Provider
        value={{
          ...this.state,
          saveData: this.saveData,
          getEducatorChats: this.getEducatorChats,
          setEducatorId: this.setEducatorId,
          setChats: this.setChats,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer, DataContext };

