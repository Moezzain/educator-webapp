import { darkTheme, mainTheme } from './themes';

export const lightStyles = {
  root: {
    height: '100%',
    width: '100%',
    // backgroundColor:'green'
  },
  chatDiv: {
    position: 'relative',
    height: '85%',
    width: '96%',
    backgroundColor: 'green',
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
};
export const darkStyles = {
  root: {
    height: '100%',
    width: '100%',
  },
  chatDiv: {
    position: 'relative',
    height: '85%',
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
};
