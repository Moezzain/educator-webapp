import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
const CardContainer = ({ style, children }) => (
  <Card style={style}>{children}</Card>
);

export default CardContainer;
