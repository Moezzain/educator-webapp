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
  tab: { fontSize: 20, color: 'black', width: 30, height: 50 },
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
    height: 50,
    fontSize: 25,
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    verticalAlign: 'center',
  },
  text: {
    textAlign: 'center',
    verticalAlign: 'center',
    top: 0,
    position: 'relative',
    marginTop: 10,
    fontSize: 20,
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 15,
  },
  icon: { marginRight: 10 },
};
export const darkStyles = {
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.secondary.darkBlue,
  },
  tabs: {
    backgroundColor: theme.secondary.darkBlue,
    height: '100%',
  },
  tab: { fontSize: 20, color: 'black', width: 30 },
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
};
