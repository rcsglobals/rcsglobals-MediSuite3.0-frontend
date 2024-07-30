import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import { BillingBtn, MainHeading, StyledTextField } from './OpdBilling.styles';
import { StyledLabel, StyledLabelValue } from './OpdBilling.styles';
import SelectDropdown from '../../common/select/SelectDropdown';
import { connect } from 'react-redux';
import { GetJRService, OPDUserVerificationService, OpdFinalBillingService, PaymentModesService } from '../../../services/registrationService/opdRegistrationService/opdBillingServices/OpdBillingServices';
import { setBillingData } from '../../../redux/actions/OpdRegAction';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from 'react-router-dom';

const OpdBilling = (props: any) => {

    const history: any = useHistory();
    const [loading, setLoading] = useState(false);
    const [paymentModes, setPaymentModes] = useState([]);
    const [userData, setUserData] = useState({
        username: localStorage.getItem('username'),
        password: ''
    })

    useEffect(() => {
        const fetchPayModes = async () => {
            try {
                const PaymentModesServiceRes: any = await PaymentModesService();
                setPaymentModes(PaymentModesServiceRes);
            } catch (error) {
                console.error('PaymentModesService Error:', error);
            }

            if (props?.selectedDoctor[0]) {
                try {
                    const responseData: any = props?.selectedDoctor[0] && await GetJRService({ doctorId: props?.selectedDoctor[0].doctor_id });
                    const mappedData = responseData?.data?.map((item: any) => ({
                        jr_id: item.jr_id,
                        jr_name: item.jr_name,
                        dept_id: item.dept_id,
                        jr_type_id: item.jr_type_id
                    }));

                    const smallestJrType = mappedData.reduce((min: any, current: any) => {
                        return current.jr_type_id < min.jr_type_id ? current : min;
                    }, mappedData[0]);

                    props.setBillingData({
                        JR_Id: (smallestJrType?.jr_id) ? (smallestJrType?.jr_id) : 0,
                        JR_deptId: (smallestJrType?.dept_id) ? (smallestJrType?.dept_id) : 0
                    })

                } catch (error) {
                    console.error('GetJRService Error:', error);
                }
            }
        }
        fetchPayModes();
        props.setBillingData({
            patient_id: props.patientDetails.patient?.patient_id,
            doctor_id: (props?.selectedDoctor[0]) ? (props?.selectedDoctor[0].doctor_id) : 0,
            service_unit_price: props?.opdDiscountData.totalBill,
            service_discount: props?.opdDiscountData.serviceDiscount,
            paid_amount: props?.opdDiscountData?.billAfterDiscount,
            con_service_discount: (props?.selectedDoctor[0]?.discount_unit_price) ? (props?.selectedDoctor[0]?.discount_unit_price) : 0,
            con_total_price: (props?.selectedDoctor[0]?.total_price) ? (props?.selectedDoctor[0]?.total_price) : 0
        })
    }, [])

    const style = {
        top: '50%',
        left: '50%',
        width: '45%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute' as 'absolute',
        // height: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        overflow: 'auto'
    };

    const handlePassword = (e: any) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    }

    const handlePaymentMode = (event: any) => {

        const selectedPaymentMode: any = event.target.value;
        const selectedPaymentModeVal: any = paymentModes.find((payMode: any) => payMode.description === selectedPaymentMode);

        if (selectedPaymentModeVal) {
            const selectedPayMode = selectedPaymentModeVal.paymodeName;
            props.setBillingData({
                pay_mode: selectedPayMode
            })
        }
    }

    const handleCloseClick = () => {
        props.setShowModal(false);
    }

    const handleBillNowClick = async () => {
        setLoading(true);
        try {
            const OPDUserVerificationServiceRes = await OPDUserVerificationService(userData);
            if ((OPDUserVerificationServiceRes?.data?.flag === true) && ((props?.billingData?.JR_Id != 0))) {
                const res: any = await OpdFinalBillingService({
                    billingData: props.billingData,
                    selectedDoctor: props.selectedDoctor,
                    flag: props.patientDetails.flag,
                    page: props?.page
                });
                if (res?.status === 200) {
                    const billNo = res?.data?.billNumber;
                    props.setShowModal(false);
                    window.alert("Billing Successful :)");
                    props.setShowModal(false);
                    history.push('/registration');
                    const url = `/opdBillPrint?billNo=${encodeURIComponent(billNo)}`;
                    const windowFeatures = "left=100,top=100,width=620,height=580";
                    window.open(url, "popup", windowFeatures);
                } else {
                    window.alert("Some issue occurred...");
                }
            } else if (OPDUserVerificationServiceRes?.data?.flag === false) {
                window.alert("InCorrect User Password");
            }else if(props?.billingData?.JR_Id === 0){
                window.alert("SR/JR is not available. Please schedule one for billing...");
            }
        } catch (error) {
            window.alert("Error occurred: " + error);
            console.error('OpdFinalBillingService Error:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleTextArea = (event: any) => {
        const textValue = event.target.value;
        props.setBillingData({
            remarks: textValue
        })
    }

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleBillNowClick();
        }
    };


    // const handleAmountReceived = (e: any) => {
    //     const receivedAmount = e.target.value;
    //     if (receivedAmount == props?.opdDiscountData?.billAfterDiscount) {
    //         props.setBillingData({
    //             paid_amount: receivedAmount
    //         })
    //     } else {
    //         setEqAmount(true);
    //     }
    // }

    return (
        <Modal open={true} >
            <Box sx={style}>
                <Paper>
                    <div>
                        <CloseIcon onClick={handleCloseClick} style={{ cursor: 'pointer', float: 'right', padding: '5px' }} />
                    </div>
                    <div>
                        <MainHeading style={{ borderBottom: '1px solid grey' }}>OPD Billing</MainHeading>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '25px', color: 'purple', fontWeight: '700' }}>{props.patientDetails.patient?.first_name + " " + props.patientDetails.patient?.last_name}</div>
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '5px', fontSize: '15px', fontWeight: '500' }}>
                                {/* <div style={{padding: '0px 10px'}}>Patient Type:</div> */}
                                <div style={{ padding: '0px 5px' }}>{props.opdDiscountData.patientType}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '5px', fontSize: '15px', fontWeight: '500' }}>
                                {/* <div style={{padding: '0px 10px'}}>Patient Id:</div> */}
                                <div style={{ padding: '0px 5px' }}>{props.patientDetails.patient?.patient_id}</div>
                            </div>
                        </div>
                        <MainHeading>Payment Details</MainHeading>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '2% 20%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <StyledLabel>Total Bill:</StyledLabel>
                                <StyledLabelValue>{props.opdDiscountData.totalBill}</StyledLabelValue>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <StyledLabel>Total Accumulated Service Discount:</StyledLabel>
                                <StyledLabelValue>{props.opdDiscountData.serviceDiscount}</StyledLabelValue>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <StyledLabel style={{ color: '#c14d10' }}>Total Bill After Discount:</StyledLabel>
                                <StyledLabelValue style={{ color: '#c14d10' }}>{props.opdDiscountData.billAfterDiscount}</StyledLabelValue>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <StyledLabel>Payment Mode:</StyledLabel>
                                <SelectDropdown handlePaymentMode={(e: any) => handlePaymentMode(e)} dropdown='paymentMode' values={paymentModes} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <StyledLabel>Amount Received:</StyledLabel>
                                <div style={{ padding: '5px 10px', border: '1px solid grey', width: '150px', borderRadius: '5px' }}>{props.opdDiscountData.billAfterDiscount}</div>
                                {/* <StyledTextField onChange={(e: any) => handleAmountReceived(e)} style={{ width: '150px' }} /> */}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <StyledLabel>Remarks:</StyledLabel>
                                <textarea onChange={(e: any) => handleTextArea(e)} style={{ width: '145px' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <StyledLabel>Enter Password:</StyledLabel>
                                <StyledTextField
                                    type="password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handlePassword}
                                    placeholder="Password"
                                    onKeyPress={(e: any) => handleKeyPress(e)}
                                    style={{ width: '150px' }}
                                />
                            </div>
                        </div>
                    </div>
                </Paper>
                {/* <BillingBtn onClick={handleBillNowClick}>Bill Now</BillingBtn> */}
                {
                    loading ? <BillingBtn><CircularProgress sx={{ color: 'white' }} size={24} /></BillingBtn> :
                        <BillingBtn onClick={handleBillNowClick}>Bill Now</BillingBtn>
                }
            </Box>
        </Modal>
    )
}

const mapStateToProps = (state: any) => ({
    patientDetails: state?.OpdRegistration?.patientDetails,
    opdDiscountData: state?.OpdRegistration?.opdDiscountData,
    selectedDoctor: state?.OpdRegistration?.selectedDoctor,
    billingData: state?.OpdRegistration?.billingData
});

const mapDispatchToProps = (dispatch: any) => ({
    setBillingData: (billingData: number) => dispatch(setBillingData(billingData))
});

export default connect(mapStateToProps, mapDispatchToProps)(OpdBilling);
//182  <StyledLabelValue style={{ color: '#c14d10' }}>{props.opdDiscountData.totalBill - props.opdDiscountData.serviceDiscount}</StyledLabelValue>