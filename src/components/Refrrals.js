import React, { useEffect, useState } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
import {
  addRefrralsAction,
  getRefrralsAction,
  clearErrorsAction,
} from '../redux/reducers/refrralsReducer';
//UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import styles from '../styles/refrralsStyles';
import LinearProgress from '@material-ui/core/LinearProgress';

const Refrrals = ({ setActiveList }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [referCode, setReferCode] = useState(null);
  const [medium, setMedium] = useState(null);
  const [langText, setLangText] = useState({
    ar: {
      addLink: 'اضافة رابط',
      numberOfLinks: 'عدد الروابط',
      name: 'الاسم',
      code: 'كود',
      link: 'رابط',
      date: 'تاريخ',
      added: 'تمت الاضافه بنجاح',
      error: 'حدث خطا',
      discount: 'خصم'
    },
  });
  const [lang, setLang] = useState('ar');
  const [showMenu, setShowMenu] = React.useState(null);
  const [visibleDiscountType, setVisibleDiscountType] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(null);
  const [errorDiscount, setErrorDiscount] = useState(null);
  const { token, educatorId } = useSelector((state) => state.auth);
  const { referrers, loading, error, added } = useSelector(
    (state) => state.refrrals
  );
  useEffect(() => {
    dispatch(getRefrralsAction({ token, adminId: educatorId }));
  }, []);

  const submit = () => {
    let referAction = null;
    if (discountAmount) {
      referAction = setReferAction()
    }
    if (name && phone && specialty && referCode && medium) {
      dispatch(
        addRefrralsAction({
          name,
          phone,
          specialty,
          referCode,
          medium,
          referAction,
          token,
          adminId: educatorId,
        })
      );
    }
  };

  const setReferAction = () => {
    if (visibleDiscountType === 'flat' && discountAmount) {
      return `discount_flat_${discountAmount}`
    }
    if (visibleDiscountType === 'percentage' && discountAmount) {
      return `discount_percentage_0.${discountAmount}`
    }
    return null;
  }
  const handleClick = (event) => {
    setShowMenu(event.currentTarget);
  };

  const handleClose = () => {
    setShowMenu(null);
  };

  const handleClickPercentDiscount = () => {
    setDiscountAmount(null);
    setVisibleDiscountType('percentage')
    handleClose();
  }

  const handleClickFlatDiscount = () => {
    setDiscountAmount(null);
    setVisibleDiscountType('flat')
    handleClose();
  }

  const handleNoneDiscount = () => {
    setDiscountAmount(null);
    setVisibleDiscountType(null)
    handleClose();
  }
  const onChangeDiscountInput = (e) => {
    const newVal = e.target.value;
    setErrorDiscount(null);
    if (newVal === '') {
      setDiscountAmount('');
      return;
    }
    if (visibleDiscountType === 'flat') {
      if (newVal <= 0) {
        setErrorDiscount('Amount must not be less than 0')
      } else {
        setDiscountAmount(newVal);
      }
    } else if (visibleDiscountType === 'percentage') {
      if (newVal <= 0) {
        setErrorDiscount('Amount must not be less than 0')
      } else if (newVal > 100) {
        setErrorDiscount('Amount must not be greater than 100')
      } else {
        setDiscountAmount(newVal);
      }
    }
  }

  const renderDiscountInput = () => {
    switch (visibleDiscountType) {
      case 'flat': return (
        <div style={styles.discountContainer}>
          <TextField
            style={styles.discountInput}
            value={discountAmount}
            onChange={onChangeDiscountInput}
            label="discount amount"
            variant="outlined"
            type='number'
          />
          <div style={styles.discountUnit}><h6>SAR</h6></div>
        </div>
      )
      case 'percentage': return (
        <div style={styles.discountContainer}>
          <TextField
            style={styles.discountInput}
            value={discountAmount}
            onChange={onChangeDiscountInput}
            label="discount percentage"
            variant="outlined"
            type='number'
          />
          <div style={styles.discountUnit}><h6>%</h6></div>
        </div>
      )
      default: return null;
    }
  }

  const renderTextInputs = () => {
    return (
      <>
        <TextField
          style={styles.formText}
          onChange={(e) => setName(e.target.value)}
          label="name"
          variant="outlined"
        />
        <TextField
          style={styles.formText}
          onChange={(e) => setPhone(e.target.value)}
          label="phone"
          variant="outlined"
        />
        <TextField
          style={styles.formText}
          onChange={(e) => setSpecialty(e.target.value)}
          label="specialty"
          variant="outlined"
        />
        <TextField
          style={styles.formText}
          onChange={(e) => setReferCode(e.target.value)}
          label="referCode"
          variant="outlined"
        />
        <TextField
          style={styles.formText}
          onChange={(e) => setMedium(e.target.value)}
          label="medium"
          variant="outlined"
        />
      </>
    )
  }

  const renderErrorDiscount = () => {
    if (errorDiscount) {
      return (
        <div style={styles.errorDiscountINput}>{errorDiscount}</div>
      )
    }
    return null;
  }
  const renderActionSelect = () => {
    return (
      <div>
        <Button style={styles.menuButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Add Refer Action
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={showMenu}
          keepMounted
          open={Boolean(showMenu)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleNoneDiscount}>None</MenuItem>
          <MenuItem onClick={handleClickPercentDiscount}>Percentage Discount</MenuItem>
          <MenuItem onClick={handleClickFlatDiscount}>Flat Discount</MenuItem>
        </Menu>
      </div>
    )
  }

  const getActionText = (referActionItem) => {
    if (referActionItem) {
      const [_, discountType, discount ] = referActionItem.split('_')
      if (discountType === 'flat') {
        return `${discount} SAR`
      } if (discountType === 'percentage') {
        const amount = parseFloat(discount) *100
        return `${amount}%`
      }
    }
    return null;
  }
  return (
    <div>
      <IconButton
        style={styles.iconsButton}
        aria-label="notes"
        onClick={() => {
          setActiveList('');
          dispatch(clearErrorsAction());
        }}
      >
        <CloseIcon style={styles.closeIcon} fontSize="large" />
      </IconButton>
      <div style={styles.mainContainer}>
        <div style={styles.leftHalf}>
          <div style={styles.addLinkText}>{langText[lang].addLink}</div>
          <div style={styles.formDiv}>
            {renderTextInputs()}
            {renderActionSelect()}
            {renderDiscountInput()}
            {renderErrorDiscount()}
            <div style={styles.formText}>{loading && <LinearProgress />}</div>
            <Button
              style={styles.formButton}
              onClick={() => submit()}
              label="medium"
              variant="outlined"
            >
              ارسال{' '}
            </Button>
            {error ? (
              <div style={styles.error}>{langText[lang].error}</div>
            ) : (
              added && <div style={styles.error}>{langText[lang].added}</div>
            )}
          </div>
        </div>
        <div style={styles.divider} />
        <div style={styles.rightHalf}>
          <div style={styles.numberOfLinks}>
            {' '}
            {langText[lang].numberOfLinks}: {referrers?.length}
          </div>
          <div style={styles.rightMainContainer}>
            <div style={styles.linksWrapper}>
              {referrers &&
                Object.values(referrers)
                  .sort((a, b) => {
                    return new Date(b?.createdOn) - new Date(a?.createdOn);
                  })
                  .map((ref) => {
                    console.log('ref?', ref?.referAction);
                    return (
                      <div style={styles.linkCardDiv}>
                        <Card style={styles.linkCard}>
                          <div style={styles.linkText}>
                            {ref?.name} :{langText[lang].name}
                          </div>
                          <div style={styles.linkText}>
                            {ref?.referCode} :{langText[lang].code}
                          </div>
                          {ref?.referAction ? (
                            <div style={styles.linkText}>
                              {getActionText(ref?.referAction)} :{langText[lang].discount}
                            </div>
                          ) : null}
                          <div
                            style={styles.fullUrlDiv}
                          >
                            <div
                              style={styles.fullUrlText}
                            >
                              {ref?.fullUrl}
                            </div>
                            <div style={styles.linkText}>
                              :{langText[lang].link}
                            </div>
                          </div>
                          <div style={styles.linkText}>
                            {new Date(ref?.createdOn).toLocaleDateString()} :
                            {langText[lang].date}
                          </div>
                        </Card>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Refrrals;
