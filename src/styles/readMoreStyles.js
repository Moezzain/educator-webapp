import { mainTheme, darkTheme } from './themes';
const theme = mainTheme;

export const lightStyles = {
  titleText: {fontSize:30},
  text: { overflow: 'auto' },
};
export const darkStyles = {
  titleText: {fontSize:30,color: darkTheme.secondary.lightGrey},
  text: { overflow: 'auto', color: darkTheme.secondary.lightGrey },
};
