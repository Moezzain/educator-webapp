import { mainTheme } from './themes';
const theme = mainTheme;

export const localStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '89.9vh',
    width: '100wh',
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
    overflow: 'hidden',
  },
  listHeaderDev: {
    width: '20%',
    backgroundColor: theme.primary.bluishWhite,
  },
  rightColumn: {
    width: '80%',
    height: '100%',
  },
};
