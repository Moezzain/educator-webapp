import React, { Component } from 'react'
import { DataContext } from '../stateManagement/context';
import MyNav from '../components/MyNav';
import SideBarComponent from '../components/SideBarComponent';

 class Home extends Component {
    static contextType = DataContext;



componentDidMount(){
if(this.context.educatorId == ""){
    this.props.history.push("login")
}
}

    render() {
        return (
           <>
                <MyNav />
                <SideBarComponent history={this.props.history} />
                <div className="container-center">
                    <h1>
                        Welcome home
                    </h1>
                </div>
           </>
        )
    }
}

export default Home
