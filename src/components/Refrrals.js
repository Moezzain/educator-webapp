import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  addRefrralsAction,
  getRefrralsAction,
} from '../redux/reducers/refrralsReducer';
import { List, Card } from '@material-ui/core';
const Refrrals = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [referCode, setReferCode] = useState(null);
  const [medium, setMedium] = useState(null);
  const { token, educatorId } = useSelector((state) => state.auth);
  const { referrers } = useSelector((state) => state.refrrals);
  useEffect(() => {
    console.log('ref');
    dispatch(getRefrralsAction({ token, adminId: educatorId }));
  }, []);
  useEffect(() => {
    if (referrers.length && referrers) console.log('referrers: ', referrers);
  }, [referrers]);

  const submit = () => {
    if (name && phone && specialty && referCode && medium) {
      console.log('submit');
      dispatch(
        addRefrralsAction({ name, phone, specialty, referCode, medium, token, adminId: educatorId })
      );
    }
  };
  return (
    <div style={{ display: 'flex', flex: 1, padding: 50 }}>
      <div
        style={{
          height: '100%',
          width: '50%',
          alignContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ textAlign: 'center' }}>اضافة رابط</div>
        <div style={{ height: '100%', width: '45%', alignSelf: 'center' }}>
          <TextField
            style={{
              justifyContent: 'center',
              width: '100%',
              marginTop: '10%',
            }}
            onChange={(e) => setName(e.target.value)}
            label="name"
            type="search"
            variant="outlined"
          />
          <TextField
            style={{
              justifyContent: 'center',
              width: '100%',
              marginTop: '10%',
            }}
            onChange={(e) => setPhone(e.target.value)}
            label="phone"
            type="search"
            variant="outlined"
          />
          <TextField
            style={{
              justifyContent: 'center',
              width: '100%',
              marginTop: '10%',
            }}
            onChange={(e) => setSpecialty(e.target.value)}
            label="specialty"
            type="search"
            variant="outlined"
          />
          <TextField
            style={{
              justifyContent: 'center',
              width: '100%',
              marginTop: '10%',
            }}
            onChange={(e) => setReferCode(e.target.value)}
            label="referCode"
            type="search"
            variant="outlined"
          />
          <TextField
            style={{
              justifyContent: 'center',
              width: '100%',
              marginTop: '10%',
            }}
            onChange={(e) => setMedium(e.target.value)}
            label="medium"
            type="search"
            variant="outlined"
          />
          <Button
            style={{
              justifyContent: 'center',
              width: '100%',
              height: 50,
              marginTop: '10%',
            }}
            onClick={() => submit()}
            label="medium"
            type="search"
            variant="outlined"
          >
            ارسال{' '}
          </Button>
        </div>
      </div>
      <div style={{ height: '100%', width: 2, backgroundColor: 'grey' }} />
      <div
        style={{
          height: '100%',
          width: '50%',
          // backgroundColor: 'lightblue',
          padding: 15,
          overflow:'auto'
        }}
        >
        <div> Number of links: {referrers.length}</div>
        <List>
          {Object.values(referrers).sort((a,b) => {
            return new Date(b.createdOn) - new Date(a.createdOn)
          }).map((ref) => {
            return (
              <Card style={{marginTop:10}}>
                <div>Name: {ref.name}</div>
                <div>Code: {ref.referCode}</div>
                <div>url: {ref.url}</div>
                <div>created on: {ref.createdOn}</div>
              </Card>
            );
          })}
        </List>
      </div>
    </div>
  );
};
export default Refrrals;
