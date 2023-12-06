import React, { useState, useEffect } from 'react';

// Components
import MyNav from '../components/MyNav';
import Footer from '../components/Footer';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getInvoicesAction } from '../redux/reducers/invoiceReducer';

// ui libraries
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import '../App.css';
import { lightStyles, darkStyles } from '../styles/showPatientsViewStyles';
import { Button, Typography } from '@material-ui/core';
import toHtml from 'string-to-html/string-to-html';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    cardContainer: {
        flexDirection: 'column',
        width: '95%',
        overflow: 'scroll',
        padding: 20
    },
    headerContainer: {
        padding: 15
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: 4,
        marginRight: 4,
        width: 200,
    },
    filtersContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'align_around'
    },
    error: {
        fontSize: 'smaller',
        color: 'red',
    },
});

const InvoiceScreen = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { chats, token, educatorId, darkMode, admin } = useSelector(
        (state) => state.auth
    );

    const { allInvoices } = useSelector((state) => state.invoices);
    useEffect(() => {
        dispatch(getInvoicesAction({ adminId: educatorId, token }));
        return () => { };
    }, []);
    const styles = !darkMode ? lightStyles : darkStyles;
    
    const [nameFilter, setNameFilter] = React.useState('');

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [StartDate, setStartDate] = React.useState(null);
    const [EndDate, setEndDate] = React.useState(null);
    const [Error, setError] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClearDates = () => {
        setEndDate('2023-00-00');
        setStartDate('2023-00-00');
        dispatch(getInvoicesAction({ adminId: educatorId, token }));
    }

    const handleApplySetDate = () => {
        if ((!StartDate || !EndDate) || (StartDate === '2023-00-00' || EndDate === '2023-00-00'))
            setError(true);
        else {
            dispatch(getInvoicesAction({ adminId: educatorId, startDate: StartDate, endDate: EndDate, token }));
            setError(false);
        }
    };
    const people = ['Alfred', 'Jodocus', 'Kwak', 'Dolf'];

    const converter = ({
      invoiceDate,
      invoice,
      amountWithoutDiscount,
      invoiceID,
      paymentId
    }) => {
      let html =
        `<!DOCTYPE html>
  <html>
  
  <head>
    <base target="_top">
    <style>
      .container {
        background: #FFFFFF;
        box-shadow: 0px 8px 50px rgba(230, 234, 238, 0.6);
        border-radius: 10px;
        width: 688px;
        height: 639px;
        font-family: 'Cairo';
        font-style: normal;
        text-align: right;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        font-family: 'Noto Sans Arabic';
        padding: 18px;
        /* align-items: flex-end; */
  
      }
      upperContainer {
          border-radius: 10px;
          width: 988px;
          height: 939px;
          font-family: 'Cairo';
          font-style: normal;
          text-align: right;
          font-size: 14px;
          /* align-items: flex-end; */
      }
    
  
      .imageCon {
        width: 100px;
        height: 50px;
        align-self: end;
      }
  
      .txtCon {
        display: flex;
        flex-direction: row-reverse;
        width: 100%;
        justify-content: space-between;
        align-self: flex-end;
      }
  
      .txt {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        text-align: right;
        font-family: 'Noto Sans Arabic';
        padding: 3.5px;
        color: #042C43;
        width: 100%;
      }
  
      .textblack {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        text-align: right;
        font-family: 'Noto Sans Arabic';
        padding: 3.5px;
        width: 100%;
        color: black;
      }
      
      .color {
        color: #042C43;
        font-weight: 600;
        font-size: 14px;
      }
      
      .dashed {
        background: rgba(192, 192, 192, 0.2);
        border: 1px dashed #C0C0C0;
        border-radius: 9px;
        /* padding: 13px; */
      }
      .textAlign {
          text-align: left;
      }
      .line {
        background: rgba(192, 192, 192, 0.2);
        border: 1px solid #C0C0C0;
        border-radius: 9px;
        /* padding: 13px; */
      }
  
      .qrcode {
        width: 200px;
        height: 200px;
      }
  
      .shell {
        position: absolute;
        top: 80px;
        left: 80px;
        width: 40px;
        height: 40px;
      }
      .alignTable {
          width: 100%;
          align-self: end;
      }
      .alignTableEnd {
          width: 100%;
        align-self: end;
      }
      tr{
        color: #042c42
      }
    </style>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic&family=Open+Sans:wght@300&family=Quintessential&display=swap" rel="stylesheet">
  </head>
  
  <body>
  <div id= "testt" class="container">
      <div id= "testt" class="container">
      <div class="txt">فاتورة ضريبية مبسطة</div>
      <div class="txt">فاتورة من تطبيق أثنين</div>
        <div class="txtCon">
        <div class="txt">الرقم الضريبي</div>
        <div class="textblack">310397281100003</div>
      </div>
           <!-- 
      <div class="txt">العنوان: الملك عبدالعزيزالرياض، الياسمين 13326</div> -->
      <div class="dashed"> </div>
      <div class="txtCon">
        <div class="textblack">رقم الفاتورة</div>
        <div class="textblack">${paymentId}</div>
      </div>
      <div class="txtCon">
        <div class="textblack">تاريخ الفاتورة</div>
        <div class="textblack">${invoiceDate}</div>
      </div>
      <div class="dashed"> </div>
      <table>
        <tbody>
          <tr>
            <td class="textAlign">المبلغ</td>
            <td>الجلسات</td>
            <td>الباقة </td>
          </tr>
          <tr>
            <td class="textAlign">${invoice?.intensity?.price}</td>
            <td>${invoice?.intensity?.numberOfSessions}</td>
            <td>${invoice?.intensity?.intensityTitleAr}</td>
          </tr>
        </tbody>
      </table>
      <br>
      <table class="alignTable">
        <tbody>
          <tr>
            <td class="textAlign textAlign">${invoice?.intensity?.price}</td>
            <td>اجمالي المبلغ الخاضع للضريبة</td>
          </tr>
          ${invoice && invoice?.discountValue > 0 ?
          `<tr>
              <td class="textAlign textAlign">${(Number(invoice?.discountValue) * 0.15 + Number(invoice?.discountValue)).toFixed(2)}</td>
              <td>قيمة التخفيض </td>
            </tr>`
          : ''
        }
            <tr>
            <td class="textAlign textAlign">${((Number(invoice?.intensity?.price) - Number(invoice?.discountValue)) * 0.15).toFixed(2)}</td>
            <td>القيمة المضافة: 15%</td>
          </tr>
        </tbody>
      </table>
      <div class="line"> </div>
      <div class="txtCon">
          <div class="textblack">الاجمالي مع الضريبة</div>
          <td class="textblack textAlign">${(Number(invoice?.intensity?.price) * 1.15 - Number(invoice?.discountValue) * 1.15).toFixed(2)}</td>

      </div>
      <div style="align-self: center;">
        <img class="qrcode" src="https://chart.googleapis.com/chart?chs=150x150&amp;cht=qr&amp;chl=${invoiceID}&amp;choe=UTF-8"
          alt="QR code" />
      </div>
    </div>
  </div>
  </body>
  
  </html>
                `;
      return html;
    }

    const DownloadAllFiles = async () => {
        if (allInvoices) {
            let tempInvoices = allInvoices.filter(inv => inv.patientName.includes(nameFilter));
            for (let i = 0; i < tempInvoices?.length; i++) {
                const invoice = tempInvoices[i];
                const fragment = toHtml(converter({
                    invoiceDate: invoice.createdOn,
                    invoice: invoice,
                    invoiceID: invoice.id,
                    paymentId: invoice.paymentId ? invoice.paymentId : invoice.id
                }));
                document.body.appendChild(fragment);

                let canvas = await html2canvas(document.getElementById('testt'), {
                    scale: 2,
                    allowTaint: true,
                    useCORS: true,
                })
                const imgData = canvas.toDataURL('image/png');

                var imgWidth = 210;
                var imgHeight = (canvas.height * imgWidth) / canvas.width;

                var pdf = new jsPDF('p', 'mm');
                var position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

                await pdf.save(`${invoice.patientName}-${invoice.paymentId ? invoice.paymentId : invoice.id}.pdf`);
                var element = document.getElementById("testt");
                element.parentNode.removeChild(element);

            }
        }
          // allInvoices && allInvoices?.map(async (invoice) => {
          //     // resolve('')
          // });
      }

    const DownloadOneFile = async (invoice) => {
        const fragment = toHtml(converter({
            invoiceDate: invoice.createdOn,
            invoice: invoice,
            invoiceID: invoice.id,
            paymentId: invoice.paymentId ? invoice.paymentId : invoice.id
        }));
        document.body.appendChild(fragment);

        html2canvas(document.getElementById('testt'), {
            scale: 2,
            allowTaint: true,
            useCORS: true,
        }).then(async (canvas) => {
            const imgData = canvas.toDataURL('image/png');

            var imgWidth = 210;
            var imgHeight = (canvas.height * imgWidth) / canvas.width;

            var pdf = new jsPDF('p', 'mm');
            var position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

            await pdf.save(`${invoice.patientName}-${invoice.paymentId ? invoice.paymentId : invoice.id}.pdf`);
            var element = document.getElementById("testt");
            element.parentNode.removeChild(element);
        });
    }
    return (
        <div style={{ height: '100vh' }}>
            <MyNav />
            <Container maxWidth={false} style={styles.container}>
                <Card className={classes.cardContainer}>
                    <Typography className={classes.headerContainer} variant="h4" component="h5">
                        الفواتير
                    </Typography>
                    <div style={styles.filtersContainer}>
                    <TextField
                            id="name"
                            label="Name"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={StartDate}
                            onChange={e => setNameFilter(e.target.value)}
                        />

                        <TextField
                            id="startDate"
                            label="Start Date"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={StartDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                        <TextField
                            id="endDate"
                            label="End Date"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={EndDate}
                            onChange={e => setEndDate(e.target.value)}
                        />
                        <div>
                            <div>
                                <Button onClick={handleApplySetDate} variant="outlined">
                                    Filter
                                </Button>
                                <Button onClick={handleClearDates} color="secondary">
                                    Clear
                                </Button>
                            </div>
                            {Error && <div className={classes.error}>{"please enter start and end date"}</div>}
                        </div>
                        <Button onClick={DownloadAllFiles} color="primary">
                            Download All
                        </Button>

                    </div>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell align="left">invoice id</TableCell> */}
                                    <TableCell align="left">آسم العميل</TableCell>
                                    <TableCell align="left">التاريخ</TableCell>
                                    <TableCell align="left">القيمة</TableCell>
                                    <TableCell align="left">قيمة الخصم</TableCell>
                                    <TableCell align="left">تحميل الفاتورة</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allInvoices && allInvoices?.slice((page) * rowsPerPage, (page) * rowsPerPage + rowsPerPage).filter(inv => inv.patientName.includes(nameFilter)).map((row) => (
                                    <TableRow key={row.id}>
                                        {/* <TableCell align="left">{row.paymentId}</TableCell> */}
                                        <TableCell align="left">{row.patientName}</TableCell>
                                        <TableCell align="left">{row.createdOn}</TableCell>
                                        <TableCell align="left">{row.amount}</TableCell>
                                        <TableCell align="left">{row.discountValue}</TableCell>
                                        <TableCell align="left">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                className={classes.button}
                                                startIcon={<SaveIcon />}
                                                onClick={() => DownloadOneFile(row)}
                                            >
                                                Save
                                            </Button>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TablePagination
                                component="div"
                                count={allInvoices.length}
                                page={page}
                                onChangePage={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />

                        </Table>
                    </TableContainer>
                    {/* <Button onClick={() => dispatch(getInvoicesAction({adminId: educatorId}))}>
              <NoteIcon />
            </Button> */}
                </Card>
            </Container>
            <Footer />
        </div >
    );
}

export default InvoiceScreen;
// {"id":"8ad29fee-c5c6-40c3-b7c1-5549a3879162",
// "patientId":"0a92ba77-15d8-463b-be9b-f8dc66eff8f5",
// "caseHandlerId":"1c735207-5ac5-4aa9-b5cd-17242fe95af1",
// "paymentId":"PTS2313824755562",
// "createdOn":"2023-05-15T08:30:16.644Z",
// "updatedOn":"2023-05-18T11:30:33.123Z",
// "originFromPatient":false,
// "originFromDP":false,
// "amount":"1050",
// "status":"successful",
// "referenceUrl":"https://secure.paytabs.sa/payment/wr/5E95C94982E414D86619CD5FAF2678898FABCF3B4F33A6089E896064",
// "discountAmount":null,
// "discountType":null,
// "discountValue":null}
