import { mainTheme, darkTheme } from './themes';

const theme = mainTheme;

export const lightStyles = {
  mainDiv: { height: '76vh', overflow: 'auto' },
  uperDiv: { display: 'flex', flexDirection: 'row', height: 50 },
  input: {
    height: '100%',
    width: '100%',
    alignSelf: 'end',
    justifyContent: 'end',
    borderColor: 'white',
    textAlign: 'end',
    backgroundColor: theme.primary.bluishWhite,
  },
  convo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountIcon: { marginRight: 5 },
  inputDiv:{
    width:'70%'
  },
  switchDiv: {
    width: '30%',
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginBottom:10
  },
  allChatsSwitch: {
  },
  allChatsText: {
    marginBottom: -5,
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
  patientListName: {
    color: 'black',
  },
};
export const darkStyles = {
  mainDiv: { height: '76vh', overflow: 'auto' },
  uperDiv: { display: 'flex', flexDirection: 'row', height: 50 },
  input: {
    height: '100%',
    width: 300,
    alignSelf: 'end',
    justifyContent: 'end',
    borderColor: darkTheme.secondary.darkBlue,
    textAlign: 'end',
    backgroundColor: darkTheme.secondary.mainBlue,
  },
  convo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputDiv:{
    width:'70%'
  },
  switchDiv: {
    width: '30%',
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginBottom:10
  },
  allChatsSwitch: {
    backgroundColor: theme.secondary.lightBlue,
    // margin: 2,
  },
  allChatsText: {
    marginBottom: -5,
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
  accountIcon: { marginRight: 5 },
  patientListName: {
    color: 'black',
  },
};
