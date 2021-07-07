import { mainTheme, darkTheme } from './themes';

const theme = mainTheme;

export const lightStyles = {
  mainDiv:{ height: '76vh', overflow: 'auto' },
  uperDiv:{ display: 'flex', flexDirection: 'row' },
  input:{ width: '100%' },
  convo:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountIcon:{ marginRight: 5 },
  allChatsButton:{
    backgroundColor:theme.secondary.lightBlue,
    margin:2
  },
  patientListName: {
      color: 'black',
    }
};
export const darkStyles = {
  mainDiv:{ height: '76vh', overflow: 'auto' },
  uperDiv:{ display: 'flex', flexDirection: 'row' },
  input:{ width: '100%' },
  convo:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountIcon:{ marginRight: 5 },
  allChatsButton:{
    backgroundColor:theme.primary.black,
    color:darkTheme.secondary.lightGrey,
    margin:2
  },
  patientListName: {
      color: 'black',
    }
 
};
