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
    },
  });
  const [lang, setLang] = useState('ar');
  const { token, educatorId } = useSelector((state) => state.auth);
  const { referrers, loading, error, added } = useSelector(
    (state) => state.refrrals
  );
  useEffect(() => {
    dispatch(getRefrralsAction({ token, adminId: educatorId }));
  }, []);

  const submit = () => {
    if (name && phone && specialty && referCode && medium) {
      dispatch(
        addRefrralsAction({
          name,
          phone,
          specialty,
          referCode,
          medium,
          token,
          adminId: educatorId,
        })
      );
    }
  };
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
                    return (
                      <div style={styles.linkCardDiv}>
                        <Card style={styles.linkCard}>
                          <div style={styles.linkText}>
                            {ref?.name} :{langText[lang].name}
                          </div>
                          <div style={styles.linkText}>
                            {ref?.referCode} :{langText[lang].code}
                          </div>
                          <div style={styles.linkText}>
                            {ref?.fullUrl} :{langText[lang].link}
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
