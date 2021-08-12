import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});
const PopUpProfile = ({
  setOpen,
  open,
  setOldPassword,
  setNewPassword,
  setNewPasswordVerify,
  handleResetSubmit,
  error,
}) => {
  const [page, setPage] = useState('profile');
  const classes = useStyles();

  return (
    <Dialog
      onClose={() => {
        setOpen(false);
      }}
      open={open}
    >
      <div style={{ height: 400, width: 600 }}>
        {page === 'profile' ? (
          <div> 

        <DialogTitle style={{ textAlign: 'center' }} id="simple-dialog-title">
          Profile
        </DialogTitle>
<Typography style={{backgroundColor:'lightblue', marginLeft:10,textAlign:'center' ,width:580, height:40, }}>Name: </Typography>
          <Button
          style={{width:580, height:40, backgroundColor:'lightblue', marginLeft:10,marginTop:10}}
            onClick={() => {
              setPage('reset');
            }}
          >
            Reset Password
          </Button>
          </div>
        ) : (
          <div>
            <DialogTitle style={{ textAlign: 'center' }} id="simple-dialog-title">
          Reset Password
        </DialogTitle>
            <Button style={{backgroundColor:'lightblue', marginLeft:10}} onClick={() => {setPage('profile')}}> 
              <KeyboardBackspaceIcon />
            </Button>
            <FormControl
              style={{ width: 580, marginTop: 10, marginLeft: 10 }}
              fullWidth
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-amount">
                Old Password
              </InputLabel>
              <OutlinedInput
                type="password"
                // value={values.amount}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                labelWidth={50}
              />
            </FormControl>
            <FormControl
              style={{ width: 580, marginTop: 10, marginLeft: 10 }}
              fullWidth
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-amount">
                New Password
              </InputLabel>
              <OutlinedInput
                type="password"
                // value={values.amount}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                labelWidth={50}
              />
            </FormControl>
            <FormControl
              style={{ width: 580, marginTop: 10, marginLeft: 10 }}
              fullWidth
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-amount">
                New Password
              </InputLabel>
              <OutlinedInput
                type="password"
                // value={values.amount}
                onChange={(e) => {
                  setNewPasswordVerify(e.target.value);
                }}
                // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                labelWidth={50}
              />
            </FormControl>
            <Button
              style={{
                backgroundColor: 'lightblue',
                width: 580,
                marginTop: 10,
                marginLeft: 10,
              }}
              onClick={() => {
                handleResetSubmit();
              }}
              variant="primary"
            >
              Submit
            </Button>
            <InputLabel
              style={{ textAlign: 'center', marginTop: 10, color: 'red' }}
            >
              {error}
            </InputLabel>
          </div>
        )}
      </div>
    </Dialog>
  );
};
export default PopUpProfile;
