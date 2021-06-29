import { mainTheme, darkTheme } from './themes';

const theme = mainTheme;

export const lightStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '87.5vh',
    width: '100%',
    backgroundColor: theme.primary.black,
  },
  buttonsText: {
    marginTop: 5,
    marginRight: 5,
    backgroundColor: theme.primary.black,
    color: theme.primary.white,
  },
  icons: {
    color: theme.primary.black,
  },
  goToPatientButton: {
    width: '6vw',
    marginLeft: '2vw',
    backgroundColor: '#6D9DC5',
  },
  mianDev: {
    marginLeft: 20,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  iconsDev: {
    width: '100%',
    height: '100%',
  },
  listDev: {
    width: '20%',
    backgroundColor: theme.primary.bluishWhite,
  },
  rightColumn: {
    width: '80%',
    height: '100%',
  },
  cardContainer: theme.primary.white,
  listHeaderDiv: {
    display: 'block',
    backgroundColor: theme.primary.white,
    textAlign: 'center',
    padding: 10,
  },
  patientListName:{
    color:'black'
  }
};
export const darkStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '87.5vh',
    width: '100%',
    backgroundColor: darkTheme.primary.black,
  },
  buttonsText: {
    marginTop: 5,
    marginRight: 5,
    backgroundColor: darkTheme.primary.black,
    color: darkTheme.primary.white,
  },
  icons: {
    color: darkTheme.secondary.lightGrey,
  },
  goToPatientButton: {
    width: '6vw',
    marginLeft: '2vw',
    backgroundColor: '#6D9DC5',
  },
  mianDev: {
    marginLeft: 20,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  iconsDev: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  listDev: {
    width: '20%',
    backgroundColor: darkTheme.secondary.mainBlue,
  },
  rightColumn: {
    width: '80%',
    height: '100%',
  },
  cardContainer: darkTheme.secondary.darkBlue,
  listHeaderDiv: {
    display: 'block',
    backgroundColor: darkTheme.secondary.darkBlue,
    textAlign: 'center',
    padding: 10,
  },
  patientListName: {
    color: darkTheme.secondary.lightGrey,
  },
};
