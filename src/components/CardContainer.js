import React, { Component } from "react";
import Card from '@material-ui/core/Card';
class CardContainer extends Component {
  render() {
    return (
      <Card  style={{ width: this.props.width, 
       display:this.props.display,
     flexDirection: this.props.direction,
      backgroundColor: "rgba(247,247,247,1)",
      padding: this.props.padding,
      marginBottom: this.props.marginB,
      marginTop: this.props.marginT,
      borderRadius: 25,
      backgroundColor: this.props.backgroundColor
      }}>
            {this.props.children}
      </Card>
    );
  }
}

export default CardContainer;
