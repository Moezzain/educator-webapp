import { mainTheme, darkTheme } from "./themes";

const theme = mainTheme;

export const lightStyles = {
  root: {
    height: '100%',
    width: '100%',
  },
  iconsButton: { height: 50, width: 50, marginLeft: 20, marginRight: 20, marginTop: 10 },
  chatDiv: {
    position: 'relative',
    height: '80%',
    width: '96%',
  },
  educatorsButton: {
    width: '20%',
    margin: 5,
    backgroundColor: theme.secondary.lightBlue,
  },
  messageFooter: {
    ontSize: 10,
  },
  customMessage: {
    fontSize: 17,
  },
  messagelistContent: {
    // backgroundColor: mainTheme.primary.white,
  },
  separatorDiv: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 30,
  },
  leftLine: {
    flex: 4,
    height: 1,
    backgroundColor: 'grey',
  },
  rightLine: {
    flex: 4,
    height: 1,
    backgroundColor: 'grey',
    marginRight: 30,
  },
  date: {
    flex: 2,
    textAlign: 'center',
  },
  statsDiv: {
    color: 'black',
  },
  emptyMessages: {
    color: 'black',
  },
  chatScrollDiv: {
    overflow: 'auto',
    height: '65vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    backgroundColor: '#F4FBFF',
  },
};
export const darkStyles = {
  root: {
    height: '100%',
    width: '100%',
  },
  chatDiv: {
    position: 'relative',
    height: '80%',
    width: '96%',
  },
  messageFooter: {
    ontSize: 10,
  },
  customMessage: {
    fontSize: 17,
  },
  messagelistContent: {
    backgroundColor: darkTheme.secondary.mainBlue,
  },
  separatorDiv: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 30,
  },
  leftLine: {
    flex: 4,
    height: 1,
    backgroundColor: 'grey',
  },
  rightLine: {
    flex: 4,
    height: 1,
    backgroundColor: 'grey',
    marginRight: 30,
  },
  date: {
    flex: 2,
    textAlign: 'center',
  },
  statsDiv: {
    color: darkTheme.secondary.lightGrey,
  },
  emptyMessages: {
    color: darkTheme.secondary.lightGrey,
  },
  chatScrollDiv: {
    overflow: 'auto',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    backgroundColor: darkTheme.secondary.mainBlue,
  },
};
