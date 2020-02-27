import React, { Component } from 'react'
import { DataContext } from '../stateManagement/context';

 class Home extends Component {
    static contextType = DataContext;



componentDidMount(){
if(this.context.educatorId == ""){
    // this.props.history.push("login")
}
}

    render() {
        return (
            <div>
               <h1>home</h1> 
            </div>
        )
    }
}

export default Home
