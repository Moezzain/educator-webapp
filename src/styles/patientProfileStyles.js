import { mainTheme, darkTheme } from './themes';
const theme = mainTheme;
export const lightStyles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  elevation: 3,
  flex1: {
    flex: 1,
  },
  chartWrapper: {
    width: '31vw',
    height: '37.8vh',
    marginLeft: 10,
    marginTop: 10,
    marginRight:10
  },
  rightLowerCorner: {
    width: '30vw',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '1vw',
    marginTop: '1vh',
    height: '39.3vh',
  },
  text: {
    textAlign: 'center',
    verticalAlign: 'center',
    top: 0,
    position: 'relative',
    color: theme.primary.red,
    fontSize: 20,
  },
  card: {
    textAlign: 'center',
    width: '15vw',
    height: '15vh',
    margin: 10,
    fontSize: 20,
    alignVertical: 'center',
    alignSelf: 'center',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center',
  },
  paper: {
    textAlign: 'center',
    width: '30vw',
    height: '6vh',
    margin: 10,
    fontSize: 20,
    alignVertical: 'center',
    alignSelf: 'center',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center',
    color: mainTheme.primary.black,
  },
  chartMargin: {
    top: 16,
    right: 16,
    bottom: 0,
    left: 24,
  },
  medicineItems: {
    listStyleType: 'none',
    flex: 1,
  },
  medicinesText: {
    listStyleType: 'none',
    flex: 1,
  },
  patientName: {
    flex: 1,
    margin: 10,
    height: '5vh',
  },
  clickPopever: {
    width: '5vw',
    margin: 10,
    height: '5vh',
  },
  medicineTextPaper: {
    width: '5vw',
    margin: 10,
    height: '5vh',
  },
  rightSideDiv: {},
  textColor: "textSecondary"
};
export const darkStyles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  elevation: 3,
  flex1: {
    flex: 1,
  },
  chartWrapper: {
    width: '31vw',
    height: '37.8vh',
    marginLeft: 10,
    marginTop: 10,
    marginRight:10,
    backgroundColor: darkTheme.primary.black
  },
  rightLowerCorner: {
    width: '30vw',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '1vw',
    marginTop: '1vh',
    height: '39.3vh',
  },
  text: {
    textAlign: 'center',
    verticalAlign: 'center',
    top: 0,
    position: 'relative',
    color: darkTheme.primary.red,
    fontSize: 20,
  },
  card: {
    textAlign: 'center',
    width: '15vw',
    height: '15vh',
    margin: 10,
    fontSize: 20,
    alignVertical: 'center',
    alignSelf: 'center',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center',
    backgroundColor: darkTheme.primary.black
  },
  paper: {
    textAlign: 'center',
    width: '30vw',
    height: '6vh',
    margin: 10,
    fontSize: 20,
    alignVertical: 'center',
    alignSelf: 'center',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center',
    color: mainTheme.primary.black,
  },
  chartMargin: {
    top: 16,
    right: 16,
    bottom: 0,
    left: 24,
  },
  medicineItems: {
    listStyleType: 'none',
    flex: 1,
  },
  medicinesText: {
    listStyleType: 'none',
    flex: 1,
  },
  patientName: {
    flex: 1,
    margin: 10,
    height: '5vh',
    backgroundColor: darkTheme.primary.black
  },
  clickPopever: {
    width: '5vw',
    margin: 10,
    height: '5vh',
  },
  medicineTextPaper: {
    width: '5vw',
    margin: 10,
    height: '5vh',
  },
  rightSideDiv: {},
  textColor: 'secondary'
};
