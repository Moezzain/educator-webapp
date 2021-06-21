/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageSeparator,
} from '@chatscope/chat-ui-kit-react';
import ReactAudioPlayer from 'react-audio-player';

import { getChatsAction } from '../redux/reducers/chatsReducer';
import { useSelector, useDispatch } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import  '../App.css'
const PatientNotes = () => {
  const { patientProfile } = useSelector((state) => state.patient);
  const lang = {ar: {
    title:"العنوان",
    text:"المحتوى",
    date:"التاريخ",
    summary:"الملخص",
  }}
  useEffect(() => {
    console.log('patient notes', patientProfile?.notes);
  }, []);
  // noteId(pin):"e30b3594-24c1-452b-88c5-428cf4d0b00e"
  // patientId(pin):"e6570ece-2efd-4f54-b66b-add16ccd2b88"
  // title(pin):"Aaaa"
  // text(pin):"Aaaa"
  // createdOn(pin):"2021-05-31T10:35:52.447Z"
  // appointmentId(pin):"161675"
  // noteParent(pin):null
  // summaryId(pin):null
  // firstName(pin):"علا"
  // educatorId(pin):"540d2ebd-bca2-4934-98b9-87ec4a592592"
  const renderPatient = () => {
    // const notes = []
    // if(patientProfile)
    // notes = Object.values(patientProfile?.notes);
    return (
      // <Paper
      //   elevation={2}
      //   style={{height:'90%'}}
      // >
      <div class="grid-container">
        {patientProfile?.notes?.map((note) => (

        <div style={{  backgroundColor:'#CDE7B0', alignSelf:'center', margin: 10, borderRadius:8}}>
        <h6  style={{textAlign:'center', fontSize:20}}>
        
          {note?.title}
        </h6>
        <h6  style={{textAlign:'center', fontSize:15}}>
          {note?.text} :{lang.ar.text}
          {/* {notes?.[0]?.title} */}
        </h6>
        <h6  style={{textAlign:'center', fontSize:15}}>
          {note?.summary} :{lang.ar.summary}
          {/* {notes?.[0]?.title} */}
        </h6>
        <h6  style={{textAlign:'center', fontSize:15}}>
          {note?.createdOn.split('T')[0]} :{lang.ar.date}
          {/* {notes?.[0]?.title} */}
        </h6>
        </div>

       
        ))}
        </div>
      // </Paper>
    );
  };
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        marginTop: '2vh',
        marginRight: '4vw',
        marginBottom: '4vh',
      }}
    >
      <Paper
        style={{ width: '100%', height: '90%', overflow: 'auto' }}
      >
        {renderPatient()}
        {renderPatient()}
        {renderPatient()}
      </Paper>
    </div>
  );
};

export default PatientNotes;
