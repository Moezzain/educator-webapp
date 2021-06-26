import { mainTheme, darkTheme } from '../styles/themes';
const theme = mainTheme;
export const lightStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    width: '20vw',
    height: '10vh',
    backgroundColor: theme.secondary.mainBlue,
    marginTop: '5vh',
    marginLeft: '5vw',
    marginRight: '5vw',
    marginBottom: '5vh',
  },
  title: {
    fontSize: 30,
    color: theme.primary.red,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '5vh',
    backgroundColor: '#F3F3F3',
  },
  educatorText: {
    textAlign: 'cenetr',
    fontSize: 40,
  },
};
export const darkStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    width: '20vw',
    height: '10vh',
    backgroundColor: darkTheme.secondary.mainBlue,
    marginTop: '5vh',
    marginLeft: '5vw',
    marginRight: '5vw',
    marginBottom: '5vh',
  },
  title: {
    fontSize: 30,
    color: darkTheme.primary.red,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '5vh',
    backgroundColor: darkTheme.primary.black,
  },
  educatorText: {
    textAlign: 'cenetr',
    fontSize: 40,
  },
};
