import React, { Component } from "react";
import Card from '@material-ui/core/Card';
class CardContainer extends Component {
  render() {
    return (
      <Card  style={this.props.style}>
            {this.props.children}
      </Card>
    );
  }
}

export default CardContainer;
