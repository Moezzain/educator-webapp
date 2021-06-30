import { darkTheme} from '../styles/themes'

export const lightStyles = {
  mainDev: {
    height: '90%',
    width: '100%',
    marginTop: '2vh',
    marginRight: '4vw',
    marginBottom: '4vh',
    overflow: 'auto',
  },
  root: {
    minWidth: 275,
    height: '30vh',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  date: {
    fontSize: 14,
    marginRight: 20,
    position: 'absolute',
    right: 5,
    bottom:5
  },
  pos: {
    marginBottom: 12,
  },
  learnMore: {
    position: 'absolute',
    left: 2,
    bottom: 0,
  },
  learnMoreButton: {
    backgroundColor: '#6AC6F7',
  },
  cardDev: {
    width: '20vw',
    marginRight: '2vh',
    marginTop: '2vh',
  },
  cardContent: {
    position: 'relative',
    height: '100%',
  },
  color: 'initial'
};
export const darkStyles = {
  mainDev: {
    height: '90%',
    width: '100%',
    marginTop: '2vh',
    marginRight: '4vw',
    marginBottom: '4vh',
    overflow: 'auto',
  },
  root: {
    minWidth: 275,
    height: '30vh',
    backgroundColor:darkTheme.primary.black
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  date: {
    fontSize: 14,
    marginRight: 20,
    position: 'absolute',
    right: 5,
    bottom:5,
    color:darkTheme.secondary.lightGrey
  },
  pos: {
    marginBottom: 12,
  },
  learnMore: {
    position: 'absolute',
    left: 2,
    bottom: 0,
  },
  learnMoreButton: {
    backgroundColor: darkTheme.secondary.mainBlue,
  },
  cardDev: {
    width: '20vw',
    marginRight: '2vh',
    marginTop: '2vh',
  },
  cardContent: {
    position: 'relative',
    height: '100%',
  },
  color: 'secondary',
  text:{
    color:darkTheme.secondary.lightGrey
  }
};
