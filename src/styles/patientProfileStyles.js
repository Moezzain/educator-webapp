import { mainTheme, darkTheme } from './themes';
const theme = mainTheme;
export const lightStyles = {
  root: {
    flex: 1,
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
  },
  elevation: 3,
  flex1: {
    flex: 1,
  },
  chartWrapper: {
    width: '100%',
    height: '100%',
    marginTop: 10,
  },
  chartDiv: {
    width: '100%',
    height: '52.6%',
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
  leftSideCard: {
    textAlign: 'center',
    width: '100%',
    height: '15vh',
    margin: 10,
    fontSize: 20,
    alignVertical: 'center',
    alignSelf: 'center',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center',
  },
  rightSideCard: {
    textAlign: 'center',
    width: '100%',
    height: '15vh',
    marginTop: 10,
    fontSize: 20,
    alignVertical: 'center',
    alignSelf: 'center',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center',
  },
  rightSideDiv: {
    flex: 1,
    width: '50%',
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
  textColor: {
    color:'black'
  },
  educatorsDiv: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  educatorsButton: {
    width: '40%',
    margin: 5,
    backgroundColor: theme.secondary.lightBlue,
  },
  contentWrapper: {
    flex: 1,
    width: '50%',
  },
  rightBottomRightDiv: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    height: '50%',
  },
  rightSideLeftColumn: {
    width: '50%',
    marginRight: 10,
  },
  rightSideRightColumn: {
    width: '50%',
  },
};
export const darkStyles = {
  root: {
    flex: 1,
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
  },
  elevation: 3,
  flex1: {
    flex: 1,
  },
  chartWrapper: {
    width: '100%',
    height: '100%',
    marginTop: 10,
    backgroundColor: darkTheme.primary.black,
  },
  chartDiv: {
    width: '100%',
    height: '52.6%',
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
  leftSideCard: {
    textAlign: 'center',
    width: '100%',
    height: '15vh',
    margin: 10,
    fontSize: 20,
    alignVertical: 'center',
    alignSelf: 'center',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center',
    backgroundColor: darkTheme.primary.black,
  },
  rightSideCard: {
    textAlign: 'center',
    width: '100%',
    height: '15vh',
    marginTop: 10,
    fontSize: 20,
    alignVertical: 'center',
    alignSelf: 'center',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center',
    backgroundColor: darkTheme.primary.black,
  },
  rightSideDiv: {
    flex: 1,
    width: '50%',
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
    backgroundColor: darkTheme.primary.black,
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
  textColor: {color:darkTheme.secondary.lightGrey,},
  educatorsDiv: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  educatorsButton: {
    width: '40%',
    margin: 5,
    backgroundColor: darkTheme.secondary.mainBlue,
  },
  contentWrapper: {
    flex: 1,
    width: '50%',
  },
  rightBottomRightDiv: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    height: '50%',
  },
  rightSideLeftColumn: {
    width: '50%',
    marginRight: 10,
  },
  rightSideRightColumn: {
    width: '50%',
  },
};