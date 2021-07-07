import { mainTheme, darkTheme } from './themes';

const theme = mainTheme;

export const lightStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '90.5vh',
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
  patientListName: {
    color: 'black',
  },
  listAppointemntsButton: { width: '100%', backgroundColor: theme.primary.bluishWhite },
  popUpDiv: { height: '10vh', width: '10vw', backgroundColor:'white' },
  calendarMainDiv:{ flex: 1 },
  headerListDiv:{ width: '20%', height: '10%' },
  calendarContentDiv:{ width: '100%', height: '90%' },
  calendarCardDiv:{ flex: 1, display: 'flex', justifyContent: 'center' },
  calendarCard:{
    display: 'flex',
    height: '60%',
    width: '100%',
    marginLeft:'15%',
    marginRight:'15%',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor:theme.secondary.lightBlue
  },
  calendarDiv:{
    display: 'flex',
    flexDirection:'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar:{ height: 500, width: '90%',marginTop:'5%',marginBottom:'5%'  }

};
export const darkStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '90.5vh',
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
    backgroundColor: darkTheme.secondary.lightBlue,
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
  listAppointemntsButton: { width: '100%', backgroundColor: darkTheme.secondary.mainBlue },
  popUpDiv: { height: '10vh', width: '10vw', backgroundColor: darkTheme.secondary.mainBlue },
  calendarMainDiv:{ flex: 1 },
  headerListDiv:{ width: '20%', height: '10%' },
  calendarContentDiv:{ width: '100%', height: '90%' },
  calendarCardDiv:{ flex: 1, display: 'flex', justifyContent: 'center' },
  calendarCard:{
    display: 'flex',
    height: '100%',
    width: '100%',
    marginLeft:'15%',
    marginRight:'15%',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor:theme.primary.black
  },
  calendarDiv:{
    display: 'flex',
    flexDirection:'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar:{ height: 600, width: '90%',marginTop:'5%',marginBottom:'5%'  }
};
