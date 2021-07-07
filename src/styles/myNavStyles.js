import { darkTheme, mainTheme } from './themes';
const theme = mainTheme;
export const lightStyles = {
  root: {
    flexGrow: 1,
    width: '100%',
    height: 50,
  },
  tabs: {
    backgroundColor: darkTheme.secondary.lightBlue,
    height: 50,
  },
  logout: {
    fontSize: 20,
    color: 'black',
    width: 30,
    height: 50,
    marginLeft:25,
    transform: [{ rotate: '90deg' }],
  },
  footerAppBar: {
    top: 'auto',
    bottom: 0,
    width: '100%',
    height: '5%',
    backgroundColor: darkTheme.secondary.lightBlue,
    alignItems: 'center',
  },
  navLogo: {
    marginTop: 5,
  },
  footerLogo: {
    marginTop: 5,
    marginBottom: 10,
  },
  customTabDiv: {
    width: 200,
    minWidth:140,
    height: 50,
    fontSize: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'center',
    textTransform: 'none'
  },
  text: {
    textAlign: 'center',
    verticalAlign: 'center',
    top: 0,
    position: 'relative',
    fontSize: 20,
    flexDirection: 'row',
    display: 'flex',
    marginBottom: -5,
  },
  icon: { marginRight: 10 },
  tabDiv: { fontSize: 16, marginBottom: 2 },
};
export const darkStyles = {
  root: {
    flexGrow: 1,
    width: '100%',
    height: 50,
    backgroundColor: theme.secondary.darkBlue,
  },
  tabs: {
    backgroundColor: theme.secondary.darkBlue,
    height: 50,
  },
  logout: {
    fontSize: 20,
    color: 'black',
    width: 30,
    height: 50,
    marginLeft:25,
    transform: [{ rotate: '90deg' }],
  },
  footerAppBar: {
    top: 'auto',
    bottom: 0,
    width: '100%',
    height: '5%',
    backgroundColor: theme.secondary.darkBlue,
    alignItems: 'center',
  },
  navLogo: {
    marginTop: 5,
  },
  footerLogo: {
    marginTop: 5,
    marginBottom: 10,
  },
  customTabDiv: {
    width: 200,
    minWidth:140,
    height: 50,
    fontSize: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'center',
  },
  text: {
    textAlign: 'center',
    verticalAlign: 'center',
    top: 0,
    position: 'relative',
    fontSize: 20,
    flexDirection: 'row',
    display: 'flex',
    marginBottom: -5,
    color: darkTheme.secondary.lightGrey,
  },
  icon: { marginRight: 10 },
  tabDiv: { fontSize: 16, marginBottom: 2, color: darkTheme.secondary.lightGrey, },
};
