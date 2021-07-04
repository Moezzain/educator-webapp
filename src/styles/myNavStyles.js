import { darkTheme, mainTheme } from './themes';
const theme = mainTheme;
export const lightStyles = {
  root: {
    flexGrow: 1,
    width: '100%',
    height:'10%'
  },
  tabs: {
    backgroundColor: darkTheme.secondary.lightBlue,
    height: '100%',
  },
  tab: { fontSize: 20, color: 'black', width: 30, height:70 },
  footerAppBar: {
    top: 'auto',
    bottom: 0,
    width: '100%',
    height: '5%',
    backgroundColor: darkTheme.secondary.lightBlue,
    alignItems:'center'
  },
  navLogo:{
  marginTop: 5
  },
  footerLogo:{
      marginTop:5,
      marginBottom:10
  }
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
    alignItems:'center'
  },
  navLogo:{
    marginTop: 5
    },
    footerLogo:{
      marginTop:5,
      marginBottom:10
  }
};
