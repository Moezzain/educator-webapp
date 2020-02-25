import React, { Component } from "react";
import {Card,} from 'react-bootstrap'

class CardContainer extends Component {
  render() {
    return (
      <Card  style={{ width: this.props.width, 
       
    //   padding: "2%",
     flexDirection: this.props.direction,
      backgroundColor: "rgba(247,247,247,1)",
      padding: this.props.padding,
      marginBottom: this.props.marginB,
      marginTop: this.props.marginT,
      borderRadius: 25
    //   boxShadow: '1px 3px 5px rgba(255,255,255,0.9)' 
      }}>
            {this.props.children}
      </Card>
    );
  }
}

export default CardContainer;
