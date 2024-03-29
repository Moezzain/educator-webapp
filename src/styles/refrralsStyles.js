const styles = {
  iconsButton: { height: 50, width: 50, marginLeft: 20, marginTop: 10 },
  closeIcon: { height: 50, width: 50 },
  mainContainer: {
    display: 'flex',
    flex: 1,
    paddingBottom: 50,
    height: '100%',
  },
  leftHalf: {
    height: '100%',
    width: '30%',
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  addLinkText: { textAlign: 'center', fontSize: 20 },
  formDiv: { height: '100%', width: '70%', alignSelf: 'center' },
  formText: { justifyContent: 'center', width: '100%', marginTop: '10%' },
  menuButton: { justifyContent: 'center', width: '100%', marginTop: '10%', border: '1px solid gray' },
  discountContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10%'
  },
  discountInput: {
    display: 'flex',
    flex: 3,
    justifyContent: 'center',
  },
  discountUnit: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    marginLeft: '5%'
  },
  formButton: {
    justifyContent: 'center',
    width: '100%',
    height: 50,
  },
  divider: { height: '90%', width: 2, backgroundColor: 'grey' },
  rightHalf: {
    height: '100%',
    width: '70%',
  },
  rightMainContainer: {
    padding: 15,
    height: '95%',
    overflow: 'auto',
  },
  numberOfLinks: { marginLeft: 30, fontSize: 20 },
  linksWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  linkCardDiv: {
    width: '48%',
    marginLeft: 10,
    right: 0,
  },
  linkCard: {
    marginTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  linkText: { textAlign: 'end', fontSize: 18 },
  error: {
    width: '100%',
    marginTop: '10%',
    textAlign: 'center',
  },
  errorDiscountINput: {
    width: '100%',
    marginTop: '5%',
    textAlign: 'center',
    color: 'red',
  },
  fullUrlText: {
    overflowWrap: 'break-word',
    textAlign: 'end',
    fontSize: 18,
    maxWidth: '90%',
  },
  fullUrlDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
};
export default styles;
