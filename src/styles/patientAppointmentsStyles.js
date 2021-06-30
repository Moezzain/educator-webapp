import {darkTheme, mainTheme} from './themes'
const theme = mainTheme
export const lightStyles = {
    root: {height:'80%',minHeight:'100%',maxHeight:310, },
    card:{ width: '100%', height: '100%', marginTop: 10 },
    text: {
        textAlign: 'center',
        verticalAlign: 'center',
        top: 0,
        position: 'relative',
        color: theme.primary.red,
        fontSize: 20,
      },
      listDiv:{ height: '90%', overflow: 'auto'},
      button:{
        width: '90%',
        height: 40,
        marginTop:10,
        marginLeft: 15,
        marginRight:15,
        backgroundColor: theme.secondary.lightBlue,
      }
}
export const darkStyles = {
    root: {height:'80%',minHeight:'100%',maxHeight:310, },
    card:{ width: '100%', height: '100%', marginTop: 10 , backgroundColor:darkTheme.primary.black},
    text: {
        textAlign: 'center',
        verticalAlign: 'center',
        top: 0,
        position: 'relative',
        color: theme.primary.red,
        fontSize: 20,
      },
      listDiv:{ height: '90%', overflow: 'auto'},
      button:{
        
        width: '90%',
        height: 40,
        marginTop:10,
        marginLeft: 15,
        marginRight:15,
        backgroundColor: darkTheme.secondary.mainBlue,
      }
}